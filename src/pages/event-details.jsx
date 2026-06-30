import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { addCartItem } from "../Redux/productSlice";
import { toast } from "react-toastify";

function EventDetails({products}) {

    
    const { id } = useParams()
    console.log("id---------->", id);
    console.log("products---------->", products);


    const dispatch = useDispatch()
    
    const singleProduct = products.find(
        (ev) => ev.id === Number(id)
    );
    console.log("singleProduct------>", singleProduct);


    

    const handAddCart = () => {
        // setCart(cart + 1)
        if(!singleProduct) return;
        dispatch(addCartItem(singleProduct))
        toast.success(`${singleProduct.title} added to Cart!`)
    }


    return (
        <>
            <Container className="mt-5">
                <Card className="shadow p-4 border-0">
                    {singleProduct ? (<Row>
                        <Col md={5}>
                            <Card.Img
                                src={singleProduct?.thumbnail ?? null}
                                style={{
                                    height: "400px",   
                                    objectFit: "cover"
                                }}
                            />
                        </Col>

                        <Col md={7}>
                            <Card.Body>
                                <h2>{singleProduct?.title ?? ""}</h2>
                                <h5>{singleProduct?.description ?? ""}</h5>
                                <p><strong>Brand:</strong>{singleProduct.brand}</p>
                                <p><strong>Catagery:</strong>{singleProduct.category}</p>
                                <p><strong>Rating:</strong>{singleProduct.rating}</p>
                                <p><strong>Stock:</strong>{singleProduct.stock}</p>
                                <h3>${singleProduct?.price ?? ""}</h3>
                                <Button
                                    variant="dark"
                                    onClick={() => handAddCart()}
                                >
                                    Add to Cart
                                </Button>
                            </Card.Body></Col>
                    </Row>) : (
                        <Row>
                            <Col className="text-center">
                                <h4>
                                    Product not found</h4></Col>
                        </Row>
                    )}


                </Card>
            </Container>
        </>
    )
}
export default EventDetails