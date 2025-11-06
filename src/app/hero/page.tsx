import React from "react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "Welcome",
  subtitle = "This is a simple hero component written in TypeScript + React",
  backgroundImage,
  ctaLabel = "Get started",
  ctaHref = "#",
  className = "",
}) => {
  const containerStyle: React.CSSProperties = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { backgroundColor: "#f5f7fa" };

  return (
    <header
      role="banner"
      style={containerStyle}
      className={`hero p-8 sm:p-16 text-center text-gray-900 ${className}`}
    >
      <div
        style={{ background: "rgba(255,255,255,0.75)" }}
        className="inline-block p-6 rounded-md max-w-2xl"
      >
        <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
          {title}
        </h1>
        <p style={{ marginTop: 8, marginBottom: 16, color: "#444" }}>
          {subtitle}
        </p>
        <a
          href={ctaHref}
          className="cta"
          style={{
            display: "inline-block",
            padding: "0.6rem 1rem",
            background: "#2563eb",
            color: "#fff",
            borderRadius: 6,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          {ctaLabel}
        </a>
      </div>
    </header>
  );
};

export default Hero;
