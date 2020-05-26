const Sequelize = require("sequelize");
const config = require("../config/database");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");


const { produtos } = require("../models");
const {carrinhos} = require("../models");
const {enderecos} = require("../models");
const {Pedido} = require("../models");






const bodyController = {
    home: async(req, res) => {
      const con = new Sequelize(config);

        const produtosDb = await con.query("select * from produtos",
          {
            type: Sequelize.QueryTypes.SELECT,
          }
        );
        return res.render("index", {usuario: req.session.usuario, produtos: produtosDb, quantItens: req.session.count, title: 'Home'});
    },
    noticia: (req, res) => {

        return res.render("noticia", {usuario: req.session.usuario, quantItens: req.session.count, title: 'News'});
    },
    cadastro: (_req, res) => {
        return res.render("cadastro", {title: 'Cadastro'});
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

      return res.render("carrinho", {usuario: req.session.usuario, carrinho: carrinhosDb, quantItens: req.session.count, title: 'Carrinho'});

  },
    cliente: async (req, res) => {
      let id = req.session.usuario.id;


      const enderecoDb = await enderecos.findAll(
        {
          where: {
            id_usuario: id
        },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      const pedidosDb = await Pedido.findAll(
        {
          where:{
            id_usuario: id
          }
        });

      
      
      return res.render("cliente", {usuario: req.session.usuario, quantItens: req.session.count, enderecoDb: enderecoDb, pedidos: pedidosDb, title: 'Inicial'});
  },

  logout: (req, res) => {
    req.session.destroy();
    res.render('login',{title:'login'})
      
},

    login: (_req, res) => {
        return res.render("login",{title: 'Login'});
    },
    
    mapa: (req, res) => {
        return res.render("mapa", {usuario: req.session.usuario, quantItens: req.session.count, title: 'Mapa'});
    },
    paginaAdmin: async(req, res) => {
      const con = new Sequelize(config);
      let id = req.session.usuario.id;



        let quantItens = await carrinhos.count({
          where: {
            id_usuario: id
          }
        })

       let produtosDb =  await produtos.findAll(
          {
            where: {
              id_usuario: id
            }
          }
        );

        
        

        return res.render("paginaAdmin", {usuario: req.session.usuario, produtos: produtosDb, quantItens, title: 'Pagina Admin'});
    }
};

module.exports = bodyController;