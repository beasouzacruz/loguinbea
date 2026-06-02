'use client';

import { useState, useCallback } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';

export function useProdutos() {

  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [url, setUrl] = useState('');

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const listarProdutos = useCallback(async () => {

    setLoading(true);

    try {

      const resposta = await api.get('/produtos');

      setProdutos(resposta.data);

    } catch (error) {

      alert('Erro ao buscar produtos');

    } finally {

      setLoading(false);

    }

  }, []);

  const buscarProdutoPorId = async (id: number) => {

    try {

      const resposta = await api.get(`/produtos/${id}`);

      prepararEdicao(resposta.data);

    } catch (error) {

      alert('Erro ao buscar produto');

      router.push('/dashboard');

    }

  };

  async function salvar(evento: React.FormEvent) {

    evento.preventDefault();

    const dadosProduto = {
      nome,
      descricao,
      preco: Number(preco),
      url
    };

    try {

      if (editandoId) {

        await api.put(
          `/produtos/${editandoId}`,
          dadosProduto
        );

        alert('Produto atualizado!');

      } else {

        await api.post(
          '/produtos',
          dadosProduto
        );

        alert('Produto cadastrado!');

      }

      limparFormulario();

      router.push('/dashboard');

    } catch (error) {

      alert('Erro ao salvar produto');

    }

  }

  async function excluir(id: number) {

    try {

      await api.delete(`/produtos/${id}`);

      listarProdutos();

    } catch (error) {

      alert('Erro ao excluir produto');

    }

  }

  function prepararEdicao(produto: any) {

    setEditandoId(produto.id);

    setNome(produto.nome);
    setDescricao(produto.descricao);
    setPreco(produto.preco.toString());
    setUrl(produto.url);

  }

  function limparFormulario() {

    setEditandoId(null);

    setNome('');
    setDescricao('');
    setPreco('');
    setUrl('');

  }

  return {

    produtos,
    loading,

    nome,
    setNome,

    descricao,
    setDescricao,

    preco,
    setPreco,

    url,
    setUrl,

    editandoId,

    listarProdutos,
    salvar,
    excluir,

    prepararEdicao,
    limparFormulario,

    buscarProdutoPorId

  };

}