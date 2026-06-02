'use client';

import { useEffect } from 'react';
import { useProdutos } from '../hooks/useProduto';

export default function ProdutosForm({
  produtoId
}: {
  produtoId?: number
}) {

  const {

    salvar,
    buscarProdutoPorId,

    nome,
    setNome,

    descricao,
    setDescricao,

    preco,
    setPreco,

    url,
    setUrl,

    editandoId,
    limparFormulario

  } = useProdutos();

  useEffect(() => {

    if (produtoId) {

      buscarProdutoPorId(produtoId);

    }

  }, [produtoId]);

  return (

    <div className="login-container">

      <div className="login-card">

        <h1>
          {editandoId ? 'Editar Produto' : 'Novo Produto'}
        </h1>

        <form onSubmit={salvar}>

          <div className="input-group">
            <input
              type="text"
              placeholder="Nome"
              className="input-field"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Descrição"
              className="input-field"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="number"
              placeholder="Preço"
              className="input-field"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="URL da imagem"
              className="input-field"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-login"
          >
            {editandoId ? 'Atualizar' : 'Cadastrar'}
          </button>

          {editandoId && (

            <button
              type="button"
              onClick={limparFormulario}
            >
              Cancelar edição
            </button>

          )}

        </form>

      </div>

    </div>

  );

}