import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from 'axios'


export default function UserForm() {
    const [users, setUsers] = useState([])
    const [ediData, setEdiData] = useState(null)
    const [updating, setUpdating] = useState(false)
    const refName = useRef(null)
    const refEmail = useRef(null)

    useEffect(() => {
        axios.get('http://localhost:8001/api/users').then(function (response) {
            setUsers(response.data);
        }).catch(function (error) {
            console.log(error);
        });
        refName.current.focus()
    }, [])


    function submitForm(e) {
        e.preventDefault()
        console.log(refName);
        const formData = new FormData(e.currentTarget)
        const newUser = Object.fromEntries(formData)
        if (updating) {
            axios.put('http://localhost:8001/api/user/update/' + ediData.id, newUser).then(function (response) {
                const userIndex = users.findIndex(user => user.id == ediData.id)
                users[userIndex] = {
                    id: ediData.id,
                    ...newUser
                }
                setUsers(users)

                handleResetForm()
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            axios.post('http://localhost:8001/api/user/store', newUser).then(function (response) {
                setUsers([...users, {
                    id: users[users.length - 1].id + 1,
                    ...newUser
                }])

                handleResetForm()
            }).catch(function (error) {
                console.log(error);
            });
        }
        e.currentTarget.reset()
        refName.current.focus()
    }

    function handleResetForm(e) {
        setUpdating(false)
    }

    function handleDelete(id) {
        axios.delete('http://localhost:8001/api/user/delete/' + id).then(function (response) {
            setUsers(users.filter(user => user.id != id))
        }).catch(function (error) {
            console.log(error);
        });
    }

    function handleEdit(id) {
        const user = users.find(user => user.id == id)
        setEdiData(user)

        refName.current.value = user.name
        refEmail.current.value = user.email

        setUpdating(true)
    }
    return (
        <div className='container py-5'>
            <div className="col-12">
                <Form onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name='name' type="text" placeholder="Name" ref={refName} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' ref={refEmail} />
                    </Form.Group>
                    <Button variant={updating ? 'success' : "primary"} type="submit" style={{ width: "100%" }}>
                        {updating ? "Update" : "Submit"}
                    </Button>
                    <Button onClick={(e) => handleResetForm(e)} type="reset" className='mt-3' variant="warning" style={{ width: "100%" }}>
                        Reset Form
                    </Button>
                </Form>
            </div>
            <div className="col-12 mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            const { id, name, email } = user
                            return <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td className='text-center'>
                                    <Button variant="success" onClick={() => handleEdit(id)}>Edi</Button>
                                </td>
                                <td className='text-center'>
                                    <Button variant="danger" onClick={() => handleDelete(id)}>Del</Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>

        </div>
    )
}
