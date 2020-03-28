import React, { useState, useMemo, useEffect } from 'react'

import './../style.css'
import api from '../../../services/api'

import camera from './../../../assets/camera.svg'

export default function SpotUpdate({ history }) {
    const [company, setCompany] = useState(history.location.state.spot.company)
    const [tech, setTech] = useState(history.location.state.spot.technologies.join(', '))
    const [price, setPrice] = useState(history.location.state.spot.value)
    const [thumbnail, setThumbnail] = useState(null)
    let preview = history.location.state.spot.thumbnail_url
    
    useEffect(() => {
        fetch(preview).then(res => res.blob())
        .then(blob => {
        setThumbnail(blob)
    })
    }, [])
    

    preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : preview
    }, [thumbnail])

    async function handleUpdate(event) {
        event.preventDefault()
        let data = new FormData()

        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('value', price)
        data.append('technologies', tech)
        data.append('spotId', history.location.state.spot._id)
        let response = await api.put('/spots', data, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })

        response.status === 200 ? history.push({
            pathname : '/dashboard',
            state: { situation : "Spot editado com criado com sucesso." }
        }) : console.log('[DEBUG] new spot error', response.data.message)

    }

    return (
        <section id='new'>
            <form onSubmit={handleUpdate}>
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

                <button className="btn" type="submit">Editar</button>
                <button className="btn" type="button" onClick={() => history.push({ pathname : '/dashboard' })}>Cancelar</button>
            </form>
        </section>
    )
}