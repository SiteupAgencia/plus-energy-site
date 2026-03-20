"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { BillSlider } from "./BillSlider";
import { DiscountDisplay } from "./DiscountDisplay";
import { LeadForm } from "./LeadForm";
import { SuccessScreen } from "./SuccessScreen";
import { DEFAULT_BILL, COMPANY } from "@/lib/constants";
import { trackPopupOpen, trackPopupClose, trackLeadStep, trackLeadSubmit, trackLeadSuccess } from "@/lib/gtm";

type Step = "slider" | "discount" | "distributor" | "form" | "success";

const DISTRIBUTORS = [
  { value: "rge", label: "RGE (Rio Grande Energia)" },
  { value: "outra", label: "Outra distribuidora" },
] as const;

export function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("slider");
  const [billValue, setBillValue] = useState(DEFAULT_BILL);
  const [distributor, setDistributor] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadName, setLeadName] = useState("");

  // Listen for custom event to open popup
  useEffect(() => {
    function handleOpen(e: Event) {
      const customEvent = e as CustomEvent;
      const source = customEvent.detail?.source || "cta";
      if (customEvent.detail?.billValue) {
        setBillValue(customEvent.detail.billValue);
        setStep("discount");
        trackPopupOpen(source, customEvent.detail.billValue);
      } else {
        setStep("slider");
        trackPopupOpen(source);
      }
      setIsOpen(true);
    }

    window.addEventListener("open-lead-popup", handleOpen);
    return () => window.removeEventListener("open-lead-popup", handleOpen);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = useCallback(() => {
    trackPopupClose(step);
    setIsOpen(false);
    // Reset after animation
    setTimeout(() => {
      setStep("slider");
      setDistributor("");
      setIsLoading(false);
    }, 300);
  }, [step]);

  const goNext = useCallback(() => {
    const order: Step[] = ["slider", "discount", "distributor", "form"];
    const currentIndex = order.indexOf(step);
    if (currentIndex < order.length - 1) {
      const nextStep = order[currentIndex + 1];
      trackLeadStep(nextStep, billValue);
      setStep(nextStep);
    }
  }, [step, billValue]);

  const goBack = useCallback(() => {
    const order: Step[] = ["slider", "discount", "distributor", "form"];
    const currentIndex = order.indexOf(step);
    if (currentIndex > 0) {
      setStep(order[currentIndex - 1]);
    }
  }, [step]);

  const handleSubmit = useCallback(
    async (data: { name: string; phone: string; email: string }) => {
      setIsLoading(true);
      setLeadName(data.name);
      const estimatedDiscount = billValue * 0.25;

      trackLeadSubmit({ billValue, distributor, estimatedDiscount, name: data.name, phone: data.phone, email: data.email });

      try {
        await fetch(COMPANY.webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            billValue,
            distributor,
            estimatedDiscount,
            source: "website-popup",
            timestamp: new Date().toISOString(),
          }),
        });
      } catch {
        // Still show success — webhook failure shouldn't block UX
        console.error("Failed to send lead data to webhook");
      }

      trackLeadSuccess({ billValue, monthlySavings: estimatedDiscount, name: data.name, phone: data.phone, email: data.email });
      setIsLoading(false);
      setStep("success");
    },
    [billValue, distributor]
  );

  const stepTitles: Record<Step, string> = {
    slider: "Quanto você paga de luz?",
    discount: "Veja sua economia!",
    distributor: "Qual sua distribuidora?",
    form: "Garanta seu desconto",
    success: "",
  };

  const stepNumber = ["slider", "discount", "distributor", "form"].indexOf(step) + 1;
  const totalSteps = 4;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-pe-slate-950/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            {step !== "success" && (
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-pe-slate-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {step !== "slider" && (
                      <button
                        onClick={goBack}
                        className="p-1 rounded-lg hover:bg-pe-slate-100 transition text-pe-slate-400"
                        aria-label="Voltar"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    )}
                    <h2 className="font-heading font-bold text-lg text-pe-slate-900">
                      {stepTitles[step]}
                    </h2>
                  </div>
                  <button
                    onClick={close}
                    className="p-1.5 rounded-lg hover:bg-pe-slate-100 transition text-pe-slate-400"
                    aria-label="Fechar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mt-3 flex gap-1.5">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i < stepNumber ? "bg-pe-green-500" : "bg-pe-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="px-6 py-6">
              <AnimatePresence mode="wait">
                {step === "slider" && (
                  <motion.div
                    key="slider"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BillSlider value={billValue} onChange={setBillValue} showDetails={false} />
                    <button
                      onClick={goNext}
                      className="w-full mt-6 py-3.5 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-heading font-bold rounded-xl transition-all active:scale-[0.97] flex items-center justify-center gap-2"
                    >
                      Ver minha economia
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {step === "discount" && (
                  <motion.div
                    key="discount"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DiscountDisplay billValue={billValue} />
                    <button
                      onClick={goNext}
                      className="w-full mt-6 py-3.5 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-heading font-bold rounded-xl transition-all active:scale-[0.97] flex items-center justify-center gap-2"
                    >
                      Quero esse desconto
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {step === "distributor" && (
                  <motion.div
                    key="distributor"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm text-pe-slate-600 mb-4">
                      Selecione a distribuidora da sua conta de luz:
                    </p>
                    <div className="space-y-3">
                      {DISTRIBUTORS.map((d) => (
                        <button
                          key={d.value}
                          onClick={() => setDistributor(d.value)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                            distributor === d.value
                              ? "border-pe-green-500 bg-pe-green-50"
                              : "border-pe-slate-200 hover:border-pe-slate-300 bg-white"
                          }`}
                        >
                          <span
                            className={`font-medium ${
                              distributor === d.value
                                ? "text-pe-green-800"
                                : "text-pe-slate-700"
                            }`}
                          >
                            {d.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    {distributor === "outra" && (
                      <div className="mt-4 p-4 bg-pe-solar-50 rounded-xl border border-pe-solar-200 flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-pe-solar-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-pe-solar-700">
                            No momento atendemos apenas clientes RGE.
                          </p>
                          <p className="text-xs text-pe-slate-500 mt-1">
                            Deixe seus dados para ser avisado quando expandirmos para sua região.
                          </p>
                        </div>
                      </div>
                    )}

                    {distributor && (
                      <button
                        onClick={goNext}
                        className="w-full mt-6 py-3.5 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-heading font-bold rounded-xl transition-all active:scale-[0.97] flex items-center justify-center gap-2"
                      >
                        Continuar
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </motion.div>
                )}

                {step === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm text-pe-slate-600 mb-4">
                      Preencha seus dados e nossa equipe entrará em contato:
                    </p>
                    <LeadForm onSubmit={handleSubmit} isLoading={isLoading} />
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SuccessScreen
                      billValue={billValue}
                      name={leadName}
                      onClose={close}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
