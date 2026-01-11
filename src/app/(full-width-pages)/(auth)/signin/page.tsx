import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar | Kairós ERP",
  description: "Acesse o sistema ERP do seu Ateliê",
};

export default function SignIn() {
  return (
    // Container principal que garante centralização e fundo correto em qualquer tela
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <SignInForm />
    </main>
  );
}