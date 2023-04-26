import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate();
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {

    if (!localStorage.getItem("token")){
      navigate("/");
    }

    const url = `${process.env.REACT_APP_API}/home`;
    const promise = axios.get(url, { headers: {"Authorization": localStorage.getItem("token") } })
    promise.then((res) => {
      setTransacoes(res.data);
    })
    promise.catch((err) => {
      return alert(err.response.data);
    })
  }, [])
  
  console.log(transacoes)
  
  function somaValores(){
    let total = 0;
    for(let i = 0; i < transacoes.length; i++){
      if(transacoes[i].type === "entrada"){
        total += Number(transacoes[i].value);
      } else {
        total -=  Number(transacoes[i].value);
      }
    }
    return total.toFixed(2);
  }

  function deslogar (){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {localStorage.getItem("user")}</h1>
        <BiExit onClick={deslogar}/>
      </Header>

      <TransactionsContainer>
        <ul>
        {(transacoes.length === 0) ?
        <p>Não há registros de <br />
        entrada ou saída</p>
          :
        transacoes.map((t) => <ListItemContainer>
          <div>
            <span>{t.date}</span>
            <strong>{t.description}</strong>
          </div>
          <Value color={(t.type === "saida") ? "negativo" : "positivo"}>{Number(t.value).toFixed(2)}</Value>
        </ListItemContainer>
        )
        }
        
        </ul>
        {(transacoes.length === 0) ?
        <p></p> :
        <article>
          <strong>Saldo</strong>
          <Value color={(somaValores() < 0) ? "negativo" : "positivo"}>{somaValores()}</Value>
        </article>
      }
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  p{
  color: #868686;
  text-align: center;
  font-size: 20px;
  margin-top: 60%;
  }
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  article {
    width: 76vw;
    background-color: #fff;
    z-index: 1;
    position: fixed;
    bottom: 155px;
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`