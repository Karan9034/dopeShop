import React from "react"
import { Card } from "react-bootstrap"

class SaleList extends React.Component{
    render(){
        return (
            <div id="salesList">
                {this.props.sales?.map((sale, key) => (
                        <div key={key} className="mt-5 mb-5">
                            <Card>
                                <Card.Img variant="top" src={`${process.env.REACT_APP_INFURA_DEDICATED_GATEWAY}/ipfs/${sale.imgHash}`} />
                                <Card.Text as="div">
                                    <div>
                                        <p className="productName">{sale.name}</p>
                                        <p className="productPrice">Price: {sale.price} ETH</p>
                                        <p className="productBuyer">Buyer: {sale.buyer}</p>
                                    </div>
                                </Card.Text>
                            </Card>
                        </div>
                ))}
            </div>
        )
    }
}

export default SaleList