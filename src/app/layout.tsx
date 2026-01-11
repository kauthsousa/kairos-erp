import { Outfit } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext'; // Importe o seu AuthProvider

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kairós ERP | Gestão de Produção",
  description: "Sistema ERP para Ateliês",
  icons: {
    icon: "/favicon.ico?v=1", 
    shortcut: "/favicon.ico?v=1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${outfit.className} antialiased dark:bg-gray-900`}>
        {/* O AuthProvider deve ser o primeiro para que todos os outros contextos saibam quem é o usuário */}
        <AuthProvider>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}