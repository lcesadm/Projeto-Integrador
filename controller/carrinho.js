const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const {carrinhos} = require("../models");


const carrinhoController = {
    store: async (req, res) => {
        const {nome_produto, valor_produto, descricao_produto, id_produto, foto_produto} = req.body;
        let id = req.session.usuario.id;


        let valorTotal = 1*valor_produto;

    let findProdu = await carrinhos.findAll({
        where:{
            id_produto,
            id_usuario: id,
        }
    });

    let countIten = 1;

    let valorTotalDb


    findProdu.forEach(element => {
        console.log('estou aqui' + element.id_produto);

        countIten += element.quantidade_produto;
        valorTotalDb =+ element.valor_total_produto;

    });

    let convertValor = parseInt(valorTotalDb);

    console.log(convertValor);

    let passarValor = convertValor*countIten;

    console.log(passarValor);


    if(findProdu < 1){
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
                createdAt: new Date,
                updateAt: new Date,
            });
    }else{
        await carrinhos.update({
            quantidade_produto: countIten,
            valor_total_produto: passarValor,
            updateAt: new Date,
        },{
            where:{
                id_produto,
                id_usuario:id
            }});
    }
    

        

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