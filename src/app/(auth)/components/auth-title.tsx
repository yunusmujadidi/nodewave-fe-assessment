interface AuthTitleProps {
  title: string;
  description: string;
}
export const AuthTitle = ({ title, description }: AuthTitleProps) => {
  return (
    <div className="text-center space-y-3">
      <h1 className="font-bold text-[56px] leading-tight text-[#44444F] font-poppins">
        {title}
      </h1>
      <p className="text-[#92929D] font-roboto">{description}</p>
    </div>
  );
};
