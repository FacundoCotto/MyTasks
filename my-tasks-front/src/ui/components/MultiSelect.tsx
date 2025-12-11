import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { MultiSelectProps } from "../types/ui.types";

export function MultiSelect({
  options,
  value,
  onChange,
  label,
  placeholder = "Select...",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const getDisplayText = () => {
    if (value.length === 0) return placeholder;
    if (value.length === 1) {
      const option = options.find((o) => o.value === value[0]);
      return option ? option.label : value[0];
    }
    return `${value.length} selected`;
  };

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 flex items-center justify-between shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate text-gray-700">{getDisplayText()}</span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <div
                key={option.value}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-violet-50 flex items-center ${
                  isSelected ? "text-violet-900 bg-violet-50" : "text-gray-900"
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  className="mr-3 h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                />
                <span
                  className={`block truncate ${
                    isSelected ? "font-semibold" : "font-normal"
                  }`}
                >
                  {option.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
