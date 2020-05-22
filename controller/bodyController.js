const Sequelize = require("sequelize");
const config = require("../config/database");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


const { produtos } = require("../models");

const {carrinhos} = require("../models");




const bodyController = {
    home: async(req, res) => {
      const con = new Sequelize(config);

        const produtosDb = await con.query("select * from produtos",
          {
            type: Sequelize.QueryTypes.SELECT,
          }
        );
        return res.render("index", {usuario: req.session.usuario, produtos: produtosDb, quantItens: req.session.count});
    },
    noticia: (req, res) => {
        return res.render("noticia", {usuario: req.session.usuario, quantItens: req.session.count});
    },
    cadastro: (_req, res) => {
        return res.render("cadastro");
    },
    
    
    
    finalizar: (req, res) => {

      let idFinalizer = crypto.randomBytes(4).toString('HEX')

        return res.render("finalizar", {usuario: req.session.usuario, quantItens: req.session.count, idFinalizer});
    },
    carrinho: async (req, res) => {
    

      let id = req.session.usuario.id;



      const carrinhosDb = await carrinhos.findAll(
        {
          where: {
            id_usuario: id
        },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      return res.render("carrinho", {usuario: req.session.usuario, carrinho: carrinhosDb, quantItens: req.session.count});

  },
    cliente: (req, res) => {

      
      return res.render("cliente", {usuario: req.session.usuario, quantItens: req.session.count});
  },
    

    login: (_req, res) => {
        return res.render("login");
    },
    
    mapa: (req, res) => {
        return res.render("mapa", {usuario: req.session.usuario, quantItens: req.session.count});
    },
    paginaAdmin: async(req, res) => {
      const con = new Sequelize(config);
      let id = req.session.usuario.id;



        let quantItens = await carrinhos.count({
          where: {
            id_usuario: id
          }
        })

      const produtos = await con.query(
        "select * from produtos where id_usuario=:usuario_id;",
        {
          replacements: {
            usuario_id: id
        },
          type: Sequelize.QueryTypes.SELECT,
        }
      );
        

        return res.render("paginaAdmin", {usuario: req.session.usuario, produtos: produtos, quantItens});
    }
};

module.exports = bodyController;