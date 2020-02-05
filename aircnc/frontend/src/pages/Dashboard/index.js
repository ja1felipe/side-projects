import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import './style.css'
import Modal from '../../Components/Modal/index'

export default function Dashboard({ history }) {

    const [spots, setSpots] = useState([])
    const [show, setShow] = useState(false)
    const [spotId, setSpotId] = useState('')

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            history.push({
                pathname: '/',
                state: { situation: "Você precisa estar logado para ver o dashboard." }
            })
        }
        async function spotsRequest() {
            let spotss = await api.get('/dashboard', {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            setSpots(spotss.data)
        }
        spotsRequest()
    }, [])

    function openModal(spot_id){
        setShow(!show)
        setSpotId(spot_id)
    }

    return (
        
        <section id="dashboard">    
            <Modal show={show} onClose={openModal} user_id={spotId}></Modal>
            {spots.length ? <ul> {spots.map(spot => (
                <li key={spot._id}>
                    
                    <header style={{ background: `url(${spot.thumbnail_url}) no-repeat`, backgroundSize : 'cover' }} />
                    <div><strong>{spot.company}</strong> - <span>{spot.technologies.join(', ')}</span></div>
                    <span>{spot.value ? `R$${spot.value}/dia` : 'Gratuito'}</span>
                    <i className="material-icons edit">
                        settings
                    </i>
                    <i className="material-icons delete" onClick={e => openModal(spot._id)}>
                        delete
                    </i>
                </li>
            ))} </ul> : <p>Você ainda não cadastrou nenhum Spot. Dê o primeiro passo <strong>cadastre</strong> um agora, basta clicar no botão abaixo.</p>}


            <button className="btn">Cadastre um novo Spot</button>
        </section>
    )
}