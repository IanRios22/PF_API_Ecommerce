import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";
import { createHash, isValidPassword } from "../../../../utils/utils.js";
import jwt from "jsonwebtoken";
import config from "../../../../config/config.js";

const SECRET_KEY_JWT = config.SECRET_KEY_JWT;

export default class UserMongoDao extends MongoDao {
    constructor() {
        super(UserModel);
    };

    generateToken(user) {
        const payload = {
            userId: user._id,
        };
        const token = jwt.sign(payload, SECRET_KEY_JWT, {
            expiresIn: "15m",
        });
        return token;
    };

    async register(user) {
        try {
            const { email, password } = user;
            const existUser = await this.model.findOne({ email });
            if (!existUser) {
                if (email === "felpudoAdmin@mail.com" && password === "coder1234") {
                    const newUser = await this.model.create({ ...user, password: createHash(password), role: 'admin' });
                    return newUser;
                } else {
                    const newUser = await this.model.create({ ...user, password: createHash(password) });
                    return newUser;
                }
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async login(user) {
        try {
            const { email, password } = user;
            const userExist = await this.getByEmail(email);
            if (userExist) {
                const passValid = isValidPassword(userExist, password)
                if (!passValid) return false
                else {
                    const token = this.generateToken(userExist)
                    return { token, userId: userExist._id }
                }
            } return false
        } catch (error) {
            console.log(error)
            throw new Error(error.menssage);
        }
    }


    async getByEmail(email) {
        try {
            const user = await this.model.findOne({ email });
            if (!user) {
                console.log("Usuario no encontrado para el email:", email);
                return null;
            };
            console.log("Usuario encontrado:", user.email);
            return user;
        } catch (error) {
            console.log("Error en getByEmail:", error);
            throw error;
        };
    };

    async updateLastConnection(userId) {
        try {
            const currentDate = new Date();
            await this.model.findByIdAndUpdate(userId, { lastConnection: currentDate });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteInactiveUsers() {
        try {
            const inactiveUsers = await this.model.find({ lastConnection: { $lt: new Date(Date.now() - 1000 * 60 * 60 * 24) } });
            await this.model.deleteMany({ _id: { $in: inactiveUsers.map(user => user._id) } });
            return inactiveUsers;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async resetPassword(user) {
        try {
            const { email } = user;
            const userExist = await this.getByEmail(email);
            if (userExist) return this.generateToken(userExist, "1h");
            else return false;
        } catch (error) {
            throw new Error(error.menssage);
        };
    };

    async updatePassword(user, password) {
        try {
            const isEqual = isValidPassword(user, password);
            if (isEqual) {
                return false
            } else {
                const newPass = createHash(password);
                return (
                    await this.update(user_id, { password: newPass })
                );
            };
        } catch (error) {
            throw new Error(error.menssage);
        };
    };

    updateImg = async (userId, imagePath) => {
        try {
            const updatedUser = await this.model.findOneAndUpdate(
                { _id: userId },
                { $set: { image: imagePath } },
                { new: true }
            );
            if (userId.role != "admin" || userId.role != "premium") {
                const updatedUser = await this.model.findOneAndUpdate(
                    { _id: userId },
                    { $set: { role: 'premium' } },
                    { new: true }
                );
                return updatedUser;
            }
            return updatedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    };

};