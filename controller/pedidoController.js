const Sequelize = require("sequelize");
const { Pedido } = require("../models");
const {carrinhos} = require("../models");


const pedidoController = {
    storePedido: async(req,res)=>{
        const id = req.session.usuario.id;
        let idPedido = "pedido123";

          const quantItens = await carrinhos.count({
            where: {
              id_usuario: id
            }
          })

          console.log(quantItens)

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

    }
}
module.exports = pedidoController;