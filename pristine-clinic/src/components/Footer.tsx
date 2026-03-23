import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-medicalBlue rounded flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Pristine <span className="text-medicalBlue">Care</span></span>
            </div>
            <p className="text-sm leading-relaxed">
              Dedicated to providing premium dental and cardiac healthcare with modern techniques and a gentle touch in Nagpur.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#about" className="hover:text-medicalBlue transition">About Us</Link></li>
              <li><Link href="#services" className="hover:text-medicalBlue transition">Our Services</Link></li>
              <li><Link href="#reviews" className="hover:text-medicalBlue transition">Patient Reviews</Link></li>
              <li><Link href="#appointment" className="hover:text-medicalBlue transition">Book Online</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-medicalBlue transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-medicalBlue transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-medicalBlue transition">Patient Rights</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-medicalBlue transition text-white">FB</a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-medicalBlue transition text-white">IG</a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-medicalBlue transition text-white">TW</a>
            </div>
            <p className="text-sm">Subscribe for health tips:</p>
            <div className="mt-4 flex">
              <input className="bg-slate-800 px-3 border-none rounded-l-lg text-sm w-full focus:ring-1 focus:ring-medicalBlue text-white" placeholder="Email" type="email" />
              <button>
                <a href="#about" className="bg-medicalBlue text-white px-4 rounded-r-lg hover:bg-blue-600 transition">Go</a>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-xs">
          © 2026 Pristine Dental and Heart Care Clinic. All Rights Reserved. Designed for Excellence.
        </div>
      </div>
    </footer>
  );
}
