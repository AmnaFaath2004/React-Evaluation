import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userLogin } from '../Redux/useSlice';

function Login() {
    const { Formik } = formik;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { users } = useSelector((state) => state.userState)

    console.log("users----------->", users);


    const schema = yup.object().shape({
        email: yup.string().email("please enter a valid email").required("enter email"),
        password: yup.string().required("password please"),
    });

    const handleLogin = (values) => {

        const user = users.find((u) => u.email === values.email)
        if (!user) {
            toast.error("User is not found!")
            return;
        }

        if (user.password !== values.password) {
            toast.error("Wrong Passwored!")
            return
        }

        if(!user.status){
            toast.error("User has innacted by Admin!")
            return

        }
        dispatch(userLogin(user));
        toast.success("User Logged Successfully!")
        navigate("/")

        console.log("values----->", values);

    }

    return (
        <Container className='min-vh-100 min- d-flex justify-content-center align-items-center'>
            <Row className='justify-content-center'>
                <Col md={4} className="w-100">
                    <Row>
                        <Col>
                            <h4>User login</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                            <Formik
                                validationSchema={schema}
                                onSubmit={handleLogin}
                                initialValues={{
                                    email: '',
                                    password: '',

                                }}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
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
                                            <Button type="submit">Login</Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                        </Col>
                    </Row>
                    <Row>
                        <Col className='mt-3 text-center'>
                            if you don't have an account ,<Link to={"/register"}>Register Now</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;