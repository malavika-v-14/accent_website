"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    const elements = document.querySelectorAll("main [data-reveal], main .offering-card, main .resource-card, main .section-heading, main .course-details details, main .faq-section, main .resource-audience > h2, main .closing-section, main .events-content, main .contact-layout, main .story-facts, .footer-callback");
    const entrances = document.querySelectorAll("main .hero-copy > *, main .hero-collage, main .page-hero-copy > *, main .page-hero-photo, main .audience-hero > *, main .events-banner .wrap > *");
    const animations = Array.from(entrances).map((el, index) => el.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 650, delay: Math.min(index * 90, 450), easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }));
    elements.forEach(el => { if(el.getBoundingClientRect().top > window.innerHeight) el.classList.add("reveal-pending"); observer.observe(el); });
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); elements.forEach(el => el.classList.remove("reveal-pending")); };
  }, [pathname]);
  return null;
}
