import React from 'react';
import OrderList from './OrderList';
import SaleList from './SaleList';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

class Main extends React.Component{
    render(){
        if(this.props.show==='products'){
            return (
                <div id="products">
                    <h2>Add a Product</h2>
                    <ProductForm captureFile={this.props.captureFile} addProduct={this.props.addProduct}/>
                    <ProductList products={this.props.products} createOrder={this.props.createOrder} />
                </div>
            )
        }else if(this.props.show==='orders'){
            return (
                <div id="products">
                    <h2>My Orders</h2>
                    <OrderList products={this.props.products} orders={this.props.orders}/>
                </div>
            )
        }else if(this.props.show==='sales'){
            return (
                <div id="products">
                    <h2>My Sales</h2>
                    <SaleList products={this.props.myProducts} sales={this.props.sales}/>
                </div>
            )
        }
    }
}

export default Main;