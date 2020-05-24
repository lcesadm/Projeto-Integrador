const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const { enderecos } = require("../models");


const clienteController = {
    update: async (req, res) => {
        const {cep, logradouro, uf, cidade, bairro, numero, complemento} = req.body;
        let id = req.session.usuario.id;


        await enderecos.create({
                cep,
                logradouro,
                uf, 
                id_usuario: id,
                cidade,
                bairro,
                numero,
                complemento,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            return res.redirect("/cliente");
    }
}

module.exports = clienteController;