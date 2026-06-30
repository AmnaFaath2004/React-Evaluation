import { Button, Col, Container, Form, Image, InputGroup, Modal, Row, Table } from "react-bootstrap"
import { CiEdit } from "react-icons/ci"
import { MdDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { cartItemQuantityDecrement, cartItemQuantityIncrement, deleteCartItem } from "../Redux/productSlice"
import { toast } from "react-toastify"
import { useState } from "react"

const Cart = () => {
    const { cartItems } = useSelector((state) => state.productState)
    const [show, setShow] = useState(false);
    const [deleteCartIndex, setDeleteCartIndex] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = (cartId) => {
        setShow(true);
        setDeleteCartIndex(cartId)

    }
    const handleDeleteCart = () => {
        dispatch(deleteCartItem(deleteCartIndex))
        toast.success("Cart item deleted successfully")
        setShow(false);
        setDeleteCartIndex(null)
    }

    const totalPrice = cartItems?.reduce((total, item) => {
        total += item.quantity * item.price;
        return total
    }, 0)



    const dispatch = useDispatch()

    const handleItemDecreament = (productId) => {
        dispatch(cartItemQuantityDecrement(productId))
    }
    const handleItemIncreament = (productId) => {
        dispatch(cartItemQuantityIncrement(productId))
    }



    return (
        <Container>
            <Row>
                <Col>
                    <h4>Cart Items</h4>
                </Col>

            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product photo</th>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                {/* <th>Discription</th> */}
                                <th>Quantity</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>

                                    <td>
                                        <Image className="thump-img"
                                            src={item?.thumbnail}
                                            alt={item?.title}
                                            width={80}
                                        />
                                    </td>

                                    <td>{item?.title}</td>

                                    <td>{item?.price}</td>
                                    {/* <td>{item?.productDiscription} </td> */}

                                    <td >
                                        <InputGroup className="mb-3">
                                            <Button onClick={() =>
                                                handleItemDecreament(item.id)}
                                                variant="outline-danger" id="button-addon1"
                                                disabled={item.quantity < 2 ? true : false}>
                                                -
                                            </Button>
                                            <Form.Control
                                                aria-label="Example text with button addon"
                                                aria-describedby="basic-addon1"
                                                value={item.quantity}
                                                readOnly
                                                style={{
                                                    flex: "none",
                                                    width: "50px"
                                                }}
                                            />
                                            <Button onClick={() =>
                                                 handleItemIncreament(item.id)} 
                                                 variant="outline-success" 
                                                 id="button-addon1">
                                                +
                                            </Button>
                                        </InputGroup>

                                    </td>

                                    <td>
                                        <Button onClick={() => handleShow(item.id)}>
                                            <MdDelete size={25} />
                                        </Button></td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={6} className="text-end">
                                    <h4>Total Price: ${totalPrice}</h4>
                                </td>
                            </tr>


                        </tbody>
                    </Table>
                </Col>

            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Cart?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo,are you sure want to delete this Cartitem !</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteCart}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>


        </Container >
    )
}
export default Cart