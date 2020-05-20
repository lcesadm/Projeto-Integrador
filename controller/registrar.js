const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { usuarios } = require("../models");


const registerController = {
    store: async (req, res) => {
        const {email, password, CPF, nome, endereco, nascimento, sexo, ofertas} = req.body;
        const hashPassword = bcrypt.hashSync(password, 8);;
        
        const user = await usuarios.create({
                email,
                password: hashPassword,
                CPF, 
                nome,
                endereco,
                nascimento,
                sexo,
                ofertas,
                vendedor: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            if (!email) {
              return res.render("register", {
                msg: "Erro ao cadastrar um usuario",
              });
            }
            console.log(user);
            return res.redirect("cliente");
    },

}

module.exports = registerController;