import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';


function Events({products,search}) {

  const filterProducts = (products || []).filter((product) =>
    product.title.toLowerCase().includes((search || "").toLowerCase())
);
  
  
  return (
    <>
    <div>
      <Container className="mt-5">
        <h1 className="text-center mb-5">Our Services</h1>

        <Row>
          {filterProducts.map((product) => (
            <Col
              lg={4}
              md={6}
              sm={12}
              className="mb-4"
              key={product.id}
            >
              <Card
                className="shadom h-100 border-0"

              >
                <Card.Img
                  variant="top"
                  src={product.thumbnail}
                  height="250px"
                  style={{
                    objectFit: "cover"
                  }}
                />

                <Card.Body>
                  <Card.Title>{product.title }</Card.Title>

                 

                  <h5>${product.price}</h5>

                  <Link to={`/Event-Details/${product.id}`}>
                    <Button variant="dark">
                      View Service
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      </div>

    </>
  )
}
export default Events



