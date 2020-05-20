const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const {carrinhos} = require("../models");

const carrinhoController = {
    store: async (req, res) => {
        const {nome_produto, valor_produto, id_produto, descricao_produto, foto_produto} = req.body;
        let id = req.session.usuario.id;

        let valorTotal = 1*valor_produto;

        console.log(valorTotal);
        

        const carrinhoDb = await carrinhos.create(
            {
                nome_produto,
                valor_produto,
                id_produto,
                quantidade_produto: 1,
                descricao_produto,
                foto_produto,
                id_usuario: id,
                valor_total_produto: valorTotal,
            });

            return res.redirect("/carrinho");
    },

    remove: async (req, res) => {
        const {id_produto} = req.body;
        let id = req.session.usuario.id;


        

        await carrinhos.destroy(
            {
                where: {
                    id_produto,
                    id_usuario: id,
                }
            });

            return res.redirect("/carrinho");
        }
}

module.exports = carrinhoController;