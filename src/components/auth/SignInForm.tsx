"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SignInForm() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        // MUITO IMPORTANTE: O login() salva no contexto e faz o push para a rota protegida
        login({
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
        });
      } else {
        alert(result.message || "Erro ao entrar");
      }
    } catch (err: unknown) {
      console.error("Erro na conexão:", err);
      alert("Falha na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[480px] mx-auto px-6 py-8 lg:py-12 justify-center min-h-full">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-400 transition-colors hover:text-[#fb6514]"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-1" />
          Voltar ao início
        </Link>
      </div>

      <div className="flex flex-col flex-grow justify-center items-center px-6 py-4">
        <div className="w-full max-w-[440px]">
          <div className="mb-10 text-center">
            <Link href="/" className="inline-block mb-6">
              <Image
                width={180}
                height={55}
                src="/images/logo/logo.png"
                alt="Kairós Logo"
                priority
              />
            </Link>
            <p className="text-base text-gray-500 dark:text-gray-400">
              Acesse sua conta para gerenciar seu ateliê
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">E-mail</Label>
              <Input name="email" placeholder="seu@email.com" type="email" required />
            </div>
            
            <div className="space-y-1">
              <Label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Senha</Label>
              <div className="relative">
                <Input
                  name="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? <EyeIcon className="w-4 h-4 fill-gray-400" /> : <EyeCloseIcon className="w-4 h-4 fill-gray-400" />}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span className="text-gray-500">Manter logado</span>
              </div>
              <Link href="/reset-password" className="text-[#fb6514] font-medium hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#fb6514] hover:bg-[#e85a12] py-3.5 rounded-lg text-base font-bold text-white border-none mt-2"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Não tem uma conta?{" "}
              <Link href="/signup" className="text-[#fb6514] font-bold hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}