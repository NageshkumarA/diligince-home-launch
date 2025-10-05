import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignInForm } from "@/components/auth/SignInForm";
import { AuthProvider } from "@/context/AuthContext";


const SignIn: React.FC = () => {
  return (
    <AuthProvider>
      <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
        <SignInForm />
      </AuthLayout>
    </AuthProvider>

  );
};

export default SignIn;
