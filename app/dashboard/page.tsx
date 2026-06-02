'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import Navbar from "../components/navbar";
import { useProdutos } from "../hooks/useProduto";

export default function Dashboard() {

    const router = useRouter();

    const [nomeUsuario, setNomeUsuario] = useState("");

    const {
        produtos,
        loading,
        listarProdutos,
        excluir,
        prepararEdicao
    } = useProdutos();

    useEffect(() => {

        const userName = Cookies.get("userName");

        if (userName) {

            setNomeUsuario(userName);

        } else {

            router.push("/");

        }

    }, [router]);

    useEffect(() => {

        listarProdutos();

    }, [listarProdutos]);

    return (

        <div>

            <Navbar />

            <main style={{ padding: "40px" }}>

                <h1>
                    Seja bem-vindo, {nomeUsuario}!
                </h1>

                <h2 style={{ marginTop: "30px" }}>
                    Produtos Cadastrados
                </h2>

                {loading ? (

                    <p>Carregando...</p>

                ) : (

                    <table
                        style={{
                            width: "100%",
                            marginTop: "20px",
                            borderCollapse: "collapse"
                        }}
                    >

                        <thead>

                            <tr
                                style={{
                                    borderBottom: "2px solid #ccc"
                                }}
                            >

                                <th style={{ padding: "10px" }}>
                                    Nome
                                </th>

                                <th style={{ padding: "10px" }}>
                                    Descrição
                                </th>

                                <th style={{ padding: "10px" }}>
                                    Preço
                                </th>

                                <th style={{ padding: "10px" }}>
                                    Ações
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {produtos.map((produto: any) => (

                                <tr
                                    key={produto.id}
                                    style={{
                                        borderBottom: "1px solid #eee"
                                    }}
                                >

                                    <td style={{ padding: "10px" }}>
                                        {produto.nome}
                                    </td>

                                    <td style={{ padding: "10px" }}>
                                        {produto.descricao}
                                    </td>

                                    <td style={{ padding: "10px" }}>
                                        R$ {Number(produto.preco).toFixed(2)}
                                    </td>

                                    <td style={{ padding: "10px" }}>

                                        <button
                                            onClick={() => router.push(`/dashboard/produtos/${produto.id}`)}
                                            style={{
                                                background: "#2563eb",
                                                color: "white",
                                                border: "none",
                                                padding: "8px 12px",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                marginRight: "10px"
                                            }}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            onClick={() => excluir(produto.id)}
                                            style={{
                                                background: "red",
                                                color: "white",
                                                border: "none",
                                                padding: "8px 12px",
                                                borderRadius: "6px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Excluir
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </main>

        </div>
    );
}