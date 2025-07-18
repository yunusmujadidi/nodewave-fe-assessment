"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const LoginSection = () => {
  const router = useRouter();

  return (
    <div className="text-sm text-[#0062FF] font-medium font-roboto text-center">
      Already have a Nodewave account?
      <Button
        onClick={() => router.push("/login")}
        className="text-[#0062FF]"
        variant="link"
      >
        <span className="cursor-pointer">Login Now!</span>
      </Button>
    </div>
  );
};
