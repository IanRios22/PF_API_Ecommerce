import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

const productService = new ProductService();
export default class ProductController extends Controllers {
    constructor() {
        super(productService);
    };

    createMocksProducts = async (req, res, next) => {
        try {
            const { cant } = req.query;
            const response = await productService.createMocksProducts(cant);
            if (!response) {
                return (
                    httpResponse.NotFound(res, errorsDictionary.ERROR_CREATE_ITEM)
                );
            } else {
                return (
                    httpResponse.Ok(res, response)
                );
            };
        } catch (error) {
            next(error.menssage);
        };
    };
    async createProduct(req, res, next) {
        try {
            const { email } = req.user;
            const newProduct = await productService.createProduct(req.body, email);
            if (!newProduct) {
                return (
                    httpResponse.NotFound(res, errorsDictionary.ERROR_CREATE_ITEM)
                );
            } else {
                return (
                    httpResponse.Ok(res, newProduct)
                );
            };
        } catch (error) {
            next(error);
        };
    };

    async deleteProduct(req, res, next) {
        try {
            const { email } = req.user;
            const { id } = req.params;
            let item = await this.service.getById(id);
            if (!item) return httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_ITEM);
            else {
                if (req.user.role != 'admin') {
                    if (email != item.product_owner) return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN_UNAVAILABLE);
                    else {
                        const deleteItem = await productService.deleteProduct(id);
                        return httpResponse.Ok(res, deleteItem);
                    }
                }
            }
        } catch (error) {
            return next(error);
        }
    }
};