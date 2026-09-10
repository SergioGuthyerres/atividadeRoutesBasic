import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Usuario } from "../types/UserTypes";

export function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function buscarUsuarios() {
      try {
        const data = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!data.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const usuarios: Usuario[] = await data.json();
        setUsuarios(usuarios);
      } catch (err) {
        if (err instanceof Error) {
          setErro(err.message);
        }
      } finally {
        setCarregando(false);
      }
    }
    buscarUsuarios();
  }, []);

  const filtrados = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(busca.toLowerCase()),
  );

  if (carregando) {
    return <p>Carregando usuários...</p>;
  }

  if (erro) {
    return <p>Não foi possível carregar os usuários: {erro}</p>;
  }

  return (
    <div>
      <h1>Lista de Usuários</h1>

      <input
        type="text"
        placeholder="Buscar pelo nome"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <ul>
        {filtrados.map((usuario) => (
          <li key={usuario.id}>
            <p>Nome: {usuario.name}</p>
            <p>E-mail: {usuario.email}</p>
            <p>Cidade: {usuario.address.city}</p>
            <Link to={`/usuarios/${usuario.id}`}>Ver detalhes</Link>
          </li>
        ))}
      </ul>

      {filtrados.length === 0 && <p>Nenhum usuário encontrado.</p>}
    </div>
  );
}
