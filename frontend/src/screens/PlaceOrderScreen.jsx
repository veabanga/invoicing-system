import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom'
import { Row, Col, Button, Card, Image, ListGroup } from 'react-bootstrap';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { ClearCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import Message from '../components/message';
import Loader from '../components/loader';


const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
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

  return (
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
                          <Link to={`/product/${item._id}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
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
                    <Row style={{fontWeight:'700'}}>
                    <Col >Total</Col>
                    <Col>₹{cart.totalPrice}</Col>
                    </Row>
                    <Row>
                    <Col style={{fontSize:'0.8rem'}}>( Including ₹{cart.taxPrice} in taxes )</Col>
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
  )
}

export default PlaceOrderScreen
