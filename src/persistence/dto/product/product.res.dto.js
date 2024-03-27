export default class ProductResDTO {
    constructor(product) {
        this.Title = product.title,
            this.Precio = product.price,
            this.Stock = product.stock
    };
};