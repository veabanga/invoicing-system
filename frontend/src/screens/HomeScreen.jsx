import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/loader'
import Message from '../components/message'

const HomeScreen = () => {

  const { data: products, isLoading, error} = useGetProductsQuery();

  return (
    <>
    {isLoading ? (
      <><Loader/></>
    ) : error ? (
      <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : (
      <>
      <h2 className='centered'> <strong> PRODUCTS / SERVICES </strong></h2>
      <Row>
          {products.map((product)=>(
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product}/>
              </Col>
          ))}
      </Row>
      </>
    )}
    </>
  )
}

export default HomeScreen;
