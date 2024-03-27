import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";
import { sendMail } from "./mailing.user.services.js";
const { userDao } = persistence;

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  register = async (user) => {
    try {
      const response = await userDao.register(user);
      await sendMail(user, 'register');
      return response;
    } catch (error) {
      throw new Error(error.message);
    };
  };

  login = async (user) => {
    try {
      const { token, userId } = await userDao.login(user);
      if (token && userId) {
        await this.updateLastConnection(userId);
        return { token, userId };
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateLastConnection = async (userId) => {
    try {
      await userDao.updateLastConnection(userId);
    } catch (error) {
      throw new Error(error.message);
    };
  };

  resetPassword = async (user) => {
    try {
      const token = await userDao.resetPassword(user);
      if (token) {
        return await sendMail(user, 'resetPassword', token);
      } else {
        return false;
      };
    } catch (error) {
      throw new Error(error.message);
    };
  };

  updatePassword = async (user, password) => {
    try {
      const response = await userDao.updatePassword(user, password);
      if (!response) {
        return false
      } else {
        return (
          response
        );
      };
    } catch (error) {
      throw new Error(error.menssage);
    };
  };

  uploadImg = async (user, path) => {
    try {
      const userID = await userDao.getById(user);
      if (!userID) return false
      else {
        const updateUser = await userDao.updateImg(userID, path);
        return updateUser;
      }
    } catch (error) {
      throw new Error(error.menssage);
    }
  }

  deleteInactiveUsers = async () => {
    try {
      const inactiveUsers = await userDao.deleteInactiveUsers();
      inactiveUsers.forEach(user => { sendMail(user, 'inactiveUser') });
      return inactiveUsers;
    } catch (error) {
      throw new Error(error.menssage);
    }
  }

};
