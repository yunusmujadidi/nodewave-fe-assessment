import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// TODO: make a seperate login form component and login implement
// TODO: update input for reusable component
// TODO: change error input state color to #FC5A5A
// TODO: implement link route on login

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFB] flex items-center justify-center px-8">
      {/* bg rectangle component */}
      <Background />
      <div className="w-full max-w-xl space-y-8 z-1">
        {/* title */}
        <div className="text-center space-y-3">
          <h1 className="font-bold text-[56px] leading-tight text-[#44444F] font-poppins">
            Sign In
          </h1>
          <p className="text-[#92929D] font-roboto">
            Just sign in if you have an account in here. Enjoy our Website
          </p>
        </div>
        {/* login form */}
        <Card className="w-full border-0 shadow-sm bg-white">
          <CardContent className="space-y-8">
            <div className="relative">
              <Label className="absolute -top-2 left-3 bg-white px-1 text-sm text-[#50B5FF]">
                Your Email / Username
              </Label>
              <Input
                type="email"
                placeholder="soeraj@squareteam.com"
                className="h-12 border-1 border-[#50B5FF] focus-visible:border-[#50B5FF]  focus-visible:ring-[#50B5FF]/20"
              />
            </div>
            <div className="relative">
              <Label className="absolute -top-2 left-3 bg-white px-1 text-sm text-[#50B5FF]">
                Enter Password
              </Label>
              <Input
                type="password"
                placeholder="••••••••••"
                className="h-12 border-1 border-[#50B5FF] focus-visible:border-[#50B5FF]  focus-visible:ring-[#50B5FF]/20"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="data-[state=checked]:bg-[#50B5FF] data-[state=checked]:border-[#50B5FF]"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-[#696974] font-medium"
                >
                  Remember Me
                </Label>
              </div>
              <button className="text-sm text-[#50B5FF] hover:underline font-medium cursor-pointer">
                Forgot Password
              </button>
            </div>
            <Button className="w-full h-12 bg-[#0062FF] hover:bg-[#0062FF]/90 text-white font-medium cursor-pointer">
              Login
            </Button>
          </CardContent>
        </Card>
        {/* forgot password section */}
        <div className="text-center">
          <button className="text-sm text-[#0062FF] font-medium font-roboto">
            Don&apos;t have Nodewave account?
            <span className="hover:underline cursor-pointer ml-1">
              Register Now!
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
