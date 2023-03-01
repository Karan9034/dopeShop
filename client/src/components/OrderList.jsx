import React from "react"
import { Card } from "react-bootstrap"

class OrderList extends React.Component{
    render(){
        return (
            <div id="orderList">
                {this.props.orders?.map((order, key) => (
                    <div key={key} className="mt-5 mb-5">
                        <Card>
                            <Card.Img variant="top" src={`${process.env.REACT_APP_INFURA_DEDICATED_GATEWAY}/ipfs/${order.imgHash}`} />
                            <Card.Text as="div">
                                <div>
                                    <p className="productName">{order.name}</p>
                                    <p className="productPrice">Price: {order.price} ETH</p>
                                    <p className="productBuyer">Seller: {order.seller}</p>
                                </div>
                            </Card.Text>
                        </Card>
                    </div>
                ))}
            </div>
        )
    }
}

export default OrderList