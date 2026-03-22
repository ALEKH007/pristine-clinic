import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-medicalBlue rounded-lg flex items-center justify-center">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 10V3L4 14h7v7l9-11h-7z" 
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            Pristine <span className="text-medicalBlue">Care</span>
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <Link href="#home" className="hover:text-medicalBlue transition">Home</Link>
          <Link href="#about" className="hover:text-medicalBlue transition">About</Link>
          <Link href="#services" className="hover:text-medicalBlue transition">Services</Link>
          <Link href="#reviews" className="hover:text-medicalBlue transition">Reviews</Link>
          <Link href="#gallery" className="hover:text-medicalBlue transition">Gallery</Link>
          <Link href="#contact" className="hover:text-medicalBlue transition">Contact</Link>
        </div>
        <div className="flex items-center">
          <Link
            href="#appointment"
            className="bg-medicalBlue text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-600 transition shadow-md"
          >
            Book Now
          </Link>
        </div>
      </nav>
    </header>
  );
}
