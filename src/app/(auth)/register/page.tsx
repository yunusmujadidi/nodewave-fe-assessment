import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// TODO: implement register functionality and form component
// TODO: implement country code placeholder
// TODO: make a select country hooks and separate component

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFB] flex items-center justify-center px-8">
      <Background />
      <div className="w-full max-w-xl space-y-8 z-10">
        {/* title */}
        <div className="text-center space-y-3">
          <h1 className="font-bold text-[56px] leading-tight text-[#44444F] font-poppins mt-10 md:mt-0">
            Register
          </h1>
          <p className="text-[#92929D] font-roboto">
            Let's Sign up first for enter into Square Website. Uh She Up!
          </p>
        </div>
        {/* register form */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="space-y-6 pt-6">
            {/*row 1*/}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {/* first name */}
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder=" "
                  className="h-12 border-1 border-gray-300 focus-visible:border-[#50B5FF] focus-visible:ring-[#50B5FF]/20 peer"
                />
                <Label className="absolute left-3 top-3 text-[#92929D] text-base font-light transition-all duration-200 ease-in-out pointer-events-none peer-focus-visible:-top-2 peer-focus-visible:text-[#50B5FF] peer-focus-visible:bg-white peer-focus-visible:px-1 peer-focus-visible:text-xs peer-focus-visible:font-medium peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[#50B5FF] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium">
                  First Name
                </Label>
              </div>
              {/* last name */}
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder=" "
                  className="h-12 border-1 border-gray-300 focus-visible:border-[#50B5FF] focus-visible:ring-[#50B5FF]/20 peer"
                />
                <Label className="absolute left-3 top-3 text-[#92929D] text-base font-light transition-all duration-200 ease-in-out pointer-events-none peer-focus-visible:-top-2 peer-focus-visible:text-[#50B5FF] peer-focus-visible:bg-white peer-focus-visible:px-1 peer-focus-visible:text-xs peer-focus-visible:font-medium peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[#50B5FF] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium">
                  Last Name
                </Label>
              </div>
            </div>
            {/*row 2*/}
            <div className="flex flex-wrap gap-4">
              {/* country code */}
              <div className="relative">
                <Input
                  disabled
                  type="text"
                  placeholder="+62"
                  className="h-12 w-15 border-1 border-gray-300 focus-visible:border-[#50B5FF] focus-visible:ring-[#50B5FF]/20"
                />
              </div>
              {/* phone number */}
              <div className="relative flex-1 min-w-0">
                <Input
                  type="text"
                  placeholder=" "
                  className="h-12 border-1 border-gray-300 focus-visible:border-[#50B5FF] focus-visible:ring-[#50B5FF]/20 peer"
                />
                <Label className="absolute left-3 top-3 text-[#92929D] text-base font-light transition-all duration-200 ease-in-out pointer-events-none peer-focus-visible:-top-2 peer-focus-visible:text-[#50B5FF] peer-focus-visible:bg-white peer-focus-visible:px-1 peer-focus-visible:text-xs peer-focus-visible:font-medium peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[#50B5FF] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium">
                  Phone Number
                </Label>
              </div>
              {/* country select */}
              <div className="relative w-full md:w-1/2 md:min-w-0">
                <Select>
                  <SelectTrigger className="!h-12 w-full border-1 border-gray-300 focus-visible:border-[#50B5FF] focus-visible:ring-[#50B5FF]/20">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Countries</SelectLabel>
                      <SelectItem value="indonesia">Indonesia</SelectItem>
                      <SelectItem value="singapore">Singapore</SelectItem>
                      <SelectItem value="malaysia">Malaysia</SelectItem>
                      <SelectItem value="thailand">Thailand</SelectItem>
                      <SelectItem value="philippines">Philippines</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* row 3*/}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {/* password */}
              <div className="relative w-full">
                <Input
                  type="password"
                  placeholder=" "
                  className="h-12 border-1 border-gray-300 focus-visible:border-[#50B5FF] focus-visible:ring-[#50B5FF]/20 peer"
                />
                <Label className="absolute left-3 top-3 text-[#92929D] text-base font-light transition-all duration-200 ease-in-out pointer-events-none peer-focus-visible:-top-2 peer-focus-visible:text-[#50B5FF] peer-focus-visible:bg-white peer-focus-visible:px-1 peer-focus-visible:text-xs peer-focus-visible:font-medium peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[#50B5FF] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium">
                  Password
                </Label>
              </div>
              {/* confirm password */}
              <div className="relative w-full">
                <Input
                  type="password"
                  placeholder=" "
                  className="h-12 border-1 border-gray-300 focus-visible:border-[#50B5FF] focus-visible:ring-[#50B5FF]/20 peer"
                />
                <Label className="absolute left-3 top-3 text-[#92929D] text-base font-light transition-all duration-200 ease-in-out pointer-events-none peer-focus-visible:-top-2 peer-focus-visible:text-[#50B5FF] peer-focus-visible:bg-white peer-focus-visible:px-1 peer-focus-visible:text-xs peer-focus-visible:font-medium peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[#50B5FF] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium">
                  Confirm Password
                </Label>
              </div>
            </div>

            {/* tell us section*/}
            <div className="space-y-5">
              <Label className="font-normal">Tell use about yourself</Label>
              <Textarea
                placeholder="Hello my name..."
                className="h-20 border-1 border-gray-300 focus-visible:border-[#50B5FF] focus-visible:ring-[#50B5FF]/20"
              />
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                className="w-full sm:w-1/4 h-12 text-black bg-[#F1F1F5] hover:bg-[#F1F1F5]/50 font-medium"
              >
                Login
              </Button>

              <Button className="w-full sm:flex-1 h-12 bg-[#0062FF] hover:bg-[#0062FF]/90 font-medium">
                Register
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
