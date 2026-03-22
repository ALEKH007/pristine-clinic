import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import AppointmentForm from "@/components/AppointmentForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyCTAs from "@/components/StickyCTAs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20" id="home">
        <Hero />
        <Services />
        <AboutUs />
        <WhyChooseUs />
        <Testimonials />
        <Gallery />
        <AppointmentForm />
        <Contact />
      </main>
      <Footer />
      <StickyCTAs />
    </>
  );
}
