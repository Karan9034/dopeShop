import React from "react";
import DopeShop from './contracts/DopeShop.json';
import Web3 from 'web3';
import Navbar from './components/SiteNavbar';
import Main from './components/Main';
import { Container } from "react-bootstrap";
import { create } from "ipfs-http-client";


const auth = 'Basic ' + Buffer.from(process.env.REACT_APP_INFURA_API_KEY + ':' + process.env.REACT_APP_INFURA_API_SECRET).toString('base64');
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
});

class App extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dopeShop: null,
      products: [],
      orders: [],
      sales: [],
      myProducts: [],
      loading: true,
      show: 'products'
    }
    this.handleNav = this.handleNav.bind(this)
    this.captureFile = this.captureFile.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.createOrder = this.createOrder.bind(this);
  }


  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = DopeShop.networks[networkId]
    if(networkData) {
      const dopeshop = new web3.eth.Contract(DopeShop.abi, networkData.address)
      this.setState({ dopeshop })
      const productCount = await dopeshop.methods.productCount().call()

      for(let i = productCount; i > 0; i--) {
        var product = await dopeshop.methods.products(i).call()
        if(product.seller===this.state.account){
          this.setState({
            myProducts: [...this.state.myProducts, product]
          })
        }else{
          this.setState({
            products: [...this.state.products, product]
          })
        }
      }

      const ordersCount = await dopeshop.methods.ordersCount().call()
      for(let i = ordersCount; i > 0; i--) {
        var order = await dopeshop.methods.orders(i).call()
        product = await dopeshop.methods.products(order.productId).call()
        order = {...order, imgHash: product.imgHash, name: product.name, price: product.price}
        if(order.seller===this.state.account){
          this.setState({
            sales: [...this.state.sales, order]
          })
        }else if(order.buyer===this.state.account){
          this.setState({
            orders: [...this.state.orders, order]
          })
        }
      }


      this.setState({ loading: false })
      console.log(this.state.products, this.state.orders, this.state.sales)
    } else {
      window.alert('dopeShop contract not deployed to detected network.')
    }
  }

  handleNav(show){
    console.log(show)
    this.setState({ show })
  }

  captureFile(event){
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('uploading', this.state.buffer)
    }
  }

  addProduct(name, price){
    this.setState({loading: true})
    ipfs.add(this.state.buffer).then((res, err) => {
        console.log(err, res)
        if(err){
          console.error(err)
          return
        }
        this.state.dopeshop.methods.addProduct(name, res.path, price).send({from: this.state.account}).on('transactionHash', async (hash) => {
          this.setState({loading: false})
          console.log(name, price)
        })
    })
  }

  createOrder(productId, price){
    this.setState({loading: true})
    this.state.dopeshop.methods.createOrder(productId).send({from: this.state.account, value: Web3.utils.toWei(price, 'Ether') }).on('transactionHash', (hash) => {
      this.setState({loading: false})
      console.log('ordered')
    })
  }

  render(){
    return (
      <div id="App">
        <Navbar account={this.state.account} handleNav={this.handleNav} />
        <div className="main">
          { this.state.loading
            ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            : <Container>
                <Main
                  show={this.state.show}
                  products={this.state.products}
                  myProducts={this.state.myProducts}
                  orders={this.state.orders}
                  sales={this.state.sales}
                  captureFile={this.captureFile}
                  addProduct={this.addProduct}
                  createOrder={this.createOrder}
                />
              </Container>
          }
        </div>
      </div>
    );
  }
}

export default App;
