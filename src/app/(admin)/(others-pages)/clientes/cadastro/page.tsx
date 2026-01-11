import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb";

const CadastroCliente = () => {
    return (
        <div className="mx-auto max-w-270">
            <PageBreadcrumb
                pageTitle="Novo Cliente" 
                customLinks={[
                    { name: "Clientes", route: "/clientes" }
                ]}
            />

            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
                <form className="p-7">
                {/* Primeira Linha: Nome e CPF */}
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Nome Completo</label>
                    <input type="text" placeholder="João da Silva" className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" />
                    </div>
                    <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">CPF</label>
                    <input type="text" placeholder="000.000.000-00" className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" />
                    </div>
                </div>

                {/* Segunda Linha: Telefone e Data de Nascimento */}
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Telefone / WhatsApp</label>
                    <input type="text" placeholder="(00) 00000-0000" className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" />
                    </div>
                    <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Data de Nascimento</label>
                    <input type="date" className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" />
                    </div>
                </div>

                {/* Terceira Linha: Endereço */}
                <div className="mb-5.5">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Endereço Completo</label>
                    <textarea rows={3} placeholder="Rua, número, bairro, cidade..." className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3"></textarea>
                </div>

                <div className="flex justify-end gap-4.5">
                    <button type="button" className="flex justify-center rounded-lg border border-stroke px-6 py-2 font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white">
                    Cancelar
                    </button>
                    <button type="submit" className="flex justify-center rounded-lg bg-[#fb6514] px-6 py-2 font-medium text-white hover:bg-opacity-90">
                    Salvar Cliente
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default CadastroCliente;