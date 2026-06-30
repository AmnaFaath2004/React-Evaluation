import { Button, Col, Container, Image, Row, Table } from "react-bootstrap"
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import "./ListProducts.css"
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import { deleteProduct } from "../Redux/productSlice";
import { toast } from "react-toastify";


function ListProducts() {
  const [show, setShow] = useState(false);
  const { products } = useSelector((state) => state.productState)


  const handleClose = () => setShow(false);

  const [deleteProductIndex, setDeleteProductIndex] = useState(null)
  const handleShow = (productId) => {
    setShow(true);
    setDeleteProductIndex(productId)
  }

  const dispatch = useDispatch()
  const handleProductDelete = () => {
    dispatch(deleteProduct(deleteProductIndex))
    toast.success("Product Deleted")
    setShow(false);
    setDeleteProductIndex(null)
  }

  console.log("Products----->", products);


  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col className="d-flex justify-content-between">
            <h4>List Products</h4>
            <Link className="btn btn-primary" to={"/admin/add-Product"}>Add Product</Link>
          </Col>

        </Row >
        <Row className="mt-3">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product photo</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Discription</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>

                    <td>
                      <Image className="thump-img"
                        src={product?.thumbnail}
                        alt={product?.title}
                        width={80}
                      />
                    </td>

                    <td>{product?.title}</td>

                    <td>{product?.price}</td>
                    <td>{product?.description} </td>

                    <td >
                      <Link to={`/admin/edit-product/${product.id}`}>
                        <CiEdit size={25} />
                      </Link>
                    </td>

                    <td>
                      <Button onClick={() => handleShow(product.id)}>
                        <MdDelete size={25} />
                      </Button></td>
                  </tr>
                ))}


              </tbody>
            </Table>
          </Col>
        </Row>


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Item?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure!, you want to delete the product?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleProductDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}
export default ListProducts