import "../globals.css";
import { GGInput } from "@/components/personal-form-components/GGInput";
import { Button } from "@/components/ui/button";
import { RegisterForm } from "@/components/forms/RegisterForm";

export default async function Login() {
  return (
    <div className="flex flex-row-reverse h-screen bg-linear-to-r from-gg-cyan-extralight to-gg-cyan-light p-10">
      <div className="w-2/5 p-10 pt-20 bg-gg-beige-light rounded-2xl shadow-2xl">
        <RegisterForm/>
      </div>
    </div>
  );
}
