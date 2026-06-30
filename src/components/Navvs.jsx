import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsBagHeart } from 'react-icons/bs';
import "./Navvs.css"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Form, InputGroup, NavDropdown } from 'react-bootstrap';
import { userLogout } from '../Redux/useSlice';



function Naavs({ search, setSearch }) {

  const { cartItems } = useSelector((state) => state.productState);

  const dispatch = useDispatch()

  const { isAuthenticated, user } = useSelector(
    (state) => state.userState
  );
  console.log("isAuthenticated------->", isAuthenticated, user?.fullname
  );

  const handleLogout = () => {
    toast.success("user Logged out")
    dispatch(userLogout())
  }

  return (
    <>
      <Navbar expand="lg" data-bs-theme="dark" style={{ background: "#1f2937" }}>
        <Container>
          <Navbar.Brand href="#home">RoyalCart</Navbar.Brand>
          <form className='d-flex mx-auto' style={{ width: "300px" }}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </form>



          <Nav className="ms-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>

            <Nav.Link as={Link} to='/events'>Products</Nav.Link>
            {!isAuthenticated && (
              <Nav.Link as={Link} to='/login'>Login</Nav.Link>
            )}

            <Nav.Link as={Link} to='/cart' className="position-relative">Booking  <BsBagHeart size={22} />
              <span className='booking'>
                {cartItems.length}
              </span>


            </Nav.Link>

            {isAuthenticated && (<NavDropdown title={<FaRegUser />} id="basic-nav-dropdown">

              <NavDropdown.Item as={Link} to={"/admin/list-products"}>
                List Product
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to={'/admin/list-users'}>
                List Users
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} >
                <Link to={'/'}>
                  Logout
                </Link>
              </NavDropdown.Item>
            </NavDropdown>)}



          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
export default Naavs