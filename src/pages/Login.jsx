import LoginForm from "../features/Authentication/LoginForm";
import Logo from "../ui/Logo";

export default function Login() {
  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center bg-slate-50">
      <Logo />
      <LoginForm />
    </div>
  );
}
