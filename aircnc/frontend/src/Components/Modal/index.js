import React, { useEffect, useRef } from 'react'
import './style.css'

export default function Modal(props) {

    useEffect((e) => {
        console.log(e)
    }, [])

    function onClose(e) {
        props.onClose(e)
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
                    <button className='btn'>Confirmar</button>
                </div>
            </div>
        </section>
    )
}