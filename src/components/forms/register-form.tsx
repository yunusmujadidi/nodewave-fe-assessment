"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerFormSchema } from "@/lib/zod-schema";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/forms/form-label";
import { useAuth } from "@/hooks/use-auth";

export const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      country: "",
      password: "",
      confirmPassword: "",
      about: "",
    },
  });

  // register mutation func
  const registerMutation = useMutation({
    mutationFn: async (data: z.infer<typeof registerFormSchema>) => {
      const { fullName, email, password } = data;

      const registerData = {
        fullName,
        email,
        password,
      };

      console.log("Sending to API:", registerData);

      const response = await api.post("/register", registerData);
      return response.data;
    },

    onSuccess: (data) => {
      const token = data?.content?.token;
      const user = data?.content?.user;

      if (token && user) {
        // Save user and token to zustand store
        useAuth.getState().login(
          {
            id: user.id,
            email: user.email,
            name: user.fullName,
          },
          token
        );

        toast.success("Welcome! Your account has been created.");
        // redirect
        router.push("/");
      }
    },

    onError: (
      error: Error & {
        response?: {
          data?: {
            errors?: string[];
            message?: string;
          };
        };
      }
    ) => {
      const errorMessage =
        error.response?.data?.errors?.[0] ||
        error.response?.data?.message ||
        "Something went wrong";
      toast.error(errorMessage);
    },
  });

  // handle submit form
  const handleOnSubmit = (data: z.infer<typeof registerFormSchema>) => {
    registerMutation.mutate(data);
  };

  return (
    <Card className="w-full border-0 shadow-sm bg-white">
      <CardContent className="space-y-6 pt-6">
        {/* form controller */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="space-y-6"
          >
            {/* row 1*/}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {/* first name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <div className="relative w-full">
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder=" "
                          className={`h-12 border-1 focus-visible:ring-[#50B5FF]/20 peer bg-white ${
                            form.formState.errors.fullName ||
                            registerMutation.isError
                              ? "border-[#FC5A5A] focus-visible:border-[#FC5A5A]"
                              : "border-gray-300 focus-visible:border-[#50B5FF]"
                          }`}
                          {...field}
                        />
                      </FormControl>
                      <Label error={!!form.formState.errors.fullName}>
                        Full Name
                      </Label>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />

              {/* last name */}
              <div className="relative w-full">
                <Input
                  disabled
                  type="text"
                  placeholder=" "
                  className="h-12 border-1 border-gray-300 focus-visible:border-[#50B5FF] focus-visible:ring-[#50B5FF]/20 peer"
                />
                <Label> Last Name</Label>
              </div>
            </div>

            {/* row 2 */}
            {/* email input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className="relative">
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder=" "
                        className={`h-12 border-1 focus-visible:ring-[#50B5FF]/20 peer bg-white ${
                          form.formState.errors.email ||
                          registerMutation.isError
                            ? "border-[#FC5A5A] focus-visible:border-[#FC5A5A]"
                            : "border-gray-300 focus-visible:border-[#50B5FF]"
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <Label error={!!form.formState.errors.email}>
                      Email Address
                    </Label>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            {/* row 3*/}
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
                  disabled
                  type="text"
                  placeholder=" "
                  className="h-12 border-1 border-gray-300 focus-visible:border-[#50B5FF] focus-visible:ring-[#50B5FF]/20 peer"
                />
                <Label>Phone Number</Label>
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

            {/* row 4*/}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {/* password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="relative w-full">
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder=" "
                          className={`h-12 border-1 focus-visible:ring-[#50B5FF]/20 peer bg-white ${
                            form.formState.errors.password ||
                            registerMutation.isError
                              ? "border-[#FC5A5A] focus-visible:border-[#FC5A5A]"
                              : "border-gray-300 focus-visible:border-[#50B5FF]"
                          }`}
                          {...field}
                        />
                      </FormControl>
                      <Label error={!!form.formState.errors.password}>
                        Password
                      </Label>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />

              {/* confirm password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <div className="relative w-full">
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder=" "
                          className={`h-12 border-1 focus-visible:ring-[#50B5FF]/20 peer bg-white ${
                            form.formState.errors.confirmPassword ||
                            registerMutation.isError
                              ? "border-[#FC5A5A] focus-visible:border-[#FC5A5A]"
                              : "border-gray-300 focus-visible:border-[#50B5FF]"
                          }`}
                          {...field}
                        />
                      </FormControl>
                      <Label error={!!form.formState.errors.confirmPassword}>
                        Confirm Password
                      </Label>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            </div>

            {/* row 5 */}
            <div className="space-y-5">
              <label>Tell us about yourself</label>
              <Textarea
                disabled
                placeholder="Hello my name..."
                className="h-20 border-1 border-gray-300 focus-visible:border-[#50B5FF] focus-visible:ring-[#50B5FF]/20"
              />
            </div>

            {/* Submit buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-1/4 h-12 text-black bg-[#F1F1F5] hover:bg-[#F1F1F5]/50 font-medium"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>

              <Button
                type="submit"
                className="w-full sm:flex-1 h-12 bg-[#0062FF] hover:bg-[#0062FF]/90 font-medium"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <>
                    Register
                    <span>
                      <Loader2 className="animate-spin ml-2"></Loader2>
                    </span>
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
