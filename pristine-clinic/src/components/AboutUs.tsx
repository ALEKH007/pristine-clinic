export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-softGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img
              alt="Our Lead Doctor"
              className="rounded-custom shadow-xl w-full h-auto"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToV5CUARjru-AEfqvJHBsEuDgMZL6xvw4hrkZUvSiGog&s=10"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">Leading Healthcare Excellence in Nagpur</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Pristine Dental and Heart Care Clinic is a premier multi-specialty center With over 15 years of practice in Mumbai, Hyderabad, and now in Nagpur, Visit us today for top-notch dental care in Nagpur, we believe in a patient-first approach.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-medicalGreen flex items-center justify-center text-white">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                  </svg>
                </div>
                <span className="font-medium">15+ Years of Clinical Experience</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-medicalGreen flex items-center justify-center text-white">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                  </svg>
                </div>
                <span className="font-medium">State-of-the-Art Diagnostic Equipment</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-medicalGreen flex items-center justify-center text-white">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                  </svg>
                </div>
                <span className="font-medium">Compassionate and Friendly Staff</span>
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                <p className="text-3xl font-bold text-medicalBlue mb-1">5000+</p>
                <p className="text-sm text-gray-500 font-medium">Happy Patients</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                <p className="text-3xl font-bold text-medicalBlue mb-1">10+</p>
                <p className="text-sm text-gray-500 font-medium">Specialists</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
