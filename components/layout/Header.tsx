"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLeadPopup = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-lead-popup"));
  }, []);

  return (
    <>
      {/* Pill header wrapper — floats centered at top */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 pb-1 pointer-events-none">
        <header
          className={cn(
            "pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300",
            scrolled
              ? "bg-pe-green-900/95 backdrop-blur-xl shadow-[0_0_0_1px_rgb(230_169_0/0.15),0_8px_32px_rgb(0_0_0/0.5)]"
              : "bg-pe-green-950/85 backdrop-blur-md shadow-[0_0_0_1px_rgb(230_169_0/0.08),0_4px_20px_rgb(0_0_0/0.35)]"
          )}
        >
          <div className="flex h-14 items-center justify-between px-4 sm:px-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <Image
                src="/simbolo.png"
                alt="Plus Energy"
                width={36}
                height={36}
                priority
                className="h-8 w-8 object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgb(230_169_0/0.6)]"
              />
              <div className="flex flex-col leading-none">
                <span className="font-heading text-sm font-extrabold tracking-widest text-white uppercase">
                  Plus Energy
                </span>
                <span className="text-[9px] font-semibold tracking-[0.2em] text-pe-solar-400 uppercase">
                  Usina Solar
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-3 lg:gap-6 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs lg:text-sm font-medium text-white transition-colors hover:text-pe-solar-400 relative group whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-pe-solar-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA + Mobile hamburger */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={openLeadPopup}
                className="group hidden lg:inline-flex items-center gap-2 lg:gap-3 pl-4 lg:pl-5 pr-1.5 py-1.5 min-h-[44px] rounded-full text-xs lg:text-sm font-bold text-pe-slate-950 gold-gradient shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_16px_rgb(212_122_0/0.35)] transition-all duration-200 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_28px_rgb(230_169_0/0.6)] hover:brightness-105 hover:scale-105 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pe-solar-400 focus-visible:ring-offset-2"
              >
                Simule sua Economia
                <span className="w-7 h-7 rounded-full bg-pe-slate-950/15 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="inline-flex items-center justify-center rounded-full p-2 text-pe-slate-300 hover:text-pe-solar-400 hover:bg-pe-green-800/60 lg:hidden transition-colors"
                aria-label="Abrir menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
