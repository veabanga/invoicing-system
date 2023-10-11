import React from 'react'
import { FaWindowClose } from 'react-icons/fa'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '20px',
  zIndex: 1000,
  maxWidth: '80vw',
  borderRadius: '20px'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(49,49,49,0.8)',
  zIndex: 1000
}

const btnModal = {
    position: 'absolute',
    top: '0',
    right: '0',
    background: 'transparent',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    outline: 'none',
    color: '#000',
    padding: '0 1rem',
    transition: 'color 0.3s ease',
    marginRight: '0.5rem'
}


export default function Modal({ open, children, onClose }) {
  if (!open) return null

  return(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose}/>
      <div style={MODAL_STYLES}>

        <div >
            <button style={btnModal} onClick={onClose}> <FaWindowClose fontWeight={200} color='#7b8a8b'/> </button>
        </div>

        {children}

      </div>
    </>
  )
}