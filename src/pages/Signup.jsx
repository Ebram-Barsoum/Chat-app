import SignupForm from "../features/Authentication/SignupForm";
import Logo from "../ui/Logo";

export default function Signup() {
  return (
    <div className="min-h-[100dvh] flex flex-col justify-start items-center   bg-slate-50">
      <Logo />
      <SignupForm />
    </div>
  );
}
