import Navbar from "@/app/components/NavBar";
import Hero from "./hero/page";
import Image from "next/image";

export default function Home() {
  return (
    // <main className="relative scroll-smooth">
    //   <Navbar />
    //   <section id="hero">
    //     <Hero />
    //   </section>
    //   <section id="about">
    //     <About />
    //   </section>
    //   <section id="procedures">
    //     <Procedures />
    //   </section>
    //   <section id="cases">
    //     <Cases />
    //   </section>
    //   <section id="faq">
    //     <FAQ />
    //   </section>
    //   <section id="contact">
    //     <Contact />
    //   </section>
    // </main>
    <main>
      <div className="w-full min-h-screen bg-neutral-100 flex justify-center">
        <div className="w-full max-w-[500px] overflow-y-auto">
          <Image
            src="/images/dev2.png"
            alt="Preview móvil"
            width={500}
            height={8221}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </main>
  );
}
