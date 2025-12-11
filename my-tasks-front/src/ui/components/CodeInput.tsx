import React, { useRef, useState, useEffect } from "react";
import type { CodeInputProps } from "../types/ui.types";

export function CodeInput({
  length = 6,
  onComplete,
  onChange,
  disabled = false,
}: CodeInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  
  useEffect(() => {
    const code = values.join("");
    onChange?.(code);
    if (code.length === length) {
      onComplete(code);
    }
  }, [values, length, onComplete, onChange]);

  const handleChange = (index: number, value: string) => {
    
    if (!/^\d*$/.test(value)) return;

    const newValues = [...values];

    if (value.length > 1) {
      
      const pastedChars = value.slice(0, length).split("");
      for (let i = 0; i < pastedChars.length; i++) {
        if (index + i < length) {
          newValues[index + i] = pastedChars[i];
        }
      }
      setValues(newValues);

      
      const nextIndex = Math.min(index + pastedChars.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    } else {
      
      newValues[index] = value;
      setValues(newValues);

      
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!values[index] && index > 0) {
        
        const newValues = [...values];
        newValues[index - 1] = "";
        setValues(newValues);
        inputRefs.current[index - 1]?.focus();
      } else {
        
        const newValues = [...values];
        newValues[index] = "";
        setValues(newValues);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center w-full">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          maxLength={6} 
          value={values[index]}
          disabled={disabled}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={`
            w-12 h-14 text-center text-2xl font-bold 
            border-2 rounded-lg bg-white outline-none transition-all
            focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20
            disabled:bg-gray-100 disabled:text-gray-400
            ${
              values[index]
                ? "border-violet-500 text-violet-600"
                : "border-black text-black hover:border-gray-300"
            }
          `}
        />
      ))}
    </div>
  );
}
