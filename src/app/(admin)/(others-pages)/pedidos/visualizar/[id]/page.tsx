"use client";

import React from "react";
import PageBreadcrumb from "../../../../../../components/common/PageBreadCrumb";
import Image from "next/image";

const VisualizarPedido = () => {
    // Exemplo de dados (No futuro virão do seu banco de dados)
    const pedido = {
        cliente: "JANDERLINE (FRALDAS)",
        telefone: "88 9 9690 4585",
        dataFabricacao: "20/11/2025",
        dataEntrega: "02/01/2026",
        descricao: "5 FRALDAS, BORDAR - BRYAN DAVI, TEMA ALFABETO SAFARI",
        valorTotal: 175.00,
        entrada: 87.50,
        restante: 87.50,
        status: "Em Produção",
        imagemRef: "/images/modelos/safari-exemplo.jpg" // Caminho da imagem salva
    };

    return (
        <div className="mx-auto max-w-4xl">
        <PageBreadcrumb 
            pageTitle="Detalhes do Pedido" 
            customLinks={[{ name: "Pedidos", route: "/pedidos" }]} 
        />

        <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card md:p-9">
            {/* Cabeçalho com Status */}
            <div className="mb-9 flex flex-wrap items-center justify-between gap-3 border-b border-stroke pb-6 dark:border-dark-3">
            <div>
                <h3 className="text-2xl font-bold text-dark dark:text-white">
                {pedido.cliente}
                </h3>
                <p className="mt-1 text-sm font-medium text-gray-500">{pedido.telefone}</p>
            </div>
            <div className="inline-flex items-center rounded-full bg-warning/10 px-3 py-1 text-sm font-medium text-warning">
                {pedido.status}
            </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Coluna da Esquerda: Informações e Valores */}
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="block text-xs font-medium uppercase text-gray-500">Data Fabricação</span>
                    <span className="text-base font-semibold text-dark dark:text-white">{pedido.dataFabricacao}</span>
                </div>
                <div>
                    <span className="block text-xs font-medium uppercase text-gray-500 text-red-500">Data Limite</span>
                    <span className="text-base font-semibold text-red-500">{pedido.dataEntrega}</span>
                </div>
                </div>

                <div>
                <span className="block text-xs font-medium uppercase text-gray-500 mb-2">Descrição do Produto</span>
                <p className="rounded-lg bg-gray-2 p-4 text-sm text-dark dark:bg-dark-3 dark:text-white">
                    {pedido.descricao}
                </p>
                </div>

                <div className="rounded-lg border border-stroke p-4 dark:border-dark-3">
                <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Valor Total:</span>
                    <span className="font-bold text-dark dark:text-white">R$ {pedido.valorTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-green-600">
                    <span className="text-sm">Entrada Recebida:</span>
                    <span className="font-bold">- R$ {pedido.entrada.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-stroke pt-2 mt-2 dark:border-dark-3">
                    <span className="text-base font-bold text-dark dark:text-white">Valor Restante:</span>
                    <span className="text-lg font-black text-[#fb6514]">R$ {pedido.restante.toFixed(2)}</span>
                </div>
                </div>
            </div>

            {/* Coluna da Direita: Imagem de Referência */}
            <div className="flex flex-col items-center">
                <span className="mb-3 block w-full text-left text-xs font-medium uppercase text-gray-500">Referência Visual</span>
                <div className="relative h-64 w-full overflow-hidden rounded-xl border border-stroke dark:border-dark-3">
                {/* Substitua pela imagem real ou um placeholder */}
                <div className="flex h-full w-full items-center justify-center bg-gray-2 dark:bg-dark-3 text-gray-400">
                    [Imagem do Bordado Safari]
                </div>
                </div>
            </div>
            </div>

            {/* Ações Inferiores */}
            <div className="mt-10 flex flex-wrap gap-4 border-t border-stroke pt-8 dark:border-dark-3">
            <button 
                onClick={() => alert('Pedido Concluído!')}
                className="flex-1 rounded-lg bg-green-600 p-3 font-medium text-white hover:bg-opacity-90 transition-all"
            >
                Concluir Pedido
            </button>
            <button className="rounded-lg border border-stroke px-6 py-3 font-medium text-dark hover:bg-gray-100 dark:border-dark-3 dark:text-white dark:hover:bg-white/5">
                Imprimir Recibo
            </button>
            </div>
        </div>
        </div>
    );
};

export default VisualizarPedido;