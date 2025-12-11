import { motion } from "framer-motion";
import { User, Shield, ShieldAlert, Mail, Trash2, Edit } from "lucide-react";
import type { UserCardProps } from "../types/admin.types";

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const { name, email, role, isVerified } = user;

  const isAdmin = role === "admin";

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:border-violet-200/50 hover:shadow-md backdrop-blur-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-start gap-3">
            <div
              className={`mt-1 p-2 rounded-full ${
                isAdmin
                  ? "bg-violet-100 text-violet-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {isAdmin ? <ShieldAlert size={20} /> : <User size={20} />}
            </div>
            <div>
              <h3 className="text-lg font-bold leading-tight text-slate-800">
                {name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-500">
                <Mail size={14} />
                <span>{email}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${
                isAdmin
                  ? "bg-violet-50 text-violet-700 border-violet-100"
                  : "bg-blue-50 text-blue-700 border-blue-100"
              }`}
            >
              <Shield size={12} />
              <span>{role}</span>
            </span>

            <span
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${
                isVerified
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : "bg-amber-50 text-amber-700 border-amber-100"
              }`}
            >
              {isVerified ? "Verified" : "Pending"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2 justify-end pt-4 border-t border-slate-100">
        {onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(user);
            }}
            className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
            title="Edit User"
          >
            <Edit size={18} />
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(user.id);
            }}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete User"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </motion.article>
  );
}
