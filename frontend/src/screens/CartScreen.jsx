import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import { Col, Row, ListGroup, Image, Form, Button, Card } from "react-bootstrap"
import Message from '../components/message'
import { AddToCart, RemoveFromCart, ClearCart} from '../slices/cartSlice'
import { FaTrash } from 'react-icons/fa'

const CartScreen = () => {
    const { cartItems } = useSelector((state)=> state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const AddToCartHandler = async (product, qty) => {
        dispatch(AddToCart({ ...product, qty }));
    };

    const removeFromCartHandler = async (id) => {
        dispatch(RemoveFromCart(id));
    }

    const clearCartHandler = async() => {
      dispatch(ClearCart());
    }

    const checkoutHandler = () => {
      // navigate('/login?redirect=/placeorder');
      navigate('/placeorder')
    };

    const goBack = () => {
      navigate(-1);
    }

  return (
    <>
    <button onClick={goBack} className='btn btn-light mb-4'>
        Go Back
    </button>
    <Row>
        <Col md={8}>
            <h1 className="mb-4">Your Cart</h1>
            {cartItems.length === 0 
            ? (
                <Message>
                    Your cart is empty <Link to="/">Go Back</Link>
                </Message>
            ) 
            : (
                <ListGroup variant="flush">
                    {cartItems.map((item) => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                    {item.name}
                                </Col>
                                <Col md={2}>₹{item.price}</Col>
                                <Col md={2}>
                                    <Form.Control as="select" value={item.qty} onChange={(e) => AddToCartHandler(item, Number(e.target.value))}>
                                        {[...Array(5).keys()].map((x) => (
                                            <option key={x+1} value={x+1}>
                                                {x+1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(item._id)}>
                                        <FaTrash/>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>

        <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ₹
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
            <Row>
              <Col>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </Col>
              <Col>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={clearCartHandler}
                >
                  Clear Cart
                </Button>
              </Col>
            </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    </>
  )
}

export default CartScreen
