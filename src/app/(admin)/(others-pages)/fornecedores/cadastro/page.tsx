import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb";

const CadastroFornecedor = () => {
    return (
        <div className="mx-auto max-w-270">
            {/* Breadcrumb com o link para voltar à lista de fornecedores */}
            <PageBreadcrumb 
                pageTitle="Novo Fornecedor" 
                customLinks={[{ name: "Fornecedores", route: "/fornecedores" }]} 
            />

            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
                <form className="p-7">
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Razão Social</label>
                            <input type="text" placeholder="Nome da Empresa" className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">CNPJ</label>
                            <input type="text" placeholder="00.000.000/0001-00" className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" />
                        </div>
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Telefone Contato</label>
                            <input type="text" placeholder="(00) 0000-0000" className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">E-mail</label>
                            <input type="email" placeholder="fornecedor@email.com" className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" />
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Endereço Comercial</label>
                        <textarea rows={3} placeholder="Logradouro, Bairro, Cidade..." className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3"></textarea>
                    </div>

                    <button className="flex w-full justify-center rounded-lg bg-[#fb6514] p-3 font-medium text-white hover:bg-opacity-90 transition-all">
                        Salvar Fornecedor
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CadastroFornecedor;