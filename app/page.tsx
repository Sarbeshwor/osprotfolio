import { IntroProvider } from "@/lib/intro";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Capabilities from "@/components/Capabilities";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <IntroProvider>
      <Navigation />
      <main>
        <Hero />
        <Statement />
        <Projects />
        <Experience />
        <Capabilities />
        <About />
        <Contact />
      </main>
      <Footer />
    </IntroProvider>
  );
}
