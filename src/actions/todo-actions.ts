import { api } from "@/lib/api";

export interface Todo {
  id: string;
  item: string;
  userId: string;
  isDone: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoResponse {
  content: {
    entries: Todo[];
    totalData: number;
    totalPage: number;
  };
  message: string;
  errors: string[];
}

export const todoActions = {
  // get all todos
  getTodos: (params?: {
    filters?: Record<string, any>;
    searchFilters?: Record<string, any>;
    rangedFilters?: Array<{ key: string; start: any; end: any }>;
    page?: number;
    rows?: number;
    orderKey?: string;
    orderRule?: "asc" | "desc";
  }) => api.get<TodoResponse>("/todos", { params }),

  // create todo
  createTodo: (item: string) => api.post("/todos", { item }),

  // change todo status todo
  markTodo: (id: string, action: "DONE" | "UNDONE") =>
    api.put(`/todos/${id}/mark`, { action }),

  //   delete todo
  deleteTodo: (id: string) => api.delete(`/todos/${id}`),
};
