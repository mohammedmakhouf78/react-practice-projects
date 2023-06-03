import React, { useEffect, useState } from 'react'
import { Container, ListGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { IncreaseItemCount } from './cartSlice'

export default function Cart() {
    const products = useSelector(state => state.cartSlice.products)
    const dispatch = useDispatch()

    const data = [
        {
            name: "samsung galaxy S8",
            price: 399.99,
            count: 1,
            img: "/cart/samsung.avif"
        },
        {
            name: "Google Pixel",
            price: 499.99,
            count: 1,
            img: "/cart/google_pixel.jpg"
        },
        {
            name: "Xiaomi Redmi Note 2",
            price: 699.99,
            count: 1,
            img: "/cart/xiamoi.jpeg"
        },
        {
            name: "Samsung Galaxy S7",
            price: 599.99,
            count: 1,
            img: "/cart/Samsung-Galaxy-S7.webp"
        },
    ]
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    // const [products, setProducts] = useState(data)

    // function IncreaseItemCount(index) {
    //     products[index].count++
    //     setProducts([...products])
    // }

    function decreaseItemCount(index) {
        if (products[index].count > 1) {
            products[index].count--
            setProducts([...products])
        }
    }

    function removeItem(index) {
        setProducts(products.filter((product, i) => i != index))
    }

    function clearCart() {
        setProducts([])
    }

    useEffect(() => {
        let totalCount = products.reduce((accumulator, product) => {
            return accumulator + product.count
        }, 0)
        setCartCount(totalCount)
        const sum = products.reduce((accumulator, product) => {
            return accumulator + parseFloat(product.price * product.count)
        }, 0)
        setCartTotal(parseFloat(sum).toFixed(2))
    }, [products])



    return (
        <div>
            <Navbar bg="primary" variant='dark' expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Redux</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">
                                Cart {cartCount}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className='mt-5'>
                <h2 className='text-center'>YOUR BAG</h2>

                <div style={{ width: "70%", margin: "2em auto" }}>
                    <ListGroup>
                        {products.map((product, index) => <ListGroup.Item key={index}>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex justify-content-left align-items-center">
                                    <div className="">
                                        <img src={product.img} alt="" style={{ width: 100, height: "100px", objectFit: "cover" }} />
                                    </div>
                                    <div className="">
                                        <p className='mb-0'>{product.name}</p>
                                        <p className='mt-0'>${product.price}</p>
                                        <p className="text-danger" style={{ cursor: "pointer" }} onClick={() => removeItem(index)}>remove</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-right align-items-center">
                                    <button className="btn btn-primary" onClick={() => dispatch(IncreaseItemCount(index))}>+</button>
                                    <div className='mx-3'>{product.count}</div>
                                    <button disabled={product.count <= 1} className="btn btn-primary" onClick={() => decreaseItemCount(index)}>-</button>
                                </div>
                            </div>
                        </ListGroup.Item>)}

                    </ListGroup>
                    <hr />
                    <div className='d-flex justify-content-between mt1' style={{ fontWeight: "bold" }}>
                        <span>Total</span>
                        <span>$ {cartTotal}</span>
                    </div>

                    <button className="btn btn-outline-danger w-100 mt-5" onClick={() => clearCart()}>CLEAR CART</button>
                </div>


            </div>
        </div>
    )
}
