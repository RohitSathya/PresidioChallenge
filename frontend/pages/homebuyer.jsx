import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
export default function homebuyer() {
    const [properties, setProperties] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(0);
    useEffect(() => {
        async function fetchpro(){
            try {
            
                const res = await axios.get('http://localhost:8080/property/sellerproperties');
                const { message, data } = res.data;
                if (message === 'failed') {
                  setFetchStatus(0);
                } else {
                  setFetchStatus(1);
                  setProperties(data);
                }
              } catch (error) {
                console.error('Failed to fetch properties:', error);
              }

        }
       
      }, []);
    
      const fetchProperties = async () => {
       
      };
  return (
   <>
    <Row>
        {fetchStatus === 0 ? (
          <p>No properties found.</p>
        ) : (
          properties.map((property) => (
            <Col key={property._id} md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{property.title}</Card.Title>
                  <Card.Text>
                    <strong>Place:</strong> {property.place}<br />
                    <strong>Area:</strong> {property.area}<br />
                    <strong>Bedrooms:</strong> {property.bedrooms}<br />
                    <strong>Bathrooms:</strong> {property.bathrooms}<br />
                    <strong>Hospitals Nearby:</strong> {property.hospitalsNearby}<br />
                    <strong>Colleges Nearby:</strong> {property.collegesNearby}
                  </Card.Text>
                 <Button>Like Property</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
   </>
  )
}
