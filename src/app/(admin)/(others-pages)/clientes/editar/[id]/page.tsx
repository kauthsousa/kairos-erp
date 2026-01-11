"use client"; // Necessário para gerenciar estados e eventos de formulário

import React, { useState } from "react";
import PageBreadcrumb from "../../../../../../components/common/PageBreadCrumb";
import Link from "next/link";

const EditarCliente = () => {
    // Estado inicial com os dados do cliente para edição
    const [formData, setFormData] = useState({
        nome: "João da Silva",
        cpf: "000.000.000-00",
        telefone: "(00) 00000-0000",
        dataNascimento: "1990-01-01",
        endereco: "Rua Exemplo, 123, Bairro Centro, Cidade - UF"
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Dados atualizados:", formData);
        alert("Cliente atualizado com sucesso!");
    };

    return (
        <div className="mx-auto max-w-270">
            <PageBreadcrumb
                pageTitle="Editar Cliente" 
                customLinks={[
                    { name: "Clientes", route: "/clientes" }
                ]}
            />

            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
                <form className="p-7" onSubmit={handleSubmit}>
                    
                    {/* Primeira Linha: Nome e CPF */}
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                                Nome Completo
                            </label>
                            <input 
                                type="text" 
                                value={formData.nome}
                                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" 
                            />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                                CPF
                            </label>
                            <input 
                                type="text" 
                                value={formData.cpf}
                                onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                                className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" 
                            />
                        </div>
                    </div>

                    {/* Segunda Linha: Telefone e Data de Nascimento */}
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                                Telefone / WhatsApp
                            </label>
                            <input 
                                type="text" 
                                value={formData.telefone}
                                onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                                className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" 
                            />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                                Data de Nascimento
                            </label>
                            <input 
                                type="date" 
                                value={formData.dataNascimento}
                                onChange={(e) => setFormData({...formData, dataNascimento: e.target.value})}
                                className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" 
                            />
                        </div>
                    </div>

                    {/* Terceira Linha: Endereço */}
                    <div className="mb-5.5">
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Endereço Completo
                        </label>
                        <textarea 
                            rows={3} 
                            value={formData.endereco}
                            onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                            className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3"
                        ></textarea>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex justify-end gap-4.5">
                        <Link 
                            href="/clientes"
                            className="flex justify-center rounded-lg border border-stroke px-6 py-2 font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                        >
                            Cancelar
                        </Link>
                        <button 
                            type="submit" 
                            className="flex justify-center rounded-lg bg-[#fb6514] px-6 py-2 font-medium text-white hover:bg-opacity-90"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarCliente;