'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import api from "../lib/api";

export function useLogin() {

    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function login(evento: React.FormEvent) {

        evento.preventDefault();

       const dadosLogin = {
        username,
        password
    };

        console.log(dadosLogin);

        try {

            const resposta = await api.post(
                "/users/auth",
                dadosLogin
            );

            Cookies.set("logged", "true");

            Cookies.set(
                "userName",
                resposta.data.name
            );

            alert("Login realizado com sucesso!");

            router.push("/dashboard");

        } catch (error: any) {

    console.log(error.response);

    alert("Erro no login!");

    }

    }

    return {

        username,
        setUsername,

        password,
        setPassword,

        login

    };
}