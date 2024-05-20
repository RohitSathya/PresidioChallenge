import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Home = () => {
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [hospitalsNearby, setHospitalsNearby] = useState('');
  const [collegesNearby, setCollegesNearby] = useState('');
  const [uploading, setUploading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPropertyId, setCurrentPropertyId] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(0);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
        const ud=localStorage.getItem('UserDetail')
        const parse=JSON.parse(ud)
      const res = await axios.get(`https://presidio-challengeback-cx3st15ph-rohits-projects-a5c6d24a.vercel.app/property/properties/${parse._id}`);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const ud = localStorage.getItem('UserDetail');
    const parse = JSON.parse(ud);

    try {
      if (isEditing && currentPropertyId) {
        // Update existing property
        await axios.put(`https://presidio-challengeback-cx3st15ph-rohits-projects-a5c6d24a.vercel.app/property/properties/${currentPropertyId}`, {
          title,
          place,
          area,
          bedrooms,
          bathrooms,
          hospitalsNearby,
          collegesNearby,
          sellerId: parse._id
        });
      } else {
        // Create new property
        await axios.post('https://presidio-challengeback-cx3st15ph-rohits-projects-a5c6d24a.vercel.app/property/properties', {
          title,
          place,
          area,
          bedrooms,
          bathrooms,
          hospitalsNearby,
          collegesNearby,
          sellerId: parse._id
        });
      }

      setUploading(false);
      resetForm();
      fetchProperties();
    } catch (error) {
      console.error('Failed to submit property:', error);
      setUploading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setPlace('');
    setArea('');
    setBedrooms('');
    setBathrooms('');
    setHospitalsNearby('');
    setCollegesNearby('');
    setIsEditing(false);
    setCurrentPropertyId(null);
  };

  const handleEdit = (id) => {
    const property = properties.find(p => p._id === id);
    setTitle(property.title);
    setPlace(property.place);
    setArea(property.area);
    setBedrooms(property.bedrooms);
    setBathrooms(property.bathrooms);
    setHospitalsNearby(property.hospitalsNearby);
    setCollegesNearby(property.collegesNearby);
    setIsEditing(true);
    setCurrentPropertyId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://presidio-challengeback-cx3st15ph-rohits-projects-a5c6d24a.vercel.app/property/properties/${id}`);
      fetchProperties();
    } catch (error) {
      console.error('Failed to delete property:', error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row>
          <Col>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formPlace">
              <Form.Label>Place</Form.Label>
              <Form.Control
                type="text"
                name="place"
                placeholder="Place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formArea">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                name="area"
                placeholder="Area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formBedrooms">
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control
                type="text"
                name="bedrooms"
                placeholder="Bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formBathrooms">
              <Form.Label>Bathrooms</Form.Label>
              <Form.Control
                type="text"
                name="bathrooms"
                placeholder="Bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formHospitalsNearby">
              <Form.Label>Hospitals Nearby</Form.Label>
              <Form.Control
                type="text"
                name="hospitalsNearby"
                placeholder="Hospitals Nearby"
                value={hospitalsNearby}
                onChange={(e) => setHospitalsNearby(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCollegesNearby">
              <Form.Label>Colleges Nearby</Form.Label>
              <Form.Control
                type="text"
                name="collegesNearby"
                placeholder="Colleges Nearby"
                value={collegesNearby}
                onChange={(e) => setCollegesNearby(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
         Submit
        </Button>
        {isEditing && <Button variant="secondary" onClick={resetForm} className="ml-2">Cancel</Button>}
      </Form>
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
                  <Button variant="warning" onClick={() => handleEdit(property._id)} className="mr-2">
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(property._id)}>
                    <FaTrash />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Home;
