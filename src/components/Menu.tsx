import { Link } from "react-router";

export function Menu() {
  return (
    <nav>
      <Link to="/">Início</Link> | <Link to="/usuarios">Usuários</Link>
    </nav>
  );
}
