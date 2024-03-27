import Controllers from "./class.controller.js";
import UserService from "../services/user.services.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
const userService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  }

  register = async (req, res, next) => {
    try {
      const newUser = await userService.register(req.body);
      if (!newUser) {
        return httpResponse.Forbidden(res, errorsDictionary.ERROR_CREATE_USER);
      } else {
        return httpResponse.Ok(res, newUser);
      }
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { token, userId } = await userService.login(req.body);
      if (!token || !userId) {
        return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
      } else {
        res.cookie("token", token, { httpOnly: true });
        return httpResponse.Ok(res, { token, userId });
      }
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      const { first_name, last_name, email, role } = req.user;
      return httpResponse.Ok(res, {
        first_name,
        last_name,
        email,
        role,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteInactiveUsers = async (req, res, next) => {
    try {
      const userDelete = await userService.deleteInactiveUser();
      if (!userDelete)
        return httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_ITEM);
      return httpResponse.Ok(res, userDelete);
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const user = req.user;
      const tokenResetPass = await userService.resetPassword(user);
      if (tokenResetPass) {
        res.cookie("tokenpass", tokenResetPass);
        return httpResponse.Ok(res, {
          msg: "Email reset pass send ok",
        });
      } else return httpResponse.NotFound(res, "email not send");
    } catch (error) {
      next(error);
    }
  };

  updatePassword = async (req, res, next) => {
    try {
      const user = req.user;
      const { pass } = req.body;
      const { tokenpass } = req.cookies;
      console.log("token en controller: ", tokenpass);
      if (!tokenpass)
        return httpResponse.Forbidden(res, errorsDictionary.ERROR_TOKEN);
      const updPass = await this.service.updatePassword(user, pass);
      if (!updPass)
        return httpResponse.NotFound(res, errorsDictionary.ERROR_PASSWORD);
      res.clearCookie("tokenpass");
      return httpResponse.Ok(res, updPass);
    } catch (error) {
      next(error);
    }
  };

  uploadImg = async (req, res, next) => {
    try {
      const user = req.user.id;
      if (!req.file || !user) return httpResponse.ServerError(res, errorsDictionary.ERROR_UPLOAD_DOCUMENT);
      else {
        const path = req.file.path;
        const userImg = await userService.uploadImg(user, path);
        return httpResponse.Ok(res, userImg);
      }
    } catch (error) {
      next(error);
    }
  }
}
