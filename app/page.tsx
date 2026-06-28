import Hero from "@/components/Hero";
import About from "@/components/About";
import CardPull from "@/components/CardPull";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import BookingForm from "@/components/BookingForm";
import WhatsAppQR from "@/components/WhatsAppQR";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ position: "relative", zIndex: 1, background: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}>
      <Hero />
      <About />
      <CardPull />
      <HowItWorks />
      <Services />
      <Testimonials />
      <BookingForm />
      <WhatsAppQR />
      <Footer />
    </main>
  );
}
