import React from 'react';
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
                <div>orders</div>
            )
        }else{
            return (
                <div>sales</div>
            )
        }
    }
}

export default Main;