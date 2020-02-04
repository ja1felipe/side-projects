import React, { useState } from 'react'
import api from '../../services/api'
import './index.css'

export default function Register({ history }){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [warning, setWarning] = useState('')

    function handleSessionStore(event){
        event.preventDefault()
        if( email === '' || password === '' || passwordConfirm === ''){
            setWarning('Por favor preencha todos os dados.')
        }else if(password !== passwordConfirm){
            setWarning('As senhas precisão ser iguais.')
        }else{
            api.post('/register', {
                email,
                password
            }).then(() => {
                history.push({
                    pathname : '/',
                    state : { situation: 'Cadastro realizado com sucesso.' }
                })
            }).catch(err => {
                console.log('Erro no cadastro', err.response)
            })
        }
    }

    return (
    <section id="register">
        <p className="title">
            <strong>Cadastre-se</strong> e encontre <strong>talentos</strong> para sua empresa
        </p>
        <form onSubmit={handleSessionStore}>

            <label htmlFor="email">E-MAIL*</label>
            <input type="email" id="email" placeholder="digite seu email" onChange={event => setEmail(event.target.value)} value={email}></input>

            <label htmlFor="password">PASSWORD*</label>
            <input type="password" placeholder="digite sua senha" onChange={event => setPassword(event.target.value)} value={password}></input>
            <label htmlFor="password">CONFIRM PASSWORD*</label>
            <input type="password" id="password" placeholder="confirme sua senha" onChange={event => setPasswordConfirm(event.target.value)} value={passwordConfirm}></input>
            <p className="warning">{warning}</p>

            <button className="btn" type="submit">Confirmar</button>

        </form>
    </section>)
}