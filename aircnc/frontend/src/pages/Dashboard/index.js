import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import './style.css'
import DeleteModal from '../../Components/DeleteModal/index'

export default function Dashboard({ history }) {

    const [spots, setSpots] = useState([])
    const [showDel, setShowDel] = useState(false)
    const [spotId, setSpotId] = useState('')

    async function spotsRequest() {
        let spotss = await api.get('/dashboard', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        setSpots(spotss.data)
    }

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            history.push({
                pathname: '/',
                state: { situation: "Você precisa estar logado para ver o dashboard." }
            })
        }
        spotsRequest()
    }, [])

    function openDeleteModal(spot_id){
        setShowDel(!showDel)
        setSpotId(spot_id)
    }

    return (
        
        <section id="dashboard">    
            <DeleteModal show={showDel} onClose={openDeleteModal} spotId={spotId} refreshSpots={spotsRequest}></DeleteModal>
            {spots.length ? <ul> {spots.map(spot => (
                <li key={spot._id}>
                    
                    <header style={{ background: `url(${spot.thumbnail_url}) no-repeat`, backgroundSize : 'cover' }} />
                    <div><strong>{spot.company}</strong> - <span>{spot.technologies.join(', ')}</span></div>
                    <span>{spot.value ? `R$${spot.value}/dia` : 'Gratuito'}</span>
                    <i className="material-icons edit" onClick={e => {
                        history.push({
                            pathname : '/dashboard/update',
                            state : {
                                spot
                            }
                        })
                    }}>
                        settings
                    </i>
                    <i className="material-icons delete" onClick={e => openDeleteModal(spot._id)}>
                        delete
                    </i>
                </li>
            ))} </ul> : <p>Você ainda não cadastrou nenhum Spot. Dê o primeiro passo <strong>cadastre</strong> um agora, basta clicar no botão abaixo.</p>}


            <button className="btn" onClick={() => history.push('/dashboard/create')}>Cadastre um novo Spot</button>
        </section>
    )
}