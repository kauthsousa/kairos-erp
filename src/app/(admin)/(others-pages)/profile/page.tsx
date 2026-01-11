"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    cnpj: "",
    profile_photo: "",
    pais: "Brasil",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    cep: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.name || "",
        sobrenome: user.lastName || "", 
        email: user.email || "",
        telefone: user.telefone || "",
        cnpj: user.cnpj || "",
        // Se não tiver foto no banco, usa a default de public/images/user.png
        profile_photo: user.profile_photo || "/images/user.png",
        pais: user.pais || "Brasil",
        estado: user.estado || "",
        cidade: user.cidade || "",
        bairro: user.bairro || "",
        rua: user.rua || "",
        numero: user.numero || "",
        cep: user.cep || "",
      });
    }
  }, [user]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profile_photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Aqui você enviará o formData (incluindo a string da foto) para sua API
    console.log("Dados para salvar:", formData);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    // Reduzido p-4 md:p-6 para p-2 md:p-4 para diminuir o recuo externo
    <div className="mx-auto max-w-screen-2xl p-2 md:p-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* HEADER COM FOTO DEFAULT */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center pb-6 border-b border-gray-100 dark:border-gray-800">
            <div className="relative w-28 h-28 overflow-hidden border border-gray-200 rounded-full group mx-auto lg:mx-0">
              <Image
                src={formData.profile_photo || "/images/user.png"}
                alt="Perfil"
                fill
                className="object-cover"
                priority
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-white text-[10px] font-bold text-center p-2">
                TROCAR FOTO
                <input type="file" className="hidden" onChange={handlePhotoChange} accept="image/*" />
              </label>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {formData.nome} {formData.sobrenome}
              </h3>
              <p className="text-sm text-gray-500">Gestor do Sistema</p>
            </div>
          </div>

          {/* GRID DE INFORMAÇÕES PESSOAIS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome</Label>
              <Input value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
            </div>
            <div>
              <Label>Sobrenome</Label>
              <Input value={formData.sobrenome} onChange={(e) => setFormData({...formData, sobrenome: e.target.value})} />
            </div>
            <div>
              <Label>E-mail</Label>
              <Input value={formData.email} disabled className="bg-gray-50 opacity-70" />
            </div>
            <div>
              <Label>Telefone</Label>
              <Input value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} placeholder="(00) 00000-0000" />
            </div>
            <div className="md:col-span-2">
              <Label>CNPJ</Label>
              <Input value={formData.cnpj} onChange={(e) => setFormData({...formData, cnpj: e.target.value})} placeholder="00.000.000/0001-00" />
            </div>
          </div>

          {/* GRID DE ENDEREÇO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-6 dark:border-gray-800">
            <div className="md:col-span-2">
              <Label>Rua</Label>
              <Input value={formData.rua} onChange={(e) => setFormData({...formData, rua: e.target.value})} />
            </div>
            <div>
              <Label>Número</Label>
              <Input value={formData.numero} onChange={(e) => setFormData({...formData, numero: e.target.value})} />
            </div>
            <div>
              <Label>Bairro</Label>
              <Input value={formData.bairro} onChange={(e) => setFormData({...formData, bairro: e.target.value})} />
            </div>
            <div>
              <Label>CEP</Label>
              <Input value={formData.cep} onChange={(e) => setFormData({...formData, cep: e.target.value})} />
            </div>
            <div>
              <Label>Cidade</Label>
              <Input value={formData.cidade} onChange={(e) => setFormData({...formData, cidade: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Perfil"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}