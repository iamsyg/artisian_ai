// // pages/index.js

// "use client";
// import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';

// export default function Home() {
//   const [openFaq, setOpenFaq] = useState(null);

//   const toggleFaq = (index: any) => {
//     setOpenFaq(openFaq === index ? null : index);
//   };

//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       role: "Digital Artist",
//       content: "ArtisanAI has completely transformed my creative process. The AI suggestions are so intuitive and have helped me break through creative blocks I've struggled with for years.",
//       avatar: "/avatar1.svg"
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       role: "Graphic Designer",
//       content: "The workflow automation features have saved me hours of tedious work. Now I can focus on the actual creative aspects rather than repetitive tasks.",
//       avatar: "/avatar2.svg"
//     },
//     {
//       id: 3,
//       name: "Emma Rodriguez",
//       role: "Illustrator",
//       content: "As someone who was skeptical about AI in art, ArtisanAI won me over. It enhances my creativity without taking over the process. It's like having a creative partner.",
//       avatar: "/avatar3.svg"
//     }
//   ];

//   const faqs = [
//     {
//       question: "How does ArtisanAI enhance creativity?",
//       answer: "ArtisanAI uses advanced machine learning algorithms to analyze your work patterns and provide intelligent suggestions, color palettes, and composition ideas that complement your unique style."
//     },
//     {
//       question: "Do I need technical skills to use ArtisanAI?",
//       answer: "Not at all! ArtisanAI is designed for creators of all technical levels. The interface is intuitive, and we provide plenty of tutorials to get you started."
//     },
//     {
//       question: "Can I use ArtisanAI with my existing tools?",
//       answer: "Yes, ArtisanAI integrates with most popular creative software including Adobe Creative Suite, Figma, Procreate, and others through our plugin system."
//     },
//     {
//       question: "How does ArtisanAI protect my intellectual property?",
//       answer: "Your creations are yours alone. We don't train our models on your proprietary content, and all your work remains private and secure through encryption and strict access controls."
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       <Head>
//         <title>ArtisanAI - AI-Powered Creativity Tools</title>
//         <meta name="description" content="Revolutionary AI tools for creators and artisans" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       {/* Navigation */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 flex items-center">
//                 <div className="h-10 w-10 rounded-md bg-indigo-600 flex items-center justify-center">
//                   <span className="text-white font-bold">AI</span>
//                 </div>
//                 <span className="ml-2 text-xl font-bold text-gray-900">ArtisanAI</span>
//               </div>
//               <div className="hidden md:ml-6 md:flex md:space-x-8">
//                 <a href="#features" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                   Features
//                 </a>
//                 <a href="#testimonials" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                   Testimonials
//                 </a>
//                 <a href="#faq" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                   FAQ
//                 </a>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <Link href="/store" passHref>
//                   <button className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                     Visit our store
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <main>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
//           <div className="md:flex md:items-center md:justify-between">
//             <div className="md:w-1/2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
//                 Unleash Your Creativity with <span className="text-indigo-600">AI-Powered Tools</span>
//               </h1>
//               <p className="mt-6 text-xl text-gray-500">
//                 ArtisanAI provides revolutionary artificial intelligence tools designed specifically for creators, artists, and makers to enhance their workflow and boost creativity.
//               </p>
//               <div className="mt-8 flex space-x-4">
//                 <Link href="/store" passHref>
//                   <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                     Visit our store
//                   </button>
//                 </Link>
//                 <button className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                   Learn more
//                 </button>
//               </div>
//             </div>
//             <div className="mt-8 md:mt-0 md:w-1/2">
//               <div className="relative rounded-lg overflow-hidden bg-indigo-100 p-8">
//                 <div className="aspect-w-16 aspect-h-9 bg-white rounded-lg shadow-lg p-4">
//                   <div className="flex space-x-4 mb-4">
//                     <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                     <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//                     <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                   </div>
//                   <div className="grid grid-cols-3 gap-4">
//                     <div className="bg-indigo-100 rounded p-2">
//                       <div className="h-4 bg-indigo-300 rounded mb-2"></div>
//                       <div className="h-4 bg-indigo-300 rounded w-2/3"></div>
//                     </div>
//                     <div className="bg-indigo-100 rounded p-2 col-span-2">
//                       <div className="h-4 bg-indigo-300 rounded mb-2"></div>
//                       <div className="h-4 bg-indigo-300 rounded w-3/4"></div>
//                     </div>
//                     <div className="bg-indigo-200 rounded p-4 col-span-3 flex items-center justify-center">
//                       <div className="text-center">
//                         <div className="text-indigo-600 font-bold">AI Suggestion</div>
//                         <div className="text-sm text-indigo-500">Try a complementary color palette</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Features Section */}
//         <section id="features" className="bg-white py-12 md:py-24">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center">
//               <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Features</h2>
//               <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
//                 Everything you need to create
//               </p>
//               <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
//                 Our AI tools are designed to work seamlessly with your creative process.
//               </p>
//             </div>

