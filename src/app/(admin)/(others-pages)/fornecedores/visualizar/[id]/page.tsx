"use client";
import React from "react";
import PageBreadcrumb from "../../../../../../components/common/PageBreadCrumb";
import Link from "next/link";

const VisualizarFornecedor = () => {
    // Dados do fornecedor baseados no seu formulário
    const fornecedor = {
        id: "1",
        razaoSocial: "Distribuidora Kairós Ltda",
        cnpj: "00.000.000/0001-00",
        telefone: "(11) 4002-8922",
        email: "contato@kairos.com.br",
        endereco: "Rua Exemplo, 123 - Bairro Centro, Cidade - UF",
        status: "Ativo"
    };

    // URL para o Google Maps baseada no endereço
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(fornecedor.endereco)}&output=embed`;

    return (
        <div className="mx-auto max-w-4xl">
        <PageBreadcrumb 
            pageTitle="Ficha do Fornecedor" 
            customLinks={[{ name: "Fornecedores", route: "/fornecedores" }]} 
        />

        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            {/* Cabeçalho */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stroke px-6 py-8 dark:border-dark-3 md:px-9">
            <div>
                <h3 className="text-2xl font-bold text-dark dark:text-white">
                {fornecedor.razaoSocial}
                </h3>
                <p className="mt-1 text-sm font-medium text-gray-500 font-mono">
                CNPJ: {fornecedor.cnpj}
                </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                {fornecedor.status}
            </span>
            </div>

            <div className="p-6 md:p-9">
            {/* Informações em Grade */}
            <div className="grid grid-cols-1 gap-y-7 gap-x-8 md:grid-cols-2 mb-8">
                <div>
                <span className="mb-2 block text-xs font-medium uppercase text-gray-400">Telefone Contato</span>
                <p className="text-base font-semibold text-dark dark:text-white">{fornecedor.telefone}</p>
                </div>
                <div>
                <span className="mb-2 block text-xs font-medium uppercase text-gray-400">E-mail Comercial</span>
                <p className="text-base font-semibold text-dark dark:text-white">{fornecedor.email}</p>
                </div>
                <div className="md:col-span-2">
                <span className="mb-2 block text-xs font-medium uppercase text-gray-400">Endereço Comercial</span>
                <p className="text-base font-medium text-dark dark:text-white">{fornecedor.endereco}</p>
                </div>
            </div>

            {/* Visualização do Google Maps */}
            <div className="mb-8 w-full overflow-hidden rounded-lg border border-stroke dark:border-dark-3">
                <iframe
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapUrl}
                ></iframe>
            </div>

            {/* Ações (Apenas o botão de editar) */}
            <div className="mt-10 border-t border-stroke pt-8 dark:border-dark-3">
                <Link
                href={`/fornecedores/editar/${fornecedor.id}`}
                className="block w-full rounded-lg bg-[#fb6514] p-3 text-center font-medium text-white hover:bg-opacity-90 transition-all"
                >
                Editar Fornecedor
                </Link>
            </div>
            </div>
        </div>
        </div>
    );
};

export default VisualizarFornecedor;