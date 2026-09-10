import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Usuario as UsuarioType } from "../types/UserTypes";

export function Usuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState<UsuarioType | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarUsuario() {
      try {
        const data = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
        );
        if (!data.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const usuario: UsuarioType = await data.json();
        setUsuario(usuario);
      } catch (err) {
        if (err instanceof Error) {
          setErro(err.message);
        }
      } finally {
        setCarregando(false);
      }
    }
    buscarUsuario();
  }, [id]);

  if (carregando) {
    return <p>Carregando usuário...</p>;
  }

  if (erro || !usuario) {
    return (
      <div>
        <p>Não foi possível carregar o usuário.</p>
        <Link to="/usuarios">Voltar para a lista</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{usuario.name}</h1>
      <p>Usuário: {usuario.username}</p>
      <p>E-mail: {usuario.email}</p>
      <p>Telefone: {usuario.phone}</p>
      <p>Site: {usuario.website}</p>
      <p>
        Endereço: {usuario.address.street}, {usuario.address.suite} -{" "}
        {usuario.address.city} ({usuario.address.zipcode})
      </p>
      <p>Empresa: {usuario.company.name}</p>

      <Link to="/usuarios">Voltar para a lista</Link>
    </div>
  );
}
