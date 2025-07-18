import { AuthTitle } from "@/app/(auth)/components/auth-title";
import { Background } from "@/components/background";
import { RegisterForm } from "@/components/forms/register-form";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFB] flex items-center justify-center px-8">
      {/* bg rectangle component */}
      <Background />
      <div className="w-full max-w-xl space-y-8 z-10">
        {/* title */}
        <AuthTitle
          title="Register"
          description="Let's Sign up first for enter into Square Website. Uh She Up!"
        />
        {/* register form */}
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
