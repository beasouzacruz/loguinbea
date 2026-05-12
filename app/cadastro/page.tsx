'use client';

import Link from 'next/link';
import '../formStyle.css';

import { useCadastro } from '../hooks/useCadastro';

export default function Cadastro() {

  const {
    name, setName,
    username, setUsername,
    password, setPassword,
    cadastrar
  } = useCadastro();

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>Cadastro de Usuário</h1>

        <form onSubmit={cadastrar}>

          <div className="input-group">
            <input
              type="text"
              placeholder="Digite seu Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Digite seu Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Digite sua Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Cadastrar
          </button>

        </form>

        <div className="footer-link">
          <span>Já possui conta? </span>

          <Link href="/">
            Faça login aqui
          </Link>

        </div>

      </div>
    </div>
  );
}