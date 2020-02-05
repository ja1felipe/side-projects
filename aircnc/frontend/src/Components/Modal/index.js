import React, { useEffect, useRef } from 'react'
import './style.css'
import api from '../../services/api'

export default function Modal(props) {

    function onClose(e) {
        props.onClose(e)
    }

    function deleteSpot(e){
        api.delete(`/spots/${props.spotId}`, {
            headers : {
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(() => {
            onClose()
            props.refreshSpots(e)
        })
    }

    function useOutsideAlerter(ref) {
        
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose()
            }
        }
    
        useEffect(() => {
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        });
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    if (!props.show) {
        return null
    }
    return (
        <section id="modal" ref={wrapperRef}>
            <div>
                <p>Tem certeza que quer deletar esse <strong>Spot?</strong></p>
                <div>
                    <button onClick={() => onClose()} className='btn'>Cancelar</button>
                    <button className='btn' onClick={() => deleteSpot()}>Confirmar</button>
                </div>
            </div>
        </section>
    )
}