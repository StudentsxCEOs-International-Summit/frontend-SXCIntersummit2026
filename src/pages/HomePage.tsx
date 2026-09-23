<<<<<<< HEAD
import { gsap,useGSAP } from "@/hooks/GSAP"
import { useRef } from "react";

function HomePage() {
  const container = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from(container.current, {
      opacity: 0,
      y: 50,
      duration: 1,
    });
  }, { scope: container });

  return (
    <main ref={container} className="home-page">
      <h1 className="text-white text-3xl">Hello TypeScript + GSAP</h1>
=======
function HomePage() {
  return (
    <main className="home-page">
      <section id="center">
        <h1>Home Page</h1>
      </section>
>>>>>>> e098755349b02a8e9629b78d3c8342a8fbb19fbf
    </main>
  )
}

export default HomePage
