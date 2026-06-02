'use client';

import Link from "next/link";
import "./navbar.css";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const router = useRouter();

  function logout() {

    Cookies.remove("logged");
    Cookies.remove("userName");

    router.push("/");
  }

  return (
    <nav className="navbar">

      <h1 className="logo">MyApp</h1>

      <div className="nav-links">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/dashboard/produtos">
          Produtos
        </Link>

        <Link href="/dashboard/estoque">Estoque</Link>

        <button onClick={logout} className="btn-logout">
          Sair
        </button>

      </div>

    </nav>
  );
}