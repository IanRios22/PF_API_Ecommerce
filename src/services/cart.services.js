import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";

const { cartDao, productDao } = persistence;

export default class CartService extends Services {
  constructor() {
    super(cartDao);
  };

  async createCart(cartData, ownerEmail) {
    try {
      cartData.owner = ownerEmail;
      const newItem = await cartDao.createCart(cartData);
      return newItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCarts(email) {
    try {
      const carts = await cartDao.getAllCarts(email);
      if (!carts) return false;
      return carts;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id) {
    try {
      const cartDel = await cartDao.delete(id);
      if (!cartDel) {
        return false;
      } else {
        return cartDel;
      }
    } catch (error) {
      console.log(error);
    }
  };


  async addProdToCart(cartId, prodId, email) {
    try {
      const existCart = await cartDao.getById(cartId);
      if (!existCart) {
        return false;
      }
      if (existCart.owner !== email) {
        return false
      } else {
        const existProd = await productDao.getById(prodId);
        if (!existProd) {
          return false;
        }
        const existProdInCart = existCart.products.find(
          (p) => {
            return p.product._id.toString() === prodId.toString();
          }
        );
        if (existProdInCart) {
          existProdInCart.quantity++;
          existCart.save();
          const updatedCart = await cartDao.getById(cartId);
          return updatedCart;
        } else {
          const updatedCart = await cartDao.addProdToCart(existCart, prodId);
          return updatedCart
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  async removeProdToCart(cartId, prodId, email) {
    try {
      const existCart = await cartDao.getById(cartId);
      console.log("existCart-->", existCart);

      if (existCart.owner !== email) {
        return false;
      }
      else {
        if (!existCart) {
          return false
        }
        const existProd = await productDao.getById(prodId);
        console.log("existProd-->", existProd);
        if (!existProd) {
          return false
        }
        const existProdInCart = existCart.products.find((p) => p.product._id.toString() === prodId.toString());

        if (existProdInCart && existProdInCart.quantity > 0) {
          existProdInCart.quantity--;
          await existCart.save();
          return existProdInCart;
        } else {
          return await cartDao.removeProdToCart(existCart, prodId);
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error removing product from cart");
    }
  };

  async getCartById(idCart, email) {
    try {
      const cart = await cartDao.getById(idCart);
      if (!cart) {
        return false
      } else {
        if (cart.owner !== email) {
          return false
        } else {
          return cart;
        };
      };
    } catch (error) {
      throw new Error(error.message);
    };
  };

  async updateProdQuantityToCart(cartId, prodId, quantity) {
    try {
      const existCart = await getById(cartId);
      console.log("existCart-->", existCart);
      if (!existCart) return false;

      const existProd = existCart.products.find((p) => p.product._id.toString() === prodId.toString());
      console.log("existProd-->", existProd);
      if (!existProd) return false;

      return await cartDao.updateProdQuantityToCart(existCart, existProd, quantity);
    } catch (error) {
      console.log(error);
    }
  };

  async clearCart(cartId, email) {
    try {
      const existCart = await cartDao.getById(cartId);
      console.log("existCart-->", existCart);
      if (existCart.owner !== email) {
        return false;
      } else {
        if (!existCart) {
          return false;
        } else {
          return await cartDao.clearCart(existCart);
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error clearing cart");
    }
  }
};