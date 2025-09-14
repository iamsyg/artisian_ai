// components/Layout.js
// A basic layout component for consistent styling (e.g., header, footer).
// This is not the main homepage file, but an example of a common project structure.

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-50 font-sans antialiased">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">Artisan AI</div>
          <div className="space-x-4">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Stories</a>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
              Sign Up
            </button>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>© 2025 Artisan AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

// You can create this file in your project's `components` directory.
// For brevity, the full layout is not included in the final output.