const Sequelize = require("sequelize");
const { Pedido } = require("../models");
const {carrinhos} = require("../models");
const { produtos } = require("../models");
const crypto = require("crypto");




const idFinalizer = crypto.randomBytes(4).toString('HEX')



const pedidoController = {
  finalizar: (req, res) => {
      idFinalizer+2;
      return res.render("finalizar", {usuario: req.session.usuario, quantItens: req.session.count, idFinalizer});
  },
    storePedido: async(req,res)=>{
        const id = req.session.usuario.id;
        const idEndereco = req.session.usuario.id_endereco;

        let idPedido = idFinalizer;

          const quantItens = await carrinhos.count({
            where: {
              id_usuario: id
            }
          })


          if(quantItens > 0){

            

                const carrinhosDb = await carrinhos.findAll(
                    {
                      where: {
                        id_usuario: id
                    },
                      type: Sequelize.QueryTypes.SELECT,
                    }
                  );

                  console.log(carrinhosDb);
                    let id_produtoDb = "";
                    let nome_produtoDb = "";
                    let quantidade_produtoDb = "";
                    let valor_produtoDb = "";
                    let valor_total_produtoDb = "";

                    carrinhosDb.forEach(element => {
                        id_produtoDb = element.id_produto;
                        nome_produtoDb = element.nome_produto;
                        valor_produtoDb = element.valor_produto;
                        valor_total_produtoDb = element.valor_total_produto;
                        quantidade_produtoDb = element.quantidade_produto
                    });

                  await Pedido.create({
                    id: idPedido,
                    id_usuario: id,
                    id_produto: id_produtoDb,
                    nome_produto: nome_produtoDb,
                    quantidade_produto: quantidade_produtoDb,
                    valor_produto: valor_produtoDb,
                    valor_total_produto: valor_total_produtoDb,
                    id_endereco: idEndereco,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  });

                  console.log("a data esta aqui" + data);

                  let vendidosDb = await produtos.findAll(
                    {
                      where: {
                        id_produto: id_produtoDb
                    },
                      type: Sequelize.QueryTypes.SELECT,
                    }
                  );

                  let vendidosUp = "";

                  vendidosDb.forEach(element => {
                    vendidosUp = element.vendidos + quantidade_produtoDb;
                  });
                    

                  await produtos.update({
                    vendidos: vendidosUp,
                    updatedAt: new Date(),
                  },{
                    where:{
                      id_produto: id_produtoDb,
                    }
                  })

                  await carrinhos.destroy({
                    where:{
                      id_usuario: id,
                      id_produto: id_produtoDb
                    }
                  })
                    // for (let i = 0; i < quantItens; i++) {

                    //     carrinhosDb.forEach(async element => {
                    //        await Pedido.create({
                    //             id: idPedido,
                    //             id_produto: element.dataValues.id_produto,
                    //             nome_produto: element.dataValues.nome_produto,
                    //             quantidade_produto: element.dataValues.quantidade_produto, 
                    //             id_usuario: id,
                    //             valor_produto: element.dataValues.valor_produto,
                    //             valor_total_produto: element.dataValues.valor_total_produto,
                    //             createdAt: new Date(),
                    //             updatedAt: new Date(),
                    //         });
                    //         await carrinhos.destroy(
                    //             {
                    //                 where: {
                    //                     id_produto: element.dataValues.id_produto,
                    //                 }
                    //             });    
                            
                    //     });
                                              
                    // }

                    // return string = element.dataValues.id_produto;
                    // let value = string.concat(string);


                    // console.log(value);

                    

                    
            }
       


        return res.redirect("/cliente");

    },
    
}
module.exports = pedidoController;