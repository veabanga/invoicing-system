import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/loader';

const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register , {isLoading}] = useRegisterMutation();
    const { userInfo } = useSelector( (state) => state.auth);

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const res = await register({ name, email, password }).unwrap();
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
                <h2>Register</h2>
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name' className='my-3'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

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
                Already have an account? <Link to = '/login'> Sign In </Link>
            </Col>
            </Row>
            </Col>
        </Row>   
   </Container>
  )
}

export default RegisterScreen
