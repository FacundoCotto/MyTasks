import { Link } from "react-router-dom";
import { Btn } from "../../../ui/components/Btn";
import { Card } from "../../../ui/components/Card";
import { Plus } from "lucide-react";
import { UserCard } from "../components/UserCard";
import type { UserGridProps } from "../types/admin.types";

function UserGrid({
  loading,
  filteredUsers,
  navigate,
  openDeleteModal,
}: UserGridProps) {
  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-48 animate-pulse rounded-2xl bg-white/50" />
          <div className="h-48 animate-pulse rounded-2xl bg-white/50" />
          <div className="h-48 animate-pulse rounded-2xl bg-white/50" />
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={(u) => navigate(`/mytasks/admin/${u.id}`)}
              onDelete={openDeleteModal}
            />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center py-16 text-center bg-white/50">
          <div className="rounded-full bg-violet-100 p-4 text-violet-600 mb-4">
            <Plus size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">
            No users found
          </h3>
          <p className="text-slate-500 max-w-xs mx-auto mt-2">
            Get started by creating a new user for your system.
          </p>
          <Link to="/mytasks/admin/create" className="mt-6 inline-block">
            <Btn variant="tasks_secondary">Create User</Btn>
          </Link>
        </Card>
      )}
    </div>
  );
}

export default UserGrid;
