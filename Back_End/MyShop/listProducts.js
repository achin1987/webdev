var fake = require("faker");

// List 10 product name and their prices in the fake store
for (var i = 0; i<10; i++){
	fakeProductName = fake.commerce.productName();
	fakePrice = fake.commerce.price();
	console.log("Product name:" + fakeProductName + "- Price: $" +fakePrice);
}
