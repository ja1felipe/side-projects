import React, { useEffect, useState } from 'react'
import api from '../../services/api'

export default function Dashboard({ history }){

    const [spots, setSpots] = useState([])

    useEffect(() => {
        if(!sessionStorage.getItem('token')){
            history.push({
                pathname: '/',
                state: { situation : "Você precisa estar logado para ver o dashboard."}
            })
        }
        async function spotsRequest(){
            let spotss = await api.get('/dashboard',{
                headers : {
                    'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            setSpots(spotss.data)
        }
        spotsRequest()
    }, [])

    return (
    <>
        <ul>
            {spots.map(spot => (
                <li key={spot._id}>
                    <header style={{background: `url(${spot.thumbnail_url})`}}/>
                    <div><strong>{spot.company}</strong> <span>{spot.technologies.join(', ')}</span></div>
                    <span>{spot.value ? `R$${spot.value}/dia` : 'Gratuito'}</span>
                </li>
            ))}
        </ul>
    </>
    )
}