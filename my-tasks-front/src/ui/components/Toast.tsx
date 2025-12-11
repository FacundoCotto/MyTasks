import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  AlertTriangle,
} from "lucide-react"; 
import { useEffect } from "react";
import type { ToastProps, ToastType } from "../types/ui.types";

const icons = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
  error: <AlertCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
};

const styles: Record<ToastType, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  error: "border-red-200 bg-red-50 text-red-800",
  info: "border-blue-200 bg-blue-50 text-blue-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
};

export function Toast({ message, type, onClose, isVisible }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); 
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-sm ${styles[type]} min-w-[300px] max-w-md`}
        >
          <div className="shrink-0 bg-white/50 p-1.5 rounded-full backdrop-blur-md">
            {icons[type]}
          </div>

          <p className="flex-1 text-sm font-medium">{message}</p>

          <button
            onClick={onClose}
            className="shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors text-inherit opacity-70 hover:opacity-100"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
