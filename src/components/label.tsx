import { ReactNode } from "react";
import { Label as LabelUI } from "./ui/label";

interface LabelProps {
  children: ReactNode;
  error?: boolean;
}

export const Label = ({ children, error }: LabelProps) => {
  return (
    <LabelUI
      className={`absolute left-3 top-3 text-base font-light transition-all duration-200 ease-in-out pointer-events-none 
                  peer-focus-visible:-top-2 peer-focus-visible:bg-white peer-focus-visible:px-1 peer-focus-visible:text-xs peer-focus-visible:font-medium 
                  peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium
                  peer-autofill:-top-2 peer-autofill:bg-white peer-autofill:px-1 peer-autofill:text-xs peer-autofill:font-medium
                  ${
                    error
                      ? "text-[#FC5A5A] peer-focus-visible:text-[#FC5A5A] peer-[:not(:placeholder-shown)]:text-[#FC5A5A] peer-autofill:text-[#FC5A5A]"
                      : "text-[#92929D] peer-focus-visible:text-[#50B5FF] peer-[:not(:placeholder-shown)]:text-[#50B5FF] peer-autofill:text-[#50B5FF]"
                  }`}
    >
      {children}
    </LabelUI>
  );
};