//             <div className="mt-16">
//               <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
//                     <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
//                     </svg>
//                   </div>
//                   <h3 className="mt-6 text-lg font-medium text-gray-900">Smart Design Assistant</h3>
//                   <p className="mt-2 text-base text-gray-500">
//                     Get AI-powered suggestions for your designs, color palettes, and layouts to enhance your creative projects.
//                   </p>
//                 </div>

//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
//                     <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                     </svg>
//                   </div>
//                   <h3 className="mt-6 text-lg font-medium text-gray-900">Workflow Automation</h3>
//                   <p className="mt-2 text-base text-gray-500">
//                     Automate repetitive tasks so you can focus on the creative aspects of your work.
//                   </p>
//                 </div>

//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
//                     <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
//                     </svg>
//                   </div>
//                   <h3 className="mt-6 text-lg font-medium text-gray-900">Cloud Integration</h3>
//                   <p className="mt-2 text-base text-gray-500">
//                     Access your work from anywhere with seamless cloud synchronization across all your devices.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Testimonials Section */}
//         <section id="testimonials" className="bg-indigo-50 py-12 md:py-24">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center">
//               <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Testimonials</h2>
//               <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
//                 What creators are saying
//               </p>
//               <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
//                 Hear from artists and designers who use ArtisanAI in their creative process.
//               </p>
//             </div>

//             <div className="mt-16">
//               <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//                 {testimonials.map((testimonial) => (
//                   <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
//                     <div className="flex items-center mb-4">
//                       <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
//                         <span className="text-indigo-600 font-bold">{testimonial.name.charAt(0)}</span>
//                       </div>
//                       <div className="ml-4">
//                         <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
//                         <p className="text-sm text-gray-500">{testimonial.role}</p>
//                       </div>
//                     </div>
//                     <p className="text-gray-600 italic">"{testimonial.content}"</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* FAQ Section */}
//         <section id="faq" className="bg-white py-12 md:py-24">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center">
//               <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">FAQ</h2>
//               <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
//                 Frequently asked questions
//               </p>
//               <p className="mt-4 text-xl text-gray-500">
//                 Everything you need to know about ArtisanAI.
//               </p>
//             </div>

//             <div className="mt-16 space-y-6">
//               {faqs.map((faq, index) => (
//                 <div key={index} className="border border-gray-200 rounded-lg">
//                   <button
//                     className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
//                     onClick={() => toggleFaq(index)}
//                   >
//                     <span className="text-lg font-medium text-gray-900">{faq.question}</span>
//                     <svg
//                       className={`h-5 w-5 text-indigo-500 transform ${openFaq === index ? 'rotate-180' : ''}`}
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </button>
//                   {openFaq === index && (
//                     <div className="px-6 pb-4">
//                       <p className="text-gray-600">{faq.answer}</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="bg-indigo-700">
//           <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
//             <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
//               <span className="block">Ready to dive in?</span>
//               <span className="block text-indigo-200">Start exploring our tools today.</span>
//             </h2>
//             <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
//               <div className="inline-flex rounded-md shadow">
//                 <Link href="/store" passHref>
//                   <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
//                     Visit our store
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white">
//         <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
//           <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
//             <div className="px-5 py-2">
//               <a href="#" className="text-base text-gray-500 hover:text-gray-900">
//                 About
//               </a>
//             </div>
//             <div className="px-5 py-2">
//               <a href="#" className="text-base text-gray-500 hover:text-gray-900">
//                 Blog
//               </a>
//             </div>
//             <div className="px-5 py-2">
//               <a href="#" className="text-base text-gray-500 hover:text-gray-900">
//                 Team
//               </a>
//             </div>
//             <div className="px-5 py-2">
//               <a href="#" className="text-base text-gray-500 hover:text-gray-900">
//                 Contact
//               </a>
//             </div>
//             <div className="px-5 py-2">
//               <a href="#" className="text-base text-gray-500 hover:text-gray-900">
//                 Terms
//               </a>
//             </div>
//           </nav>
//           <div className="mt-8 flex justify-center space-x-6">
//             <a href="#" className="text-gray-400 hover:text-gray-500">
//               <span className="sr-only">Twitter</span>
//               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//               </svg>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-gray-500">
//               <span className="sr-only">GitHub</span>
//               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
//               </svg>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-gray-500">
//               <span className="sr-only">Instagram</span>
//               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
//               </svg>
//             </a>
//           </div>
//           <p className="mt-8 text-center text-base text-gray-400">
//             &copy; 2023 ArtisanAI. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }





// pages/index.tsx
import Landing from "./components/Landing";

export default function Home() {
  return <Landing />;
}