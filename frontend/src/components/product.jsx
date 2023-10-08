import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import Modal from './Modal/Modal'
import '../assets/styles/index.css'
import { AddToCart } from '../slices/cartSlice'


const Product = ({product}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => { setIsHovered(true); };
  const handleMouseLeave = () => { setIsHovered(false); };

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AddToCartHandler = () => {
    dispatch(AddToCart({ ...product, qty }));
    navigate('/cart');
  }

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
      src={product.image} variant='top' 
      />

      <Card.Body>
            <Card.Title as='div'>
                <strong>{product.name}</strong>
            </Card.Title>

        <Card.Text className='my-0' as='h4'>
            ₹{product.price}
        </Card.Text>
        <span>(exclusive of taxes)</span>
      </Card.Body>
    </Card>
    </div>
    
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <div style={{marginTop:'5%', display:'flex', flexDirection:'row', alignItems:'center'}}>

        <img src={product.image} style={{maxHeight:'250px',maxWidth:'250px',borderRadius: '20px'}} alt={product.name}/>

          <div className='modal-text'style={{padding:'15px'}}>
            <h5 className='my-0'><strong>{product.name}</strong></h5><br/>
            {product.description}<br/><br/>
            <h5 className='my-0'><strong>₹{product.price}</strong></h5>
            <span> (exclusive of taxes)</span>
            <Form.Control
              as='select'
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[...Array(5).keys()].map((x)=>(
                <option key={x+1} value={x+1}>
                  {x+1}
                </option>
              ))}
            </Form.Control>

            <Button 
              className='btn-block' 
              type='button' 
              variant='primary'
              onClick={AddToCartHandler}
            > 
            Add To Cart 
            </Button>

          </div>
          
      </div>
    </Modal>
    </>
  )
}

export default Product
