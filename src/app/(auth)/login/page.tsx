import { AuthTitle } from "@/app/(auth)/components/auth-title";
import { Background } from "@/components/background";
import { LoginForm } from "@/components/forms/login-form";
import { RegisterSection } from "../components/register-section";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFB] flex items-center justify-center px-8">
      {/* bg rectangle component */}
      <Background />
      <div className="w-full max-w-xl space-y-8 z-10">
        {/* title */}
        <AuthTitle
          title="Sign In"
          description="Just sign in if you have an account in here. Enjoy our Website"
        />
        {/* login form */}
        <LoginForm />
        {/* register section */}
        <RegisterSection />
      </div>
    </div>
  );
};

export default LoginPage;
