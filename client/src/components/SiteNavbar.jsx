import React from 'react';
import Identicon from 'identicon.js';
import { Container, Nav, Navbar } from "react-bootstrap";

class SiteNavbar extends React.Component {
    render(){
        return (
            <Navbar collapseOnSelect expand="md" variant="dark" bg='dark' fixed="top" className="site-navbar">
                <Container>
                    <Navbar.Brand onClick={()=>this.props.handleNav('products')}>dopeShop</Navbar.Brand>
                    <Nav justify>
                        <Nav.Link onClick={()=>this.props.handleNav('orders')}>
                            <small className='text-secondary'>Orders</small>
                        </Nav.Link>
                        <Nav.Link onClick={()=>this.props.handleNav('sales')}>
                            <small className='text-secondary'>Sales</small>
                        </Nav.Link>
                        <Nav.Item>
                            <small className='text-secondary'>
                                {this.props.account.slice(0, 5)+ '...' + this.props.account.slice(-4)}
                            </small>
                        </Nav.Item>
                        <Nav.Item className='img'>
                            { this.props.account
                                ? <img
                                    className='ml-2'
                                    width='40'
                                    height='40'
                                    src={`data:image/png;base64,${new Identicon(this.props.account, 40).toString()}`}
                                    alt="profile"
                                />
                                : <span></span>
                            }
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}


export default SiteNavbar