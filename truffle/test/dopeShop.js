const DopeShop = artifacts.require("DopeShop");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DopeShop', ([deployer, seller, buyer]) => {
    let dopeShop

    before(async () => {
        dopeShop = await DopeShop.deployed()
    })


    describe('deployment', async () => {
        it('deploys successfully', async () => {
          const address = await dopeShop.address
          assert.notEqual(address, 0x0)
          assert.notEqual(address, '')
          assert.notEqual(address, null)
          assert.notEqual(address, undefined)
        })
    
        it('has a name', async () => {
          const name = await dopeShop.name()
          assert.equal(name, 'dopeShop')
        })
    })

    describe('products', async () => {
        let result, productCount
        const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'
        const name = 'Redmi'

        before(async () => {
            result = await dopeShop.addProduct(name, hash, 1, { from: seller })
            productCount = await dopeShop.productCount()
        })

        it('adds product', async () => {
            assert.equal(productCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, name, 'name is correct')
            assert.equal(event.imgHash, hash, 'imgHash is correct')
            assert.equal(event.price, '1', 'price is correct')
            assert.equal(event.seller, seller, 'seller is correct')
      
      
            await dopeShop.addProduct('', hash, 1, { from: seller }).should.be.rejected;
            await dopeShop.addProduct(name, '', 1, { from: seller }).should.be.rejected;
            await dopeShop.addProduct(name, hash, 0, { from: seller }).should.be.rejected;
            await dopeShop.addProduct(name, hash, 1, { from: '0x0' }).should.be.rejected;
        })

        it('lists products', async () => {
            const product = await dopeShop.products(productCount)
            assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(product.name, name, 'name is correct')
            assert.equal(product.imgHash, hash, 'imgHash is correct')
            assert.equal(product.price, '1', 'price is correct')
            assert.equal(product.seller, seller, 'seller is correct')
        })
    })

    describe('orders', async () => {
        let result, ordersCount, productCount
        
        it('creates order', async () => {
            let oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)
            
            productCount = await dopeShop.productCount()
            const product = await dopeShop.products(productCount)
            result = await dopeShop.createOrder(productCount, { from: buyer, value: web3.utils.toWei(product.price, 'Ether') })
            ordersCount = await dopeShop.ordersCount()
            assert.equal(ordersCount, 1)
            
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), ordersCount, 'id is correct')
            assert.equal(event.productId.toNumber(), productCount, 'productId is correct')
            assert.equal(event.buyer, buyer, 'buyer is correct')

            let newSellerBalance = await web3.eth.getBalance(seller)
            newSellerBalance = new web3.utils.BN(newSellerBalance)
            let paidAmount = web3.utils.toWei(product.price, 'Ether')
            paidAmount = new web3.utils.BN(paidAmount)

            const expectedBalance = oldSellerBalance.add(paidAmount)
            assert.equal(newSellerBalance.toString(), expectedBalance.toString())

            await dopeShop.createOrder(0, { from: buyer }).should.be.rejected;
            await dopeShop.createOrder(10, { from: '0x0' }).should.be.rejected;
            await dopeShop.createOrder(1, { from: seller }).should.be.rejected;
        })

        it('lists orders', async () => {
            const order = await dopeShop.orders(ordersCount)
            assert.equal(order.id.toNumber(), ordersCount.toNumber(), 'id is correct')
            assert.equal(order.productId.toNumber(), productCount.toNumber(), 'productId is correct')
            assert.equal(order.buyer, buyer, 'buyer is correct')
        })
    })
});
