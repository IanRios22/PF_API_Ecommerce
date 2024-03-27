import { createTransport } from "nodemailer";
import config from '../config/config.js';


const transporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: config.EMAIL,
        pass: config.PASSWORD
    }
});

const createMsgRegister = (first_name) => {
    return (
        `<h2>Hola ${first_name}, ahora podés usar nuestros servicios</h2>`
    )
};

const createMsgInactiveUser = (first_name) => {
    return (
        `<p>Hola ${first_name}, dimos de baja a tu cuenta por inactividad`
    )
}

const createMsgDeleteProduct = (first_name) => {
    return (
        `<h2>Hola ${first_name}, su producto fue eliminado</h2> `
    )
}
const createMsgResetPass = (first_name) => {
    return (
        `<p>${first_name}, tienes que hacer click aqui -> <a href='http://localhost:8080/api/users/new-password'>ACÁ</a> para cambiar tu contraseña</p>`
    )
}

export const sendMail = async (user, service, token = null) => {
    try {
        const { first_name, email } = user;
        let message = '';
        let subj = '';

        switch (service) {
            case "register":
                message = createMsgRegister(first_name);
                subj = 'Registro existoso';
                break;
            case "resetPassword":
                message = createMsgResetPass(first_name);
                subj = 'Recupera tu contraseña';
                break;
            case "inactiveUser":
                message = createMsgInactiveUser(first_name);
                subj = 'Usuario inactivo';
                break;
            case "deleteProduct":
                message = createMsgDeleteProduct(first_name);
                subj = 'Eliminación de producto';
                break;
            default:
                message = "";
                break;
        };

        const gmailOptions = {
            from: config.EMAIL,
            to: email,
            subject: subj,
            html: message
        };

        const response = await transporter.sendMail(gmailOptions)
        if (token !== null) {
            return token
        } else {
            return (
                console.log("Mail enviado", response)
            )
        }

    } catch (error) {
        throw new Error(error.message);
    };
};