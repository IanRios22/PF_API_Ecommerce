import MongoDao from "../mongo.dao.js";
import { ProductModel } from "./product.model.js";

export default class ProductMongoDao extends MongoDao {
    constructor() {
        super(ProductModel);
    };

    async create(productData) {
        try {
            const newProd = await ProductModel.create(productData);
            return newProd;
        } catch (error) {
            throw new Error(error.message);
        }
    };
};