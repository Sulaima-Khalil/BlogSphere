import Image from "next/image";
import { Edit, Trash2, Plus } from "lucide-react";
import { users } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { User } from "@/lib/types";

export default function AdminUsersPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Table<User>
        columns={[
          {
            key: "name",
            header: "User",
            render: (user) => (
              <div className="flex items-center gap-3">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-medium">{user.name}</span>
              </div>
            ),
          },
          { key: "email", header: "Email" },
          {
            key: "role",
            header: "Role",
            render: (user) => (
              <Badge status={user.role} variant="status" />
            ),
          },
          {
            key: "joinedAt",
            header: "Joined",
            render: (user) => formatDate(user.joinedAt),
          },
          {
            key: "actions",
            header: "Actions",
            render: () => (
              <div className="flex items-center gap-2">
                <button className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-primary">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ),
          },
        ]}
        data={users}
      />
    </div>
  );
}
