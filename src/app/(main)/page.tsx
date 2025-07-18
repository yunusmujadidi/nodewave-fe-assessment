import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Home = () => {
  return (
    <div className="bg-[#E6E6E6] flex items-center justify-center min-h-screen">
      {/* bg rectangle component */}
      <Background />
      {/* content */}
      <div className="z-1 space-y-16 max-w-xl">
        {/* title */}
        <div>
          <h1 className="text-justify font-rubik text-[48px] font-bold text-[#174286]">
            To Do
          </h1>
        </div>
        {/* card content */}
        <Card className="border-0 bg-white">
          <CardHeader>
            <div>
              <h1>Add new task</h1>
            </div>
            <div className="flex flex-col md:flex-row ">
              <Input />
              <Button>Add Todo</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6"></CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
