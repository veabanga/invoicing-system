import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/loader';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login , {isLoading}] = useLoginMutation();

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({...res}));
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    
  return (
   <Container>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
                <h2>Sign In</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email' className='my-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password' className='my-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3' disabled={isLoading}>
                        Sign In
                    </Button>
                    {isLoading && <Loader/>}
                </Form>
                <Row>
            <Col>
                New user? <Link to = '/register'> Register </Link>
            </Col>
            </Row>
            </Col>
        </Row>   
   </Container>
  )
}

export default LoginScreen
