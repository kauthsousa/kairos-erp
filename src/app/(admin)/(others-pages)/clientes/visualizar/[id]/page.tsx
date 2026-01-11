"use client";
import React from "react";
import PageBreadcrumb from "../../../../../../components/common/PageBreadCrumb";
import Link from "next/link";

const VisualizarCliente = () => {
    // Simulação de dados baseada no seu formulário de cadastro
    const cliente = {
        id: "1",
        nome: "João da Silva",
        cpf: "000.000.000-00",
        telefone: "(88) 9 9999-9999",
        dataNascimento: "1990-01-01",
        endereco: "Rua Exemplo, 123, Bairro Centro, Cidade - UF",
        status: "Ativo"
    };

    // URL para o Google Maps
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(cliente.endereco)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="mx-auto max-w-4xl">
        <PageBreadcrumb 
            pageTitle="Ficha do Cliente" 
            customLinks={[{ name: "Clientes", route: "/clientes" }]} 
        />

        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            {/* Cabeçalho de Identificação */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stroke px-6 py-8 dark:border-dark-3 md:px-9">
            <div>
                <h3 className="text-2xl font-bold text-dark dark:text-white">
                {cliente.nome}
                </h3>
                <p className="mt-1 text-sm font-medium text-gray-500 font-mono">
                CPF: {cliente.cpf}
                </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                {cliente.status}
            </span>
            </div>

            <div className="p-6 md:p-9">
            {/* Grade de Informações */}
            <div className="grid grid-cols-1 gap-y-7 gap-x-8 md:grid-cols-2 mb-8">
                <div>
                <span className="mb-2 block text-xs font-medium uppercase text-gray-400">Telefone / WhatsApp</span>
                <p className="text-base font-semibold text-dark dark:text-white">
                    {cliente.telefone}
                </p>
                </div>

                <div>
                <span className="mb-2 block text-xs font-medium uppercase text-gray-400">Data de Nascimento</span>
                <p className="text-base font-semibold text-dark dark:text-white">
                    {new Date(cliente.dataNascimento).toLocaleDateString('pt-BR')}
                </p>
                </div>

                <div className="md:col-span-2">
                <span className="mb-2 block text-xs font-medium uppercase text-gray-400">Endereço Completo</span>
                <div className="rounded-lg bg-gray-2 p-4 text-dark dark:bg-dark-3 dark:text-white font-medium">
                    {cliente.endereco}
                </div>
                </div>
            </div>

            {/* Localização no Mapa */}
            <div className="mb-8 w-full overflow-hidden rounded-lg border border-stroke dark:border-dark-3">
                <iframe
                width="100%"
                height="350"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapUrl}
                ></iframe>
            </div>

            {/* Ação Principal */}
            <div className="mt-10 border-t border-stroke pt-8 dark:border-dark-3">
                <Link
                href={`/clientes/editar/${cliente.id}`}
                className="block w-full rounded-lg bg-[#fb6514] p-3 text-center font-medium text-white hover:bg-opacity-90 transition-all shadow-md"
                >
                Editar Cadastro do Cliente
                </Link>
            </div>
            </div>
        </div>
        </div>
    );
};

export default VisualizarCliente;