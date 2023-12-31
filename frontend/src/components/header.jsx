import React from 'react'
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import logo from '../assets/logo.png'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { ResetCart } from '../slices/cartSlice'

const Header = () => {
    const { cartItems } = useSelector((state) => (state.cart));
    const { userInfo } = useSelector((state) => (state.auth));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutCall] = useLogoutMutation();

    const logoutHandler = async() => {
        try{
            await logoutCall().unwrap();
            dispatch(logout());
            dispatch(ResetCart());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
            <Container>

                <LinkContainer to='/'>
                    <Navbar.Brand> 
                    <img src={logo} alt='go-home'/>
                    Shop 
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>

                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <FaShoppingCart/> Cart

                                {
                                    cartItems.length > 0 && (
                                        <Badge pill style={{marginLeft: '5px'}}>
                                            { cartItems.reduce((a,c) => a + c.qty , 0) }
                                        </Badge>
                                    )
                                }
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo 
                        ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>My Orders</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <FaUser/> Sign In
                                </Nav.Link>
                            </LinkContainer>
                        )}
                        
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
