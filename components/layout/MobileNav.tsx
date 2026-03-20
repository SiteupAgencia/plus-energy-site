"use client";

import { useCallback } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const openLeadPopup = useCallback(() => {
    onClose();
    window.dispatchEvent(new CustomEvent("open-lead-popup"));
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.nav
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-pe-green-900 shadow-[0_0_60px_rgb(0_0_0/0.5)]"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-pe-green-800/50">
              <div className="flex items-center gap-2">
                <Image
                  src="/simbolo.png"
                  alt="Plus Energy"
                  width={32}
                  height={32}
                  className="h-7 w-7 object-contain"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-heading text-sm font-extrabold tracking-widest text-white uppercase">Plus Energy</span>
                  <span className="text-[9px] font-semibold tracking-[0.2em] text-pe-solar-400 uppercase">Usina Solar</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-2 text-pe-slate-400 hover:text-pe-solar-400 hover:bg-pe-green-800/60 transition-colors"
                aria-label="Fechar menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-white transition-all hover:bg-pe-green-800/60 hover:text-pe-solar-400 hover:pl-6"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Gold divider */}
            <div className="h-px mx-6 bg-gradient-to-r from-transparent via-pe-solar-500/40 to-transparent" />

            {/* CTA */}
            <div className="p-6">
              <button
                type="button"
                onClick={openLeadPopup}
                className="w-full rounded-full gold-gradient px-6 py-3.5 text-center text-base font-semibold text-pe-slate-950 transition-all hover:shadow-[0_0_24px_rgb(230_169_0/0.4)] active:scale-[0.98]"
              >
                Simule sua Economia
              </button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
