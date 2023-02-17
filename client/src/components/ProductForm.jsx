import React from "react";
import { Button, Form } from "react-bootstrap";

class ProductForm extends React.Component{
    render(){
        return (
            <Form onSubmit={(event) => {
                event.preventDefault();
                let name = this.productName.value;
                let price = this.productPrice.value;
                this.props.addProduct(name, price);
            }}>
                <Form.Group className="mb-3" controlId="productFormFile">
                    <Form.Control type="file" accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="productFormName">
                    <Form.Control type="text" ref={(input) => { this.productName = input }} placeholder="Enter Name of the Product" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="productFormPrice">
                    <Form.Control type="number" ref={(input) => { this.productPrice = input }} placeholder="Enter Price in ETH" required/>
                </Form.Group>
                <Button style={{width: "100%"}} variant="primary" type="submit">
                    Upload!
                </Button>
            </Form>
        )
    }
}

export default ProductForm