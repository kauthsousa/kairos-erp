"use client";

import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

const PedidosPage = () => {
  // Exemplo de lógica para identificar atraso
    const hoje = new Date();

    const [exibirModal, setExibirModal] = useState(false);
    const [pedidoParaExcluir, setPedidoParaExcluir] = useState<string | null>(null);

    const confirmarExclusao = (id: string) => {
    setPedidoParaExcluir(id);
    setExibirModal(true);
    };

    const handleExcluir = () => {
    console.log("Pedido excluído:", pedidoParaExcluir);
    setExibirModal(false);
    // Aqui você chamaria sua função de deletar do banco
    };

    return (
        <div className="mx-auto max-w-7xl">
            <PageBreadcrumb pageTitle="Pedidos" />

            <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
                <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
                <h4 className="text-body-2xl font-bold text-dark dark:text-white">Gerenciamento de Pedidos</h4>
                <Link href="/pedidos/cadastro" className="inline-flex items-center justify-center rounded-md bg-[#fb6514] px-6 py-2.5 text-center font-medium text-white hover:bg-opacity-90">
                    + Novo Pedido
                </Link>
                </div>

                <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto text-left">
                    <thead>
                    <tr className="bg-gray-2 dark:bg-dark-2">
                        <th className="px-4 py-4 font-medium text-dark dark:text-white text-sm">Cliente</th>
                        <th className="px-4 py-4 font-medium text-dark dark:text-white text-sm">Recebimento</th>
                        <th className="px-4 py-4 font-medium text-dark dark:text-white text-sm">Entrega Limite</th>
                        <th className="px-4 py-4 font-medium text-dark dark:text-white text-sm">Restante</th>
                        <th className="px-4 py-4 font-medium text-dark dark:text-white text-center text-sm">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Exemplo de Pedido Atrasado */}
                    <tr className="text-red-600 bg-red-50 dark:bg-red-900/10">
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-dark-3 font-bold">JANDERLINE (FRALDAS)</td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-dark-3">20/11/2025</td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-dark-3">02/01/2026</td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-dark-3 font-bold">R$ 87,50</td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-dark-3">
                        <div className="flex items-center justify-center gap-3">
                            <button title="Visualizar"><Image src="/images/icons/olho.svg" alt="Ver" width={18} height={18} /></button>
                            <button title="Editar"><Image src="/images/icons/editar.svg" alt="Editar" width={18} height={18} /></button>
                            <button title="Excluir" onClick={() => confirmarExclusao("ID_DO_PEDIDO")}><Image src="/images/icons/lixo.svg" alt="Excluir" width={18} height={18} /></button>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>

            {exibirModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-[400px] rounded-lg bg-white p-8 text-center dark:bg-gray-dark">
                    <h3 className="mb-4 text-xl font-bold text-dark dark:text-white">Confirmar Exclusão</h3>
                    <p className="mb-8 text-sm text-gray-500">
                        Tem certeza que deseja excluir o pedido de <strong>JANDERLINE</strong>? Esta ação não pode ser desfeita.
                    </p>
                    <div className="flex gap-4">
                        <button 
                        onClick={() => setExibirModal(false)}
                        className="flex-1 rounded-md border border-stroke py-2 text-dark hover:bg-gray-100 dark:border-dark-3 dark:text-white dark:hover:bg-white/5"
                        >
                        Cancelar
                        </button>
                        <button 
                        onClick={handleExcluir}
                        className="flex-1 rounded-md bg-red-600 py-2 text-white hover:bg-opacity-90"
                        >
                        Sim, Excluir
                        </button>
                    </div>
                    </div>
                </div>
            )};

        </div>
    );
};

export default PedidosPage;