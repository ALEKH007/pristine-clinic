export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Patients Trust Us</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-gray-100 rounded-custom shadow-soft text-center hover-lift">
            <div className="text-4xl mb-4">👨‍⚕️</div>
            <h4 className="font-bold text-lg mb-2">Expert Doctors</h4>
            <p className="text-sm text-gray-500">Highly qualified and experienced medical professionals.</p>
          </div> 
          <div className="p-6 bg-white border border-gray-100 rounded-custom shadow-soft text-center hover-lift">
            <div className="text-4xl mb-4">🔬</div>
            <h4 className="font-bold text-lg mb-2">Modern Tech</h4>
            <p className="text-sm text-gray-500">Advanced tools for precision and painless treatments.</p>
          </div>
          <div className="p-6 bg-white border border-gray-100 rounded-custom shadow-soft text-center hover-lift">
            <div className="text-4xl mb-4">🤝</div>
            <h4 className="font-bold text-lg mb-2">Friendly Staff</h4>
            <p className="text-sm text-gray-500">Warm and welcoming environment for every patient.</p>
          </div>
          <div className="p-6 bg-white border border-gray-100 rounded-custom shadow-soft text-center hover-lift">
            <div className="text-4xl mb-4">⭐</div>
            <h4 className="font-bold text-lg mb-2">5-Star Service</h4>
            <p className="text-sm text-gray-500">Consistently rated as one of Nagpur's best clinics.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
