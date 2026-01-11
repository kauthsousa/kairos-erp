"use client"

import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb";
import Image from "next/image";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Portuguese } from "flatpickr/dist/l10n/pt";

const CadastroPedido = () => {
    return (
        <div className="mx-auto max-w-270">
        <PageBreadcrumb pageTitle="Novo Pedido" customLinks={[{ name: "Pedidos", route: "/pedidos" }]} />

        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
            <form className="p-7">
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-dark dark:text-white">Data de Fabricação</label>
                    <Flatpickr
                        options={{ locale: Portuguese, dateFormat: "d/m/Y", allowInput: true }}
                        placeholder="dd/mm/aaaa"
                        className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 outline-none focus:border-[#fb6514] dark:border-dark-3"
                    />
                </div>
                <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-dark dark:text-white">Data Limite (Entrega)</label>
                    <Flatpickr
                        options={{ locale: Portuguese, dateFormat: "d/m/Y", allowInput: true }}
                        placeholder="dd/mm/aaaa"
                        className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 outline-none focus:border-[#fb6514] dark:border-dark-3"
                    />
                </div>
            </div>

            <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-dark dark:text-white">Detalhes do Produto (Ex: Tema Alfabeto Safari)</label>
                <textarea rows={4} placeholder="Descreva os detalhes, bordados e especificações..." className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 outline-none focus:border-[#fb6514] dark:border-dark-3"></textarea>
            </div>

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/3">
                <label className="mb-3 block text-sm font-medium text-dark dark:text-white">Valor Total</label>
                <input type="text" placeholder="R$ 00,00" className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 outline-none focus:border-[#fb6514] dark:border-dark-3" />
                </div>
                <div className="w-full sm:w-1/3">
                <label className="mb-3 block text-sm font-medium text-dark dark:text-white">Valor Entrada</label>
                <input type="text" placeholder="R$ 00,00" className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 outline-none focus:border-[#fb6514] dark:border-dark-3" />
                </div>
                <div className="w-full sm:w-1/3">
                <label className="mb-3 block text-sm font-medium text-dark dark:text-white">Valor Restante</label>
                <input type="text" disabled className="w-full rounded-lg border border-stroke bg-gray-2 px-4.5 py-3 dark:bg-dark-3" placeholder="Automático" />
                </div>
            </div>

            <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-dark dark:text-white">Imagem de Referência</label>
                <div className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-xl border-2 border-dashed border-stroke bg-gray-2 px-4 py-4 dark:border-dark-3 dark:bg-gray-dark sm:py-7.5">
                    <input type="file" className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer opacity-0" />
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                        <Image src="/images/icons/upload.svg" alt="Upload" width={20} height={20} />
                        </span>
                        <p className="text-sm font-medium">Clique para carregar ou arraste a imagem</p>
                    </div>
                </div>
            </div>

            <button className="flex w-full justify-center rounded-lg bg-[#fb6514] p-3 font-medium text-white hover:bg-opacity-90">
                Finalizar Pedido
            </button>
            </form>
        </div>
        </div>
    );
};

export default CadastroPedido;