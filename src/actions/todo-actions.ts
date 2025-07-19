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

// Define types for parameters
interface GetTodosParams {
  filters?: Record<string, string | number | boolean>;
  searchFilters?: Record<string, string | number | boolean>;
  rangedFilters?: Array<{
    key: string;
    start: string | number | Date;
    end: string | number | Date;
  }>;
  page?: number;
  rows?: number;
  orderKey?: string;
  orderRule?: "asc" | "desc";
}

interface QueryParams {
  filters?: string;
  searchFilters?: string;
  rangedFilters?: string;
  page?: number;
  rows?: number;
  orderKey?: string;
  orderRule?: "asc" | "desc";
}

export const todoActions = {
  // get all todos
  getTodos: (params?: GetTodosParams) => {
    const queryParams: QueryParams = {};

    // copy simple properties
    if (params?.page !== undefined) queryParams.page = params.page;
    if (params?.rows !== undefined) queryParams.rows = params.rows;
    if (params?.orderKey !== undefined) queryParams.orderKey = params.orderKey;
    if (params?.orderRule !== undefined)
      queryParams.orderRule = params.orderRule;

    // parse to json string
    if (params?.filters) {
      queryParams.filters = JSON.stringify(params.filters);
    }

    if (params?.searchFilters) {
      queryParams.searchFilters = JSON.stringify(params.searchFilters);
    }

    if (params?.rangedFilters) {
      queryParams.rangedFilters = JSON.stringify(params.rangedFilters);
    }

    return api.get<TodoResponse>("/todos", { params: queryParams });
  },

  // create todo
  createTodo: (item: string) => api.post("/todos", { item }),

  // change todo status todo
  markTodo: (id: string, action: "DONE" | "UNDONE") =>
    api.put(`/todos/${id}/mark`, { action }),

  //   delete todo
  deleteTodo: (id: string) => api.delete(`/todos/${id}`),
};
