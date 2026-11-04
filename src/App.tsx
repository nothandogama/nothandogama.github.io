import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Research from "@/components/portfolio/Research";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";
import LabBench from "@/components/portfolio/LabBench";
import Education from "@/components/portfolio/Education";
import Conferences from "@/components/portfolio/Conferences";
import Contact, { Footer } from "@/components/portfolio/Contact";
import NetworkCanvas from "@/components/portfolio/NetworkCanvas";
import { SequenceDivider } from "@/components/portfolio/ui";
import { useGlassSheen } from "@/components/portfolio/hooks";

export default function App() {
  useGlassSheen();

  return (
    <div className="min-h-screen">
      <NetworkCanvas />
      <Nav />
      <Hero />
      <main className="mx-auto max-w-[1100px] px-5">
        <About />
        <SequenceDivider />
        <Research />
        <SequenceDivider />
        <Experience />
        <SequenceDivider />
        <Projects />
        <SequenceDivider />
        <Skills />
        <SequenceDivider />
        <LabBench />
        <SequenceDivider />
        <Education />
        <SequenceDivider />
        <Conferences />
        <SequenceDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
