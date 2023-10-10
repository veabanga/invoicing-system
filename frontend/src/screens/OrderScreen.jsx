import { useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Message from '../components/message';
import Loader from '../components/loader';
import {
  useGetOrderDetailsQuery
} from '../slices/ordersApiSlice';
import { calculateItemTax } from '../utils.js/cartUtils';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck} from '@fortawesome/free-regular-svg-icons';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  const {
    data: order,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const goBack = () => {
		navigate(-1);
	}

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
    <button onClick={goBack} className='btn btn-light mb-4'>
        Go Back
    </button>
    <div>
      <div className='centered icon-edit'><FontAwesomeIcon icon={faCircleCheck} className='text-green' /></div>
      <h1 className='text-green marBot-rm centered'> We Have Recieved Your Order</h1>
      <h5 className='font-adjust centered'>Order No {order._id}</h5>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                        </Col>
                        <Col>
                          Tax: ₹{calculateItemTax(item.category, item.price, item.qty)}
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
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row style={{fontWeight:'700'}}>
                  <Col>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
};

export default OrderScreen;
