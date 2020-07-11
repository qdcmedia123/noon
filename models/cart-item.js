class CartItem {
    constructor(quantity, productPrice, productTitle, sum, imageUri, deliveryInfo, soldBy) {
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.sum = sum;
        this.imageUri = imageUri;
        this.deliveryInfo = deliveryInfo;
        this.soldBy = soldBy;

    }
}

export default CartItem;