import React, { useState, useMemo } from 'react'

import './../style.css'
import api from '../../../services/api'

import camera from './../../../assets/camera.svg'

export default function SpotCreate({ history }) {
    const [company, setCompany] = useState()
    const [tech, setTech] = useState()
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    async function handleNew(event) {
        event.preventDefault()
        let data = new FormData()

        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('value', price)
        data.append('technologies', tech)
        let response = await api.post('/spots', data, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })

        response.status === 200 ? history.push({
            pathname : '/dashboard',
            state: { situation : "Novo spot criado com sucesso." }
        }) : console.log('[DEBUG] new spot error', response.statusText)

    }

    return (
        <section id='new'>
            <form onSubmit={handleNew}>
                <label
                    htmlFor='thumb'
                    id='thumbnail'
                    style={{ backgroundImage: `url(${preview})` }}
                    className={thumbnail ? 'hasThumb' : ''}
                >
                    <input
                        id='thumb'
                        type='file'
                        onChange={(event => setThumbnail(event.target.files[0]))}
                    >

                    </input>

                    <img src={camera} alt='Selecione uma imagem'/>

                </label>
                <label htmlFor='company'>Empresa</label>
                <input id='company' type='text' placeholder='Nome da sua empresa' onChange={(e) => setCompany(e.target.value)} value={company}></input>

                <label htmlFor='techs'>Tecnologias</label>
                <input id='techs' type='text' placeholder='Tecnologias da sua empresa(separadas por virgula)' onChange={(e) => setTech(e.target.value)} value={tech}></input>

                <label htmlFor='price'>Preço</label>
                <input id='price' type='text' placeholder='Coloque aqui o preço por dia do aluguel' onChange={(e) => setPrice(e.target.value)} value={price}></input>

                <button className="btn" type="submit">Criar</button>
                <button className="btn" type="button" onClick={() => history.push({ pathname : '/dashboard' })}>Cancelar</button>
            </form>
        </section>
    )
}