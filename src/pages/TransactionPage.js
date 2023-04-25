import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useParams} from 'react-router-dom';

export default function TransactionsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [novaTransacao, setNovaTransacao] = useState({value: "", description: ""})
  console.log(params)

  useEffect(() => {
    if (!localStorage.getItem("token")){
      navigate("/");
    }
  }, []);

  function enviar (e){
    e.preventDefault();

    if(!novaTransacao) return alert("Preencha os campos abaixo")

    const url = `${process.env.REACT_APP_API}/nova-transacao/${params.tipo}`;
    const promise = axios.post(url, novaTransacao, { headers: {"Authorization": localStorage.getItem("token") } });
    promise.then(() => {
      alert("Transação realizada com sucesso!");
      navigate("/home");
    })
    promise.catch((err) => {
      alert(err.response.data);
    })
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={(e) => enviar(e)}>
        <input 
        placeholder="Valor" 
        type="text"
        value={novaTransacao.value}
        onChange={(e) => setNovaTransacao({...novaTransacao, value: e.target.value})}
        />
        <input 
        placeholder="Descrição" 
        type="text" 
        value={novaTransacao.description}
        onChange={(e) => setNovaTransacao({...novaTransacao, description: e.target.value})}
        />
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
