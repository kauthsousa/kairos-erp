import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastre-se | Kairós ERP",
  description: "Crie sua conta no Kairós ERP",
};

export default function SignUp() {
  return <SignUpForm />;
}