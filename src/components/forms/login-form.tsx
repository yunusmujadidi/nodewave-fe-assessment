"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/forms/form-label";
import { Label as LabelUI } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormSchema } from "@/lib/zod-schema";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// TODO: implement remember me checkbox

export const LoginForm = () => {
  const router = useRouter();
  const login = useAuth((state) => state.login);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // login mutation func
  const loginMutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginFormSchema>) => {
      const response = await api.post("/login", data);
      return response.data;
    },

    onSuccess: (data) => {
      // store data in useAuth hooks
      console.log("Login success:", data);
      login(data.content.user, data.content.token);
      toast.success("Login successful!");
      console.log("after login:", useAuth.getState());
      // redirect
      if (data.content.user.email === "admin@nodewave.id") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    },

    onError: (
      error: Error & { response?: { data?: { message?: string } } }
    ) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  // handle submit form
  const handleOnSubmit = (data: z.infer<typeof loginFormSchema>) => {
    loginMutation.mutate(data);
  };

  return (
    <Card className="w-full border-0 shadow-sm bg-white">
      <CardContent className="space-y-8">
        {/* form controller */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="space-y-6"
          >
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
                          form.formState.errors.email || loginMutation.isError
                            ? "border-[#FC5A5A] focus-visible:border-[#FC5A5A]"
                            : "border-gray-300 focus-visible:border-[#50B5FF]"
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <Label error={!!form.formState.errors.email}>
                      Email / Username
                    </Label>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            {/* password input */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <div className="relative">
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder=" "
                        className={`h-12 border-1 focus-visible:ring-[#50B5FF]/20 peer bg-white ${
                          form.formState.errors.password ||
                          loginMutation.isError
                            ? "border-[#FC5A5A] focus-visible:border-[#FC5A5A]"
                            : "border-gray-300 focus-visible:border-[#50B5FF]"
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <Label error={!!form.formState.errors.password}>
                      Enter Password
                    </Label>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            {/* checkbox remember me and forgot password section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="data-[state=checked]:bg-[#50B5FF] data-[state=checked]:border-[#50B5FF]"
                />
                <LabelUI
                  htmlFor="remember"
                  className="text-sm text-[#696974] font-medium"
                >
                  Remember Me
                </LabelUI>
              </div>
              <button
                type="button"
                className="text-sm text-[#50B5FF] hover:underline font-medium cursor-pointer"
              >
                Forgot Password
              </button>
            </div>

            {/* submit button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#0062FF] hover:bg-[#0062FF]/90 text-white font-medium cursor-pointer"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  Login
                  <span>
                    <Loader2 className="animate-spin ml-2"></Loader2>
                  </span>
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
