"use client";

import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { todoActions, Todo } from "@/actions/todo-actions";
import { DataTable } from "./data-table";
import { columns } from "./column";

interface UITodo extends Omit<Todo, "isDone"> {
  isDone: boolean;
}

const DashboardPage = () => {
  const { token, user } = useAuth();

  const queryParams = {
    page: 1,
    rows: 50,
    orderKey: "createdAt",
    orderRule: "desc" as const,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos", queryParams],
    queryFn: () => todoActions.getTodos(queryParams),
    enabled: !!token,
  });

  const isAdmin = user?.email === "admin@nodewave.id";

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Unauthorized</h1>
        <p className="text-gray-600">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  const todos: UITodo[] =
    data?.data?.content?.entries?.map((todo: Todo) => ({
      ...todo,
      isDone: todo.isDone === "true",
    })) ?? [];

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">To Do</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">To Do</h1>
        <div className="text-red-500">Failed to load todos.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="justify-start text-zinc-800 text-3xl font-semibold font-inter leading-normal tracking-tight">
        To Do
      </h1>
      <DataTable columns={columns} data={todos} />
    </div>
  );
};

export default DashboardPage;
