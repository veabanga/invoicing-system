import { useState } from 'react'
import { Card } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import Modal from './Modal/Modal'
import '../assets/styles/index.css'


const Product = ({product}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => { setIsHovered(true); };
  const handleMouseLeave = () => { setIsHovered(false); };


  return (
    <>
    <div onClick={() => setIsOpen(true)} style={{cursor: 'pointer'}}>
    <Card 
    className='my-3 rounded overflow-hidden'
    >
      <Card.Img  
      
      className={`cards__item__link ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} 
      src={product.image} variant='top' />

      <Card.Body>
            <Card.Title as='div'>
                <strong>{product.name}</strong>
            </Card.Title>

        <Card.Text as='h3'>
            ₹{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <div style={{marginTop:'5%', display:'flex', flexDirection:'row', alignItems:'center'}}>

        <img src={product.image} style={{maxHeight:'250px',maxWidth:'250px',borderRadius: '20px'}} alt={product.name}/>

        <div style={{padding:'15px'}}>
          <strong>{product.name}</strong><br/><br/>
          {product.description}<br/><br/>
          <strong>₹{product.price}</strong>
        </div>

      </div>
      
    </Modal>
    </>
  )
}

export default Product
