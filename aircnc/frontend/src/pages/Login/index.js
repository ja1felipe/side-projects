import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import './index.css'



export default function Login(props) {

    let { situation } = props.history.location.state ? props.history.location.state : ''

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [warning, setWarning] = useState('')
    const [register, setRegister] = useState('')

    useEffect(() => {
        if(situation){
            setRegister(situation)
        }
        props.history.replace()
    }, []);

    async function handleSessionLogin(event) {
        event.preventDefault()

        api.post('/login', {
            email,
            password
        }).then((res) => {
            sessionStorage.setItem('token', res.data.token)
            props.history.push('/dashboard')
        }).catch(err => {
            console.log("Error: ", err.response)
            setWarning('Email ou senha incorretos.')
        })


    }

    return (
        <section id="login">
            <p className="title">
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>
            <form onSubmit={handleSessionLogin}>
                <p className='registerFlag'>{register}</p>
                <label htmlFor="email">E-MAIL*</label>
                <input type="email" id="email" placeholder="digite seu email" onChange={event => setEmail(event.target.value)} value={email}></input>

                <label htmlFor="password">PASSWORD*</label>
                <input type="password" id="password" placeholder="digite sua senha" onChange={event => setPassword(event.target.value)} value={password}></input>
                <p className="warning">{warning}</p>

                <button className="btn" type="submit">Entrar</button>
                <button className="btn" type="button" onClick={() => props.history.push('/register')}>Casdastro</button>

            </form>
        </section>
    )
}