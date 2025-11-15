"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 2.2,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });
  const [isMounted, setIsMounted] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <span ref={ref} className={className}>0{suffix}</span>;
  }

  return (
    <span ref={ref} className={className}>
      <CountUp
        start={inView ? (value > 30 ? value * 0.25 : 0) : 0}
        end={inView ? value : 0}
        duration={duration}
        prefix={prefix}
        suffix={suffix}
        decimals={decimals}
        preserveValue
      />
    </span>
  );
}
