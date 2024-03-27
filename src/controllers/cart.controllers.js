import Controllers from "./class.controller.js";
import CartService from "../services/cart.services.js";
//import { createResponse } from "../utils/utils.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";

const httpResponse = new HttpResponse();
const service = new CartService();
export default class CartController extends Controllers {
  constructor() {
    super(service);
  };

  createCart = async (req, res, next) => {
    try {
      const { email } = req.user;
      const newCart = await service.createCart(req.body, email);
      return httpResponse.Ok(res, newCart);
    } catch (error) {
      return next(error);
    }
  };

  getAllCarts = async (req, res, next) => {
    try {
      const { email } = req.user;
      const items = await service.getAllCarts(email);
      if (items.length === 0) {
        return httpResponse.NotFound(res, errorsDictionary.ERROR_GET_ALL);
      }
      return httpResponse.Ok(res, items);
    } catch (error) {
      next(error);
    }
  };

  getCartById = async (req, res, next) => {
    try {
      const { email } = req.user;
      const { id } = req.params;
      const cart = await service.getCartById(id, email);
      if (!cart) return httpResponse.NotFound(res, errorsDictionary.ERROR_FIND_ITEM);
      return httpResponse.Ok(res, cart);
    } catch (error) {
      next(error)
    }
  };

  remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cartDel = await service.remove(id);
      if (!cartDel) {
        return (
          httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_CART)
        )
      } else {
        return (
          httpResponse.Ok(res, cartDel)
        )
      };
    } catch (error) {
      next(error);
    }
  };

  addProdToCart = async (req, res, next) => {
    try {
      const { idCart, idProd } = req.params;
      const { email } = req.user;
      const newProdToUserCart = await service.addProdToCart(
        idCart,
        idProd,
        email,
      );
      if (!newProdToUserCart) {
        return (
          httpResponse.NotFound(res, errorsDictionary.ERROR_ADD_TO_CART)
        )
      } else {
        httpResponse.Ok(res, newProdToUserCart)
      };
    } catch (error) {
      next(error);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const { idCart, idProd } = req.params;
      const delProdToUserCart = await service.removeProdToCart(
        idCart,
        idProd,
      );
      if (!delProdToUserCart) {
        return (
          httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_TO_CART)
        )
      } else {
        return (
          httpResponse.Ok(res, delProdToUserCart)
        )
      };
    } catch (error) {
      next(error);
    }
  };

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { idCart, idProd } = req.params;
      const { quantity } = req.body;
      const updateProdQuantity = await service.updateProdQuantityToCart(
        idCart,
        idProd,
        quantity
      );
      if (!updateProdQuantity) {
        return (
          httpResponse.NotFound(res, "Error update product quantity to cart")
        )
      } else {
        return (
          httpResponse.Ok(res, updateProdQuantity)
        )
      };
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const clearCart = await service.clearCart(
        idCart,
      );
      if (!clearCart) {
        return (
          httpResponse.NotFound(res, "Error clear cart")
        )
      } else {
        return (
          httpResponse.Ok(res, clearCart)
        )
      };
    } catch (error) {
      next(error.message);
    }
  };
};