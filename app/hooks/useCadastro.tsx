'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';

export function useCadastro() {

  const router = useRouter();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function cadastrar(evento: React.FormEvent) {

    evento.preventDefault();

    const dadosCadastro = {
      name: name,
      username: username,
      password: password
    };

    api.post('/users', dadosCadastro)

      .then(() => {
        alert('Usuário cadastrado com sucesso!');
        router.push('/');
      })

      .catch(() => {
        alert('Erro ao cadastrar usuário!');
      });
  }

  return {
    name, setName,
    username, setUsername,
    password, setPassword,
    cadastrar

  };
}