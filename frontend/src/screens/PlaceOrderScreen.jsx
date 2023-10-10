import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Row, Col, Button, Card, Image, ListGroup } from 'react-bootstrap';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { ClearCart } from '../slices/cartSlice';
import { calculateItemTax } from '../utils.js/cartUtils';
import { toast } from 'react-toastify';
import Message from '../components/message';
import Loader from '../components/loader';


const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    let res = {}
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    const placeOrderHandler = async() => {
        try {
            res = await createOrder({
              orderItems: cart.cartItems,
              itemsPrice: cart.itemsPrice,
              taxPrice: cart.taxPrice,
              totalPrice: cart.totalPrice,
            }).unwrap()

            dispatch(ClearCart());
            toast.success('Your Order Has Been Placed')
            navigate(`/order/${res._id}`)
        } catch (err) {
            toast.error(err);
        }
    }

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
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                            {item.name}
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹{(item.qty * item.price)}
                        </Col>
                        <Col md={2}>
                          Tax: ₹{calculateItemTax(item.category, item.price, item.qty).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>

              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Taxes</Col>
                  <Col>₹{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                    <Row style={{fontWeight:'700'}}>
                    <Col >Total</Col>
                    <Col>₹{cart.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>
              
                {(error) && 
                <ListGroup.Item>
                <Message variant='danger'>{error?.data?.message}</Message>
                </ListGroup.Item>}
              
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {(isLoading)&& <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
