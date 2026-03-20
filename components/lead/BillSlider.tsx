"use client";

import { useCallback } from "react";
import { formatCurrency } from "@/lib/utils";
import { MIN_BILL, MAX_BILL, calculateSavings } from "@/lib/constants";
import { Leaf, TreePine, Zap } from "lucide-react";

interface BillSliderProps {
  value: number;
  onChange: (value: number) => void;
  showDetails?: boolean;
}

export function BillSlider({ value, onChange, showDetails = true }: BillSliderProps) {
  const savings = calculateSavings(value);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  const percentage = ((value - MIN_BILL) / (MAX_BILL - MIN_BILL)) * 100;

  return (
    <div className="w-full">
      {/* Slider label */}
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-pe-slate-600">
          Valor da sua conta de luz
        </label>
        <span className="text-2xl font-heading font-bold text-pe-green-700">
          {formatCurrency(value)}
        </span>
      </div>

      {/* Range slider */}
      <div className="relative mt-1 mb-4">
        <input
          type="range"
          min={MIN_BILL}
          max={MAX_BILL}
          step={50}
          value={value}
          onChange={handleChange}
          className="w-full"
          aria-label="Valor da conta de luz"
        />
        <div className="flex justify-between mt-1 text-xs text-pe-slate-400">
          <span>{formatCurrency(MIN_BILL)}</span>
          <span>{formatCurrency(MAX_BILL)}</span>
        </div>
      </div>

      {showDetails && (
        <>
          {/* Savings highlight */}
          <div className="mt-6 p-5 bg-gradient-to-br from-pe-green-50 to-pe-solar-50 rounded-2xl border border-pe-green-200">
            <p className="text-sm text-pe-slate-600 mb-1">Sua economia mensal estimada</p>
            <p className="text-4xl font-heading font-extrabold text-pe-green-700">
              {formatCurrency(savings.monthly)}
              <span className="text-base font-normal text-pe-slate-500">/mês</span>
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-pe-slate-500 uppercase tracking-wide">Por ano</p>
                <p className="text-lg font-bold text-pe-green-800">
                  {formatCurrency(savings.yearly)}
                </p>
              </div>
              <div>
                <p className="text-xs text-pe-slate-500 uppercase tracking-wide">Em 2 anos</p>
                <p className="text-lg font-bold text-pe-green-800">
                  {formatCurrency(savings.twoYears)}
                </p>
              </div>
            </div>
          </div>

          {/* Environmental impact */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="flex flex-col items-center p-3 rounded-xl bg-pe-green-50/60">
              <Leaf className="w-5 h-5 text-pe-green-500 mb-1" />
              <span className="text-sm font-bold text-pe-green-800">
                {savings.co2YearlyTons} ton
              </span>
              <span className="text-[10px] text-pe-slate-500 text-center leading-tight">
                CO₂ evitado/ano
              </span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl bg-pe-green-50/60">
              <TreePine className="w-5 h-5 text-pe-green-500 mb-1" />
              <span className="text-sm font-bold text-pe-green-800">
                {savings.treesEquiv}
              </span>
              <span className="text-[10px] text-pe-slate-500 text-center leading-tight">
                árvores equiv.
              </span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl bg-pe-solar-50/60">
              <Zap className="w-5 h-5 text-pe-solar-500 mb-1" />
              <span className="text-sm font-bold text-pe-solar-600">
                {savings.kwhMonthly}
              </span>
              <span className="text-[10px] text-pe-slate-500 text-center leading-tight">
                kWh limpos/mês
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
