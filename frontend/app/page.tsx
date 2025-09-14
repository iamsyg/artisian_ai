// pages/index.js
// This is the main homepage file for a Next.js project.

import Head from 'next/head';
import Image from 'next/image';

const testimonials = [
  {
    name: "Priya S.",
    location: "Bihar, India",
    quote: "Before Artisan AI, I had no idea how to sell my Madhubani paintings online. Now, I have customers from all over the world!",
    image: "/images/priya-s.jpg" // Replace with a real image path
  },
  {
    name: "Rajiv K.",
    location: "Jaipur, India",
    quote: "The AI-powered descriptions turned my simple pottery into a story. My sales have grown by 30% in just three months.",
    image: "/images/rajiv-k.jpg" // Replace with a real image path
  },
  {
    name: "Anjali M.",
    location: "Kerala, India",
    quote: "Creating my own e-commerce site was a nightmare. With Artisan AI, I had a beautiful, functional store in under an hour.",
    image: "/images/anjali-m.jpg" // Replace with a real image path
  }
];

export default function HomePage() {
  return (
    <>
      {/* CORRECTION: Place the Head component here, outside the Layout.
        This ensures it can properly modify the document's <head> section.
      */}
      <Head>
        <title>Artisan AI - AI-Powered Marketplace Assistant</title>
        <meta name="description" content="AI-driven platform that helps local artisans market their craft, tell their stories, and expand their reach to new digital audiences." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Now, wrap your main content with the Layout */}
        <main>
          {/* Hero Section */}
          <section className="bg-white py-12 md:py-24">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                Grow Your Craft. <br /> We'll Handle the Rest.
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Artisan AI is a smart assistant that helps you tell your story, sell your products, and reach a global audience—all without any technical skills.
              </p>
              <div className="mt-8">
                <button className="bg-indigo-600 text-white text-lg font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-lg">
                  Start Your Free Trial
                </button>
              </div>
              <div className="mt-12 w-full max-w-6xl mx-auto">
                <Image 
                  src="/images/hero-dashboard.png" // Replace with a mockup of the platform's dashboard
                  alt="Artisan AI Dashboard Mockup" 
                  width={1200}
                  height={700}
                  layout="responsive"
                  className="rounded-xl shadow-2xl border-4 border-white"
                />
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="bg-gray-100 py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">It's as Easy as 1-2-3</h2>
              <div className="mt-10 grid md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center">
                  <div className="bg-indigo-100 p-4 rounded-full">
                    <svg className="w-12 h-12 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5l-5-5 1.41-1.41L11 15.6l7.59-7.59L20 9.5l-9 9z"/></svg>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">1. Upload Your Craft</h3>
                  <p className="mt-2 text-gray-600 text-center">Take a photo and upload your art. Our AI will instantly recognize your product.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-indigo-100 p-4 rounded-full">
                    <svg className="w-12 h-12 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5l-5-5 1.41-1.41L11 15.6l7.59-7.59L20 9.5l-9 9z"/></svg>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">2. Let Our AI Do the Work</h3>
                  <p className="mt-2 text-gray-600 text-center">Our powerful AI generates a story, product description, and social media posts for you.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-indigo-100 p-4 rounded-full">
                    <svg className="w-12 h-12 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5l-5-5 1.41-1.41L11 15.6l7.59-7.59L20 9.5l-9 9z"/></svg>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">3. Connect with the World</h3>
                  <p className="mt-2 text-gray-600 text-center">With one click, your products are live on your own professional e-commerce store.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Showcase */}
          <section id="features" className="bg-white py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">Features That Transform Your Craft</h2>
              <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">Your Craft Has a Story. Let's Tell It.</h3>
                  <p className="mt-4 text-gray-600">Our AI generates captivating product descriptions, blog posts, and 'About Me' stories. We translate the cultural richness and heritage behind your art into compelling narratives that resonate with customers.</p>
                </div>
                <div className="relative w-full h-72 rounded-lg overflow-hidden shadow-xl">
                  <Image src="/images/storytelling.jpg" alt="AI generating a story" layout="fill" objectFit="cover" />
                </div>
              </div>

              <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
                <div className="relative w-full h-72 rounded-lg overflow-hidden shadow-xl md:order-last">
                  <Image src="/images/social-media.jpg" alt="Social media posts generated by AI" layout="fill" objectFit="cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">From Your Workshop to a Global Feed.</h3>
                  <p className="mt-4 text-gray-600">Get ready-to-use content for Instagram, Facebook, and Pinterest. We’ll even suggest the best hashtags to find new customers and build a loyal following for your brand.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="bg-gray-100 py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Artisans Are Saying</h2>
              <div className="mt-10 grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-lg text-gray-700 italic">"{testimonial.quote}"</p>
                    <div className="mt-4 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image src={testimonial.image} alt={testimonial.name} width={48} height={48} layout="fixed" objectFit="cover" />
                      </div>
                      <div className="ml-4 text-left">
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing & CTA */}
          <section id="pricing" className="bg-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Ready to Get Started?</h2>
              <p className="mt-4 text-lg text-gray-600">Choose a plan that fits your craft.</p>
              
              {/* Simple Pricing Card (Can be expanded) */}
              <div className="mt-10 max-w-sm mx-auto bg-gray-50 rounded-lg shadow-lg p-6 border border-gray-200">
                <h3 className="text-2xl font-bold text-indigo-600">Starter Plan</h3>
                <p className="text-4xl font-extrabold mt-4 text-gray-900">₹999<span className="text-sm font-normal text-gray-500">/month</span></p>
                <ul className="mt-4 space-y-2 text-left text-gray-600">
                  <li>✓ AI Product Storytelling</li>
                  <li>✓ Unlimited Product Listings</li>
                  <li>✓ Social Media Content Generation</li>
                  <li>✓ Basic E-commerce Site</li>
                </ul>
                <button className="mt-6 w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
                  Start Free 7-Day Trial
                </button>
              </div>
            </div>
          </section>
        </main>
    </>
  );
}