import { Label } from "./ui/label";

interface LabelProps {
  title: string;
}

export const Input = ({ title }: LabelProps) => {
  return (
    <Label className="absolute -top-2 left-3 bg-white px-1 text-sm text-[#50B5FF]">
      {title}
    </Label>
  );
};
