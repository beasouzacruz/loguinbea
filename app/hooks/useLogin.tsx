'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import Cookies from 'js-cookie';


export function useLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function entrar(evento: React.FormEvent) {
    evento.preventDefault(); 

    const dadosLogin = {
      username: username,
      password: password
    };

    api.post('/users/auth', dadosLogin)
      .then((resposta) => {
        Cookies.set('logged', 'true', { expires: 1 });
        Cookies.set('userName', resposta.data.name, { expires: 1 }); 

        router.push('/dashboard');
      })
      .catch(() => {
        alert('Erro: Usuário ou senha incorretos!');
      });
  }

  return {
    username, setUsername,
    password, setPassword,
    entrar
  };
}