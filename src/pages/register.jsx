import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uesrRegister } from '../Redux/useSlice';
import { toast } from 'react-toastify';

function Register() {
    const { Formik } = formik;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users } = useSelector((state) => state.userState) //to identify email already exists or not while registering
    console.log("Users---------->", users);


    const schema = yup.object().shape({
        fullname: yup.string().required("fullname please"),
        email: yup.string().email("please enter a valid email").required("Enter email"),
        password: yup.string().required("password please"),
    });

    const handleRegister = (values) => {
        values.id = Date.now();
        if (users.length === 0) {
            values.role = "admin";   // First user becomes admin
        } else {
            values.role = "user";
        }
        values.status = true;
        console.log("values----->", values);

        const user = users.find((u) => u.email === values.email) // checking email already exists or not while registering
        if (user) {
            toast.error("Email already existed!")
            return
        }

        dispatch(uesrRegister(values));
        toast.success("user registered sucessfully!")
        navigate("/login")

    }

    return (
        <Container className='min-vh-100 min- d-flex justify-content-center align-items-center'>
            <Row className='justify-content-center'>
                <Col md={4} className="w-100">
                    <Row>
                        <Col>
                            <h4>User Register</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                            <Formik
                                validationSchema={schema}
                                onSubmit={handleRegister}
                                initialValues={{
                                    fullname: '',
                                    email: '',
                                    password: '',

                                }}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="validationFormik01">
                                                <Form.Label>fullname</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="fullname"
                                                    value={values.fullname}
                                                    onChange={handleChange}
                                                    isValid={touched.fullname && !errors.fullname}
                                                    isInvalid={touched.fullname && !!errors.fullname}
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.fullname}
                                                    {/* only show when error occurs */}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="validationFormik01">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    isValid={touched.email && !errors.email}
                                                    isInvalid={touched.email && !!errors.email}
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.email}
                                                    {/* only show when error occurs */}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>
                                        <Row className='mb-4'>
                                            <Form.Group as={Col} controlId="validationFormik02">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    isValid={touched.password && !errors.password}
                                                    isInvalid={touched.password && !!errors.password}
                                                />

                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.password}
                                                    {/* only show when error occurs */}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>

                                        <div className='d-grid'>
                                            <Button type="submit">Register</Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;




