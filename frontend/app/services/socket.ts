// // pages/api/socket.ts (Pages Router)
// import { NextApiRequest, NextApiResponse } from 'next';
// import { Server, Socket } from 'socket.io';
// import { Server as HTTPServer } from 'http';

// // Extend the NextApiResponse type to include socket server
// interface ExtendedNextApiResponse extends NextApiResponse {
//   socket: {
//     server: HTTPServer & {
//       io?: Server;
//     };
//   };
// }

// export default function handler(req: NextApiRequest, res: ExtendedNextApiResponse) {
//   if (res.socket.server.io) {
//     console.log('Socket is already running');
//   } else {
//     console.log('Socket is initializing');
//     const io = new Server(res.socket.server, {
//       cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//       }
//     });
//     res.socket.server.io = io;

//     io.on('connection', (socket: Socket) => {
//       console.log('User connected:', socket.id);

//       socket.on('user-message', (message: string) => {
//         console.log('Message received:', message);
//         io.emit('user-message', message); // Sending message to everyone
//       });

//       socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//       });
//     });
//   }
//   res.end();
// }

// // For App Router (app/api/socket/route.ts)
// /*
// import { NextRequest, NextResponse } from 'next/server';
// import { Server } from 'socket.io';

// export async function GET(request: NextRequest) {
//   // App Router doesn't have built-in WebSocket support
//   // You'll need to use the custom server approach below
//   return NextResponse.json({ message: 'Use custom server for Socket.IO' });
// }
// */

// // Alternative approach using a custom server (next.config.js modification needed)
// // server.ts (if you prefer a custom server approach)
// /*
// import { createServer } from 'http';
// import { parse } from 'url';
// import next from 'next';
// import { Server, Socket } from 'socket.io';

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = createServer((req, res) => {
//     const parsedUrl = parse(req.url!, true);
//     handle(req, res, parsedUrl);
//   });

//   const io = new Server(server);

//   io.on('connection', (socket: Socket) => {
//     console.log('User connected:', socket.id);

//     socket.on('user-message', (message: string) => {
//       console.log('Message received:', message);
//       io.emit('user-message', message);
//     });

//     socket.on('disconnect', () => {
//       console.log('User disconnected:', socket.id);
//     });
//   });

//   server.listen(3000, () => {
//     console.log('Server listening on port 3000');
//   });
// });
// */


// services/socket.ts
import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  connect(): Socket {
    if (!this.socket) {
      this.socket = io('/api/socket', {
        transports: ['websocket', 'polling'],
        autoConnect: true,
      });

      this.socket.on('connect', () => {
        console.log('Connected to server with ID:', this.socket?.id);
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      this.socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });
    }
    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event: string, callback: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback?: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

// Export a singleton instance
const socketService = new SocketService();
export default socketService;