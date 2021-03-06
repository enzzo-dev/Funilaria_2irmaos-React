import Navbar from "../../components/Navbar";
import './dashboardClienteOrçamento.css';
import { useState} from "react";
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';

import React from 'react'
import { parseJwt } from "../../services/auth";
import { Helmet } from 'react-helmet';

function DashboardClienteOrçamento() {
    
    const [show, setShow] = useState(false);
    const[listBudgets, setListBudgets] = useState([])
    const[totalValue, setTotalValue] = useState([])


    
    const[erroMensagem, setErroMensagem] = useState("")
    
    const variant = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark'
  ].map((variant, idx) => (
    <Alert key={idx} variant={variant}>
        {erroMensagem}
    </Alert>
  ))


    const[variantChoose, setVariantChoose] = useState("")   

    function getBudgets(){
        axios.get('http://localhost:5000/api/budget/mybudgets/' + parseJwt().jti, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then(response => {
            if(response.status === 200){
                setListBudgets(response.data)
            }
        })

        .catch(() => setErroMensagem("Você não possui véiculos cadastrados ou um erro de sistema ocorreu!") )
    }

    return (
        <div >

            <Helmet>
                <title>Dashboard - Cliente</title>
            </Helmet>

            <div className="icon_wpp">

                <a href="https://web.whatsapp.com/send?phone=5511977208248" target="_blank">

                <AiIcons.AiOutlineWhatsApp size={60} style={{ color: '#fff' }} />

                </a>
            </div>
            <Navbar />
            <div className="dashboard">
                <div className="dashboard_fonte">
                    <h2 className="titulo">PRÉ-ORÇAMENTOS </h2>
                    <p>* Pré-orçamentos gerados com base em problemas que a funilaria consiga resolver em veículos da mesma marca e modelo que o seu.</p>
                </div>
               
                <div className="card-orcamento" onClick={getBudgets}>
                    <h2 className="subtitulo">Serviços para seu carro </h2>
                    <div className="bar"></div>
                </div>

                {
            listBudgets.map((budgets) => {
              return(
                <div className="lista" key={budgets.idBudget}>
                <p><strong>Modelo:</strong> {budgets.model.nameModel}</p>
                <p><strong>Problema:</strong> {budgets.service.problem}</p>
                <p><strong>Valor estimado:</strong> R$ {budgets.totalValue}</p>
                <p><strong>Atribuir</strong> <input name="isGoing"
                                                   type="checkbox"
                                                   
                                                   onChange={() => setTotalValue([budgets.totalValue]) }
                                                    /></p>
              </div>
              )
            })
          }
                <Alert style={{margin : '0px 50px', width : 'auto', height : '80px', display : 'flex', flexDirection :  'column', alignItems : 'center', justifyContent : 'center'}} variant={variantChoose}>
                    <p style={{padding : '35px auto'}}>{erroMensagem}</p>
                </Alert>

         
            </div>
        </div>
    )
}

export default DashboardClienteOrçamento;
