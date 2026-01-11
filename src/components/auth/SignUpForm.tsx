"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isChecked) return alert("Aceite os termos.");
    
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) alert("Cadastro realizado com sucesso!");
      else alert(result.message);
    } catch (err: unknown) {
      // Usando 'err' no console para resolver o erro da imagem
      console.error("Erro na conexão:", err);
      alert("Falha na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[480px] mx-auto px-6 py-8 lg:py-12 justify-center min-h-full">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
        <Link href="/" className="inline-flex items-center text-xs font-medium text-gray-400 hover:text-[#fb6514]">
          <ChevronLeftIcon className="w-5 h-5 mr-1" /> Voltar ao início
        </Link>
      </div>

      <div className="mb-10 text-center">
        <Link href="/" className="inline-block mb-6">
          <Image width={180} height={55} src="/images/logo/logo.png" alt="Kairós Logo" priority />
        </Link>
        <p className="text-base text-gray-500">Crie sua conta para gerenciar seu ateliê</p>
      </div>

      {/* Adicionamos name="" em cada Input para o FormData funcionar */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider">Nome*</Label>
            <Input type="text" placeholder="Nome" name="nome" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider">Sobrenome*</Label>
            <Input type="text" placeholder="Sobrenome" name="sobrenome" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider">E-mail*</Label>
          <Input type="email" placeholder="seu@email.com" name="email" />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider">Senha*</Label>
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"} 
              placeholder="Sua senha" 
              name="senha" 
            />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute -translate-y-1/2 cursor-pointer right-4 top-1/2">
              {showPassword ? <EyeIcon className="w-5 h-5 fill-gray-400" /> : <EyeCloseIcon className="w-5 h-5 fill-gray-400" />}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3 pt-2">
          <Checkbox checked={isChecked} onChange={setIsChecked} />
          <p className="text-[12px] text-gray-500">Eu concordo com os Termos e Privacidade.</p>
        </div>

        <button 
          disabled={loading} 
          type="submit"
          className="w-full bg-[#fb6514] hover:bg-[#e85a12] py-4 rounded-xl text-base font-bold text-white shadow-lg disabled:opacity-50"
        >
          {loading ? "Criando..." : "Criar Conta"}
        </button>
      </form>
    </div>
  );
}