import React, { useState } from 'react'
import './style.css'

export default function New({ history }){
    const [company, setCompany] = useState('')
    const [tech, setTech] = useState('')
    const [price, setPrice] = useState('')
    return (
    <section id='new'>
        <form>
            <label htmlFor='company'>Empresa</label>
            <input id='company' type='text' placeholder='Nome da sua empresa' onChange={(e) => setCompany(e.target.value)} value={company}></input>

            <label htmlFor='techs'>Tecnologías</label>
            <input id='techs' type='text' placeholder='Tecnologías da sua empresa(separadas por virgula)' onChange={(e) => setTech(e.target.value)} value={tech}></input>

            <label htmlFor='price'>Preço</label>
            <input id='price' type='text' placeholder='Coloque aqui o preço por dia do aluguel' onChange={(e) => setPrice(e.target.value)} value={price}></input>

            <label htmlFor='thumb'>Thumbnail</label>
            <input id='thumb' type='file' placeholder='Thumbnail para o dashboard'></input>
        </form>
    </section>
    )
}