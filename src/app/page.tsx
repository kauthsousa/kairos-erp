"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, HTMLMotionProps } from "framer-motion"; 
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";

// 1. Tipando as animações corretamente para evitar o erro de 'initial' e 'variants'
const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer: HTMLMotionProps<"div"> = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true },
    variants: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    }
    };

    export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white overflow-x-hidden">
        
        {/* HEADER - Tipado como header para aceitar props de animação */}
        <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50"
        >
            <Image width={150} height={45} src="/images/logo/logo.png" alt="Kairós Logo" priority />
            <div className="flex gap-4">
            <Link href="/signin"><Button variant="outline" size="sm">Entrar</Button></Link>
            <Link href="/signup">
                <Button size="sm" className="bg-[#fb6514] border-none text-white">Cadastre-se</Button>
            </Link>
            </div>
        </motion.header>

        {/* HERO SECTION */}
        <section className="py-24 px-6 text-center max-w-5xl mx-auto">
            {/* O spread operator transfere as props tipadas corretamente */}
            <motion.div {...fadeInUp}>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
                Gerencie seu ateliê com a <br />
                <span className="text-[#fb6514] inline-block mt-2">precisão do Kairós</span>
            </h1>
            <Link href="/signup">
                <Button size="md" className="bg-[#fb6514] px-10 py-7 text-lg rounded-xl text-white border-none mt-10">
                Começar Agora
                </Button>
            </Link>
            </motion.div>
        </section>

        {/* PLANOS */}
        <section id="planos" className="py-24 bg-gray-50 dark:bg-gray-800/30">
            <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeInUp} className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Planos</h2>
                <div className="w-20 h-1.5 bg-[#fb6514] mx-auto rounded-full"></div>
            </motion.div>

            <motion.div {...staggerContainer} className="grid md:grid-cols-3 gap-8">
                {[
                { title: "Iniciante", price: "Grátis" },
                { title: "Ateliê Pro", price: "R$ 49,90", highlight: true },
                { title: "Escala", price: "R$ 99,90" }
                ].map((plano, idx) => (
                <motion.div 
                    key={idx}
                    {...fadeInUp}
                    className={`bg-white dark:bg-gray-900 p-8 rounded-2xl border ${plano.highlight ? 'border-2 border-[#fb6514]' : 'border-gray-200'}`}
                >
                    <h3 className="text-xl font-bold mb-2">{plano.title}</h3>
                    <p className="text-[#fb6514] text-3xl font-bold mb-6">{plano.price}</p>
                    <Button className="w-full" variant={plano.highlight ? "primary" : "outline"}>Escolher</Button>
                </motion.div>
                ))}
            </motion.div>
            </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="py-24 px-6 max-w-3xl mx-auto">
            <motion.div {...fadeInUp} className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-100">
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input placeholder="Nome" required />
                <Input type="email" placeholder="E-mail" required />
                </div>
                <textarea className="w-full min-h-[150px] p-4 rounded-xl border border-gray-200 bg-transparent outline-none focus:border-[#fb6514]" placeholder="Mensagem" />
                <Button type="submit" className="w-full bg-[#fb6514] text-white py-5 border-none">Enviar</Button>
            </form>
            </motion.div>
        </section>
        </div>
    );
}