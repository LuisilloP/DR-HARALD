"use client";

export default function Navbar() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <ul className="flex justify-center gap-6 py-4 text-gray-700 font-medium">
        <li
          onClick={() => scrollToSection("hero")}
          className="cursor-pointer hover:text-blue-500"
        >
          Inicio
        </li>
        <li
          onClick={() => scrollToSection("about")}
          className="cursor-pointer hover:text-blue-500"
        >
          Sobre mí
        </li>
        <li
          onClick={() => scrollToSection("procedures")}
          className="cursor-pointer hover:text-blue-500"
        >
          Procedimientos
        </li>
        <li
          onClick={() => scrollToSection("cases")}
          className="cursor-pointer hover:text-blue-500"
        >
          Casos
        </li>
        <li
          onClick={() => scrollToSection("faq")}
          className="cursor-pointer hover:text-blue-500"
        >
          Preguntas
        </li>
        <li
          onClick={() => scrollToSection("contact")}
          className="cursor-pointer hover:text-blue-500"
        >
          Contacto
        </li>
      </ul>
    </nav>
  );
}
