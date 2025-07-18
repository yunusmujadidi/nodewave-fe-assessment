"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const RegisterSection = () => {
  const router = useRouter();

  return (
    <div className="text-sm text-[#0062FF] font-medium font-roboto text-center">
      Don&apos;t have Nodewave account?
      <Button
        onClick={() => router.push("/register")}
        className="text-[#0062FF]"
        variant="link"
      >
        <span className="cursor-pointer">Register Now!</span>
      </Button>
    </div>
  );
};
