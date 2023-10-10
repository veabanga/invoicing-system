import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/message';
import Loader from '../components/loader';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';

const ProfileScreen = () => {

    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    return (
        <Row>
            <Col md={12}>
            <h2>My Orders</h2>
            {isLoading ? (
            <Loader />
            ) : error ? (
            <Message variant='danger'>
                {error?.data?.message || error.error}
            </Message>
            ) : (
            <>
            <Table striped hover responsive className='table-sm'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {!isLoading && orders.map((order) => (
                    <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                        <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                            Details
                        </Button>
                        </LinkContainer>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </>
            )}

            </Col>
        </Row>
    )
}

export default ProfileScreen
