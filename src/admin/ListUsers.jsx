import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { changeUserRole, changeUserStatus, DeleteUser } from "../Redux/useSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";

const ListUsers = () => {
    const { users } = useSelector((state) => state.userState);

    
    const [show, setShow] = useState(false);
    
    const [deleteUserIndex, setDeleteUserIndex] = useState(null)
    const handleShow = (usersId) => {
        setShow(true)
        setDeleteUserIndex(usersId)
    }
    const handleClose = () => setShow(false);
    const dispatch = useDispatch()
    const handleUserDelete = () => {
        dispatch(DeleteUser(deleteUserIndex))
        toast.success("User Deleted")
        setShow(false);
        setDeleteUserIndex(null)
    }
    const handleUserRoleChange = (payload) => {  //payload :a Parameter to recieve (id: user.id, role: event.target.value ) from handleUserRoleChange
        dispatch(changeUserRole(payload));
        toast.success("User role updated")
    }

    const handleUserStateChange =(userId)=>{  //userId :a Parameter to recieve user.id from handleUserStateChange
        dispatch(changeUserStatus(userId))
          toast.success("User status updated")
    }
    return (
        <Container className="mt-3">
            <Row>
                <Col>

                    <h4>List of Users</h4>
                </Col>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>index</th>
                                    <th>Users Name</th>
                                    <th> Email</th>
                                    <th>Status</th>
                                    <th>Role</th>
                                    <th>Edit</th>
                                    <th>Delete</th>


                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{user?.fullname ?? user.fullName}</td>
                                        <td>{user?.email ?? ""} </td>

                                        <td> <Form.Check // prettier-ignore
                                            type="switch"
                                            id="custom-switch"
                                            label={user.status ? "Active" : "Inactive"}
                                            onChange={()=>handleUserStateChange(user?.id)}
                                            defaultChecked={user.status}
                                        />
                                        </td>
                                        <td>
                                            <Form.Select onChange={(event) =>
                                                 handleUserRoleChange({ id: user.id, role: event.target.value })}
                                                  defaultValue={user?.role} 
                                                  aria-label="Default select example" 
                                                  style={{ height: "53px", }}>

                                                <option value="admin">Admin</option>
                                                <option value="user">user</option>
                                                <option value="seller">Seller</option>
                                            </Form.Select>
                                        </td>
                                        <td >
                                            <Link to={`/admin/edit-user/${user.id}`}>
                                                <CiEdit size={25} />
                                            </Link>
                                        </td>



                                        <td>
                                            <Button onClick={() => handleShow(user.id)}>
                                                <MdDelete size={25} />
                                            </Button>
                                        </td>

                                    </tr>
                                ))}


                            </tbody>
                        </Table>
                    </Col>

                </Row>






            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Item?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure!, you want to delete the User?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUserDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )
}
export default ListUsers