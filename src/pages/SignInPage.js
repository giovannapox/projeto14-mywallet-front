import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios";

export default function SignInPage() {
  const [usuario, setUsuario] = useState({email: "", password: ""});
  const navigate = useNavigate();

  function Logar(e){
    e.preventDefault();

    if(!usuario) return alert("Preencha os campos abaixo")

    const url = "http://localhost:5000/";
    const promise = axios.post(url, usuario);
    promise.then((res) => {
      alert("Login realizado com sucesso!");
      const token = `Bearer ${res.data.token}`;
      localStorage.setItem("token", token);
      localStorage.setItem("user", res.data.usuario)
      console.log(res.data)
      navigate("/home");
    })
    promise.catch((err) => {
      alert(err.response.data);
    })
  }

  return (
    <SingInContainer>
      <form onSubmit={(e) => Logar(e)}>
        <MyWalletLogo />
        <input 
        placeholder="E-mail" 
        type="email" 
        value={usuario.email}
        onChange={(e) => setUsuario({...usuario, email: e.target.value})}
        required
        />
        <input 
        placeholder="Senha" 
        type="password" 
        value={usuario.password}
        onChange={(e) => setUsuario({...usuario, password: e.target.value})}
        required
        autocomplete="new-password" 
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
