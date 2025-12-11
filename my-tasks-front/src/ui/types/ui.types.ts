import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";

export interface Option {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: string;
  label?: string;
}

export interface CodeInputProps {
  length?: number;
  onComplete: (code: string) => void;
  onChange?: (code: string) => void;
  disabled?: boolean;
}

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  hover?: boolean;
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: string;
  label?: string;
}
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  isVisible: boolean;
}
