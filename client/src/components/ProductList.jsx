import React from "react"
import { Button, Card } from "react-bootstrap"

class ProductList extends React.Component{
    render(){
        return (
            <div id="productList">
                {this.props.products.map((product, key) => (
                    <div key={key} className="mt-5 mb-5">
                        <Card>
                            <Card.Img variant="top" src={`${process.env.REACT_APP_INFURA_DEDICATED_GATEWAY}/ipfs/${product.imgHash}`} />
                            <Card.Text as="div">
                                <div>
                                    <p className="productName">{product.name}</p>
                                    <p className="productPrice">Price: {product.price} ETH</p>
                                </div>
                                <Button variant="primary" onClick={() => {this.props.createOrder(product.id, product.price)}}>Buy Now</Button>
                            </Card.Text>
                        </Card>
                    </div>
                ))}
            </div>
        )
    }
}

export default ProductList