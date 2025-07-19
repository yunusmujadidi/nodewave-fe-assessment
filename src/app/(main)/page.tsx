"use client";
import z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, XCircle } from "lucide-react";
import { SearchHeader } from "@/components/search-header";
import { useAuth } from "@/hooks/use-auth";
import { todoActions } from "@/actions/todo-actions";
import { todoSchema } from "@/lib/zod-schema";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const queryClient = useQueryClient();
  const { token } = useAuth();
  const router = useRouter();

  // query params
  const queryParams = {
    page: 1,
    rows: 10,
    orderKey: "createdAt",
    orderRule: "desc" as const,
    ...(searchText && {
      searchFilters: { item: searchText },
    }),
  };

  // fetch todo
  const { data: todosData, isLoading } = useQuery({
    queryKey: ["todos", queryParams],
    queryFn: () => todoActions.getTodos(queryParams),
    enabled: !!token,
  });

  const todos = todosData?.data?.content?.entries || [];

  // todo mutations
  const createTodoMutation = useMutation({
    mutationFn: todoActions.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      form.reset();
      toast.success("Todo added successfully!");
    },
    onError: () => toast.error("Failed to add todo."),
  });

  const markTodoMutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: "DONE" | "UNDONE" }) =>
      todoActions.markTodo(id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: todoActions.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted successfully!");
    },
    onError: () => toast.error("Failed to delete todo."),
  });

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: { item: "" },
  });

  const handleOnSubmit = (data: z.infer<typeof todoSchema>) => {
    createTodoMutation.mutate(data.item);
  };

  if (!token) {
    return (
      <div className="bg-[#E6E6E6] min-h-screen">
        <Background />

        {/* search header */}
        <SearchHeader
          onSearch={() => {}}
          searchValue=""
          placeholder="Please log in to search"
        />

        <div className="flex items-center justify-center px-4 py-8">
          <Card className="z-10 p-10 max-w-md w-full shadow-xl rounded-2xl bg-white border border-gray-200 text-center space-y-6">
            <h2 className="text-2xl font-bold text-[#174286] font-rubik">
              You are not logged in
            </h2>
            <p className="text-gray-500">
              Please log in to access your to-do list.
            </p>
            <Button
              className="w-full h-12 text-lg font-semibold"
              onClick={() => router.push("/login")}
            >
              Go to Login
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#E6E6E6] min-h-screen">
      {/* search header */}
      <SearchHeader onSearch={setSearchText} searchValue={searchText} />

      {/* bg rectangle component */}
      <Background />

      {/* main content */}
      <div className="flex items-center justify-center px-4 py-8">
        <div className="z-10 w-full max-w-[958px]">
          {/* title */}
          <div className="mb-12">
            <h1 className="text-center font-rubik text-[48px] font-bold text-[#174286]">
              To Do
            </h1>
          </div>

          {/* card content */}
          <Card className="shadow-lg bg-white border-gray-200 rounded-2xl py-0">
            <CardContent className="p-16">
              {/* new task section */}
              <div className="mb-12">
                <h2 className="text-[#7D7D7D] font-rubik text-[20px] font-medium mb-6">
                  Add a new task
                </h2>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleOnSubmit)}
                    className="flex items-end gap-6"
                  >
                    <FormField
                      control={form.control}
                      name="item"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="Add todo..."
                              className="!h-[60px] !text-[32px] !font-semibold px-4 py-2 !leading-[60px] border-0 border-b-2 border-black rounded-none shadow-none font-rubik focus-visible:ring-0 focus-visible:border-black bg-transparent"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      variant="todo-add"
                      size="todo-add"
                      disabled={createTodoMutation.isPending}
                    >
                      {createTodoMutation.isPending ? "Adding..." : "Add Todo"}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* todo List */}
              <div className="space-y-6 mb-12">
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex items-center gap-6">
                        <Checkbox
                          checked={selectedIds.has(todo.id)}
                          onCheckedChange={(checked) => {
                            setSelectedIds((prev) => {
                              const newSet = new Set(prev);
                              if (checked) {
                                newSet.add(todo.id);
                              } else {
                                newSet.delete(todo.id);
                              }
                              return newSet;
                            });
                          }}
                          className="size-6 ..."
                        />
                        <span className="text-[32px] font-normal font-rubik text-[#323232]">
                          {todo.item}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`p-2 hover:${
                            todo.isDone ? "bg-red-50" : "bg-green-50"
                          } rounded-full`}
                          onClick={() =>
                            markTodoMutation.mutate({
                              id: todo.id,
                              action: todo.isDone ? "UNDONE" : "DONE",
                            })
                          }
                        >
                          {todo.isDone ? (
                            <XCircle className="size-8 text-[#F01414]" />
                          ) : (
                            <CheckCircle2 className="size-8 text-[#6DD230]" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* bulk delete */}
              <div>
                <Button
                  variant="todo-remove"
                  size="todo-remove"
                  disabled={selectedIds.size === 0}
                  onClick={() => {
                    selectedIds.forEach((id) => {
                      deleteTodoMutation.mutate(id);
                    });
                    setSelectedIds(new Set());
                  }}
                >
                  Delete Selected
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
