import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/product'
import { useGetProductsQuery, useGetServicesQuery } from '../slices/productsApiSlice'
import Loader from '../components/loader'
import Message from '../components/message'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const HomeScreen = () => {

  const { data: products, isLoading, error} = useGetProductsQuery();
  const { data: services, isload, err} = useGetServicesQuery();
  const [showProducts, setShowProducts] = useState(true);

  return (
    <>
    {(isLoading || isload) ? (
      <><Loader/></>
    ) : (error || err) ? (
      <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : (
      <>
      <ButtonGroup toggle className="mb-2 centered">
        <ToggleButton
          type="radio"
          name="radio"
          value="yes"
          checked={showProducts === true}
          onClick={() => setShowProducts(true)}
          variant="secondary"
          style={{color: 'white'}}
        >
          <strong>Products</strong>
        </ToggleButton>
        <ToggleButton
          type="radio"
          name="radio"
          value="no"checked={showProducts === false}
          onClick={() => setShowProducts(false)}
          variant="secondary"
          style={{color: 'white'}}
        >
          <strong>Services</strong>
        </ToggleButton>
      </ButtonGroup>

      {showProducts && <Row>
          {products.map((product)=>(
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product}/>
              </Col>
          ))}
      </Row>}

      {!showProducts && 
      <Row>
      {services.map((service)=>(
          <Col key={service._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={service}/>
          </Col>
      ))}
      </Row>
      }
      </>
    )}
    </>
  )
}

export default HomeScreen;
