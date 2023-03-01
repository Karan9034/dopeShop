// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

contract DopeShop {
    // Default State
    string public name;
    uint128 public productCount=0;
    uint128 public ordersCount=0;
    mapping(uint => Product) public products;
    mapping(uint => Order) public orders;

    // Product Object
    struct Product{
        uint128 id;
        string name;
        string imgHash;
        uint price;
        address payable seller;
    }

    // Order Object
    struct Order{
        uint128 id;
        uint128 productId;
        address payable seller;
        address payable buyer;
    }

    // Constructor to check successful deployment
    constructor(){
        name = "dopeShop";
    }


    event ProductAdded(
        uint128 id,
        string name,
        string imgHash,
        uint price,
        address payable seller
    );
    event OrderCreated(
        uint128 id,
        uint128 productId,
        address payable seller,
        address payable buyer
    );

    // Function to append a new product to the state
    function addProduct(string memory _productName, string memory _imgHash, uint _price) public {
        require(bytes(_productName).length > 0);
        require(bytes(_imgHash).length > 0);
        require(_price > 0);
        require(msg.sender != address(0));

        productCount++;
        products[productCount] = Product(productCount, _productName, _imgHash, _price, payable(msg.sender));
        
        emit ProductAdded(productCount, _productName, _imgHash, _price, payable(msg.sender));
    }
    
    // Function to create a new order and append it to the state
    function createOrder(uint128 _productId) public payable{
        require(_productId > 0 && _productId <= productCount);
        require(msg.sender != address(0));

        Product memory _product = products[_productId];
        address payable _seller = _product.seller;
        require(msg.sender != _seller);
        _seller.transfer(msg.value);
        ordersCount++;
        orders[ordersCount] = Order(ordersCount, _productId, _seller, payable(msg.sender));

        emit OrderCreated(ordersCount, _productId, _seller, payable(msg.sender));
    }
}
