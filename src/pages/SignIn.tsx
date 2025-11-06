import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignInForm } from "@/components/auth/SignInForm";

const SignIn: React.FC = () => {
  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;
