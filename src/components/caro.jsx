import Carousel from 'react-bootstrap/Carousel';

import { object } from 'yup';
import event1 from '../assets/images/e.webp'
import event2 from '../assets/images/Cosmetic 1.jpeg'
import event3 from '../assets/images/event3.webp'
import { Container } from 'react-bootstrap';


function Caro() {

  const imgs = {
    objectFit: "cover",
    height: "500px",
    BorderRadius: "20px"

  }
  return (
    <>
      <Container className="mt-4 mb-4">
        <Carousel fade>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={event1} style={imgs} alt="" />
            <Carousel.Caption>
              <h3>Creating Unforgettable Events</h3>
              <p>From weddings to corporate gatherings, we turn your vision into a memorable experience.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={event2} style={imgs} alt="" />
            <Carousel.Caption>
              <h3>Perfect Planning, Flawless Execution</h3>
              <p>Our expert team handles every detail to ensure your event runs smoothly and successfully.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={event3} style={imgs} alt="" />
            <Carousel.Caption>
              <h3>Celebrate Every Special Moment</h3>
              <p>We bring creativity, elegance, and passion to make every occasion truly extraordinary.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  )
}
export default Caro