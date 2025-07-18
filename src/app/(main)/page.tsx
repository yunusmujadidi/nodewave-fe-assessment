import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, XCircle } from "lucide-react";

// TODO: fetch todo data
// TODO: checkmark func
// TODO: remove func
// TODO: delete button
// TODO: add todo

// mock data
const mockTodos = [
  { id: 1, text: "Hello", completed: true, selected: false },
  { id: 2, text: "This", completed: false, selected: false },
  { id: 3, text: "Good", completed: false, selected: false },
];

const Home = () => {
  return (
    <div className="bg-[#E6E6E6] flex items-center justify-center min-h-screen px-4">
      {/* bg rectangle component */}
      <Background />
      {/* content */}
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
            {/* new task section*/}
            <div className="mb-12">
              <h2 className="text-[#7D7D7D] font-rubik text-[20px] font-medium mb-6">
                Add a new task
              </h2>
              <div className="flex items-end gap-6">
                <div className="flex-1">
                  <Input
                    placeholder="Hello"
                    className="!h-[60px] !text-[32px] !font-semibold px-4 py-2 !leading-[60px] border-0 border-b-2 border-black rounded-none shadow-none font-rubik focus-visible:ring-0 focus-visible:border-black bg-transparent"
                  />
                </div>
                <Button variant="todo-add" size="todo-add">
                  Add Todo
                </Button>
              </div>
            </div>

            {/* todo list*/}
            <div className="space-y-6 mb-12">
              {mockTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
                >
                  {/* todo content*/}
                  <div className="flex items-center gap-6">
                    <Checkbox
                      checked={todo.completed}
                      className="size-6 data-[state=checked]:bg-lime-200 data-[state=checked]:border-none data-[state=checked]:text-[#6DD230] data-[state=checked]:border-[#6DD230] data-[state=unchecked]:bg-gray-300 border-2 border-gray-300 rounded-sm"
                    />
                    <span className="text-[32px] font-normal font-rubik text-[#323232]">
                      {todo.text}
                    </span>
                  </div>

                  {/* actions */}
                  <div className="flex items-center">
                    {todo.completed ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 hover:bg-red-50 rounded-full"
                      >
                        <XCircle className="size-8 text-[#F01414]" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 hover:bg-green-50 rounded-full"
                      >
                        <CheckCircle2 className="size-8 text-[#6DD230]" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* delete button */}
            <div>
              <Button variant="todo-remove" size="todo-remove">
                Deleted Selected
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
