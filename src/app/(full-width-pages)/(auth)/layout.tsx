import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Removido p-6 para a imagem encostar nas bordas
    <div className="relative bg-white z-1 dark:bg-gray-900 min-h-screen overflow-hidden">
      <ThemeProvider>
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
          
          {/* Lado Esquerdo: Área do Formulário (Largura Ajustada) */}
          <div className="w-full lg:w-[40%] flex flex-col bg-white dark:bg-gray-900 overflow-y-auto no-scrollbar">
            {children}
          </div>

          {/* Lado Direito: Imagem (Largura 60% e preenchimento total) */}
          <div className="lg:w-[60%] relative hidden lg:flex h-screen">
            <Image
              src="/images/banner/01.png" 
              alt="Kairós ERP Business Woman"
              fill
              className="object-cover" // Preenche tudo sem distorcer
              priority
            />
          </div>

          {/* Botão de Tema */}
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}