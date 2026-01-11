import Calendar from "@/components/calendar/Calendar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

// Metadados atualizados para a identidade da Kairós
export const metadata: Metadata = {
  title: "Agenda de Produção | Kairós ERP",
  description: "Controle de prazos de fabricação e entrega da Oficina Kairós",
};

export default function AgendaPage() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Breadcrumb para navegação interna */}
      <PageBreadcrumb pageTitle="Agenda de Produção" />

      {/* O componente Calendar abaixo agora gerencia:
        1. Visualização Mês/Semana/Dia
        2. Tradução para Português
        3. Regras de cores (Laranja, Branco/Laranja, Vermelho)
      */}
      <div className="mt-4">
        <Calendar />
      </div>
    </div>
  );
}