import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative bg-softGray overflow-hidden py-20 lg:py-32 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-medicalBlue px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <span className="flex">⭐⭐⭐⭐⭐</span>
              <span>5.0 Rated Clinic in Nagpur</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Your Trusted <span className="text-medicalBlue">Dental Care</span> in Nagpur
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              Experience world-class dental and heart care with our expert specialists. We combine advanced technology
              with compassionate care for your beautiful smile.
            </p> 
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#appointment"
                className="px-8 py-4 bg-medicalBlue text-white rounded-custom font-bold text-center hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
              >
                Book Appointment
              </Link>
              <a
                href="tel:+919284532264"
                className="px-8 py-4 bg-white text-medicalBlue border-2 border-medicalBlue rounded-custom font-bold text-center hover:bg-blue-50 transition-all"
              >
                Call Now
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              alt="Smiling Patient and Dentist"
              className="rounded-custom shadow-2xl relative z-10 w-full h-[500px] object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEXK5m2g71GEvXGzQTxQ2x82lK0FawUITs4X3CcigwPjpMqOszBiDCDXmm-GX8wWnefnqKBixtd-mIHgqzMDxwGarlNypNaXKD2ajvX0Bgb3ftoVs4AlF-TZequZJDFQFkob9Rg9bkWEvklpknfv7lNODx_lzSxRanpFmSlX07h4GfuRieEut5-7yMi5EniEtHguA2lSOE_PScpca5BWC8sGUxSXSlwoswd5nu4nAwlBBoZZG1n-r_fE0vCE-kQGd_t232g60di7E"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-custom shadow-soft z-20 hidden md:block border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-medicalGreen/20 text-medicalGreen rounded-full flex items-center justify-center">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 leading-none">Safe &amp; Secure</p>
                  <p className="text-sm text-gray-500">ISO Certified Clinic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
