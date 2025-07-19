"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Todo } from "@/actions/todo-actions";

interface UITodo extends Omit<Todo, "isDone"> {
  isDone: boolean;
}

export const columns: ColumnDef<UITodo>[] = [
  // TODO: change userId to fullname
  {
    accessorKey: "userId",
    header: "userId",
  },
  {
    accessorKey: "item",
    header: "To do",
    cell: ({ row }) => {
      return <div>{row.getValue("item")}</div>;
    },
  },
  {
    accessorKey: "isDone",
    header: "Status",
    cell: ({ row }) => {
      const isDone = row.getValue("isDone");
      const status = isDone ? "success" : "pending";

      return (
        <Badge
          variant={status === "success" ? "default" : "destructive"}
          className={
            status === "success"
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }
        >
          {status === "success" ? "Success" : "Pending"}
        </Badge>
      );
    },
  },
];
