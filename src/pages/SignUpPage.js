import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [confirmaSenha, setConfirmaSenha] = useState();
  const [body, setBody] = useState({ name: "", email: "", password: ""});
  console.log(body)

  function Cadastrar(e){
    e.preventDefault();

    if(body.password !== confirmaSenha){
      return alert("Senha incorreta!");
    }
    const url = "http://localhost:5000/cadastro";
    const promise = axios.post(url, body);
    promise.then(() => {
      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    })
    promise.catch((err) => {
      alert(err.response.data);
    })
  }

  return (
    <SingUpContainer>
      <form onSubmit={(e) => Cadastrar(e)}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          value= {body.nome}
          onChange={(e) => setBody({...body, name: e.target.value})}
          required
        />
        <input
          placeholder="E-mail"
          type="email"
          value= {body.email}
          onChange={(e) => setBody({...body, email: e.target.value})}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          value= {body.senha}
          onChange={(e) => setBody({...body, password: e.target.value})}
          autocomplete="new-password"
          required />
        <input
          placeholder="Confirme a senha"
          type="password"
          value= {confirmaSenha}
          onChange={(e) => setConfirmaSenha(e.target.value)}
          autocomplete="new-password"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
