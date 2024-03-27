import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";
import { generateProduct } from "../utils/utils.js";
import ProductRepository from "../persistence/repository/product/product.repository.js";

const productRepository = new ProductRepository()
const { productDao, userDao } = persistence;

export default class ProductService extends Services {
    constructor() {
        super(productDao);
    };

    async createMocksProducts(cant = 100) {
        try {
            const productsArray = [];
            for (let i = 0; i < cant; i++) {
                const product = generateProduct();
                productsArray.push(product);
            }
            const products = await productDao.create(productsArray);
            return (
                products
            )
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async createProduct(productData, ownerEmail) {
        try {
            productData.product_owner = ownerEmail;
            const newProduct = await productDao.create(productData);
            if (!newProduct) {
                return (
                    false
                )
            } else {
                return (
                    newProduct
                )
            };
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async deleteProduct(id) {
        try {
            let item = await this.dao.getById(id);
            const user = await userDao.getByEmail(item.product_owner);
            if (!item) return false;
            const itemDelete = await this.dao.delete(id);
            await sendMail(user, 'deleteProduct')
            return itemDelete;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getProductById(id) {
        try {
            const product = await productRepository.getProductById(id);
            if (!product) {
                return false;
            } else {
                return product;
            };
        } catch (error) {
            throw new Error(error.message);
        };
    };
};