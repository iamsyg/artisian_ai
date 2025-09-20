// components/ArtisanChat.tsx
import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'customer' | 'artisan';
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  artisanId: string;
  artisanName: string;
  artisanAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
}

const ArtisanChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<'conversations' | 'chat'>('conversations');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample conversations data
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      artisanId: 'artisan1',
      artisanName: 'Sarah Johnson',
      artisanAvatar: '/api/placeholder/40/40',
      lastMessage: 'Thanks for your feedback!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      artisanId: 'artisan2',
      artisanName: 'Michael Chen',
      artisanAvatar: '/api/placeholder/40/40',
      lastMessage: 'I can start on your project next week',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '3',
      artisanId: 'artisan3',
      artisanName: 'Emma Wilson',
      artisanAvatar: '/api/placeholder/40/40',
      lastMessage: 'What type of wood would you prefer?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unreadCount: 1,
      isOnline: true
    }
  ]);

  // Sample messages data
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
    '1': [
      {
        id: '1-1',
        text: 'Hi Sarah, I loved the jewelry box you made!',
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        read: true
      },
      {
        id: '1-2',
        text: 'Thank you! I\'m so glad you like it. Did it arrive in good condition?',
        sender: 'artisan',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: true
      },
      {
        id: '1-3',
        text: 'Yes, it was packaged beautifully. The craftsmanship is exceptional!',
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
        read: true
      },
      {
        id: '1-4',
        text: 'Thanks for your feedback!',
        sender: 'artisan',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        read: false
      }
    ],
    '2': [
      {
        id: '2-1',
        text: 'Hi Michael, I saw your ceramic work and would like to commission a set of dinner plates.',
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        read: true
      },
      {
        id: '2-2',
        text: 'That sounds great! I specialize in custom dinnerware. How many pieces are you thinking?',
        sender: 'artisan',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        read: true
      },
      {
        id: '2-3',
        text: 'I need a set for 8 people, so probably 16 pieces total (dinner and salad plates).',
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: true
      },
      {
        id: '2-4',
        text: 'I can start on your project next week',
        sender: 'artisan',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: true
      }
    ],
    '3': [
      {
        id: '3-1',
        text: 'Hello Emma, I\'m interested in your custom furniture.',
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        read: true
      },
      {
        id: '3-2',
        text: 'Great! I\'d be happy to help. What type of piece are you looking for?',
        sender: 'artisan',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        read: true
      },
      {
        id: '3-3',
        text: 'I need a bookshelf for my home office, about 6 feet tall.',
        sender: 'customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        read: true
      },
      {
        id: '3-4',
        text: 'What type of wood would you prefer?',
        sender: 'artisan',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false
      }
    ]
  });

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedConversation]);

  const handleOpenChat = (conversationId: string) => {
    setSelectedConversation(conversationId);
    setActiveView('chat');
    
    // Mark messages as read when opening chat
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    ));
  };

  const handleBackToConversations = () => {
    setActiveView('conversations');
    setSelectedConversation(null);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === '' || !selectedConversation) return;

    const newMessage: Message = {
      id: `${selectedConversation}-${Date.now()}`,
      text: messageInput,
      sender: 'customer',
      timestamp: new Date(),
      read: false
    };

    // Add message to current conversation
    setMessages(prev => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), newMessage]
    }));

    // Update conversation last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation 
          ? { 
              ...conv, 
              lastMessage: messageInput, 
              lastMessageTime: new Date(),
              unreadCount: 0
            } 
          : conv
      )
    );

    setMessageInput('');

    // Simulate artisan response after a delay
    setTimeout(() => {
      const artisanResponses = [
        "Thanks for your message! I'll get back to you shortly.",
        "I appreciate your interest. Let me check my availability.",
        "That's a great question. Let me think about the best approach.",
        "I understand your requirements. I can work with that.",
        "I'll need to check my materials inventory and get back to you."
      ];
      
      const randomResponse = artisanResponses[Math.floor(Math.random() * artisanResponses.length)];
      
      const artisanMessage: Message = {
        id: `${selectedConversation}-${Date.now()}`,
        text: randomResponse,
        sender: 'artisan',
        timestamp: new Date(),
        read: false
      };
      
      setMessages(prev => ({
        ...prev,
        [selectedConversation]: [...(prev[selectedConversation] || []), artisanMessage]
      }));
      
      // Update conversation with artisan's response
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation 
            ? { 
                ...conv, 
                lastMessage: randomResponse, 
                lastMessageTime: new Date(),
                unreadCount: conv.unreadCount + 1
              } 
            : conv
        )
      );
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
          </span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-green-500 text-white p-3 flex items-center justify-between">
            {activeView === 'conversations' ? (
              <h3 className="font-semibold">Chat with Artisans</h3>
            ) : (
              <div className="flex items-center">
                <button 
                  onClick={handleBackToConversations}
                  className="mr-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-sm">
                      {conversations.find(c => c.id === selectedConversation)?.artisanName}
                    </h3>
                    <p className="text-xs text-green-100">
                      {conversations.find(c => c.id === selectedConversation)?.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-hidden bg-gray-50">
            {activeView === 'conversations' ? (
              // Conversations list
              <div className="h-full overflow-y-auto">
                {conversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => handleOpenChat(conversation.id)}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-800 text-sm truncate">
                          {conversation.artisanName}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {formatTime(conversation.lastMessageTime)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600 text-sm truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Chat view
              selectedConversation && (
                <div className="h-full flex flex-col">
                  {/* Messages area */}
                  <div className="flex-1 overflow-y-auto p-3 bg-green-50">
                    {messages[selectedConversation]?.map(message => (
                      <div
                        key={message.id}
                        className={`flex mb-3 ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            message.sender === 'customer'
                              ? 'bg-green-100 text-gray-800'
                              : 'bg-white text-gray-700 border border-gray-200'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p
                            className={`text-xs mt-1 text-right ${
                              message.sender === 'customer' ? 'text-green-600' : 'text-gray-500'
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input area */}
                  <div className="p-3 border-t border-gray-200 bg-white">
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={messageInput.trim() === ''}
                        className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Send message"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanChat;