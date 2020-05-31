const Sequelize = require("sequelize");
const { usuarios,enderecos } = require("../models");





const clienteController = {
    updateE: async (req, res) => {
        const {cep, logradouro, uf, cidade, bairro, numero, complemento} = req.body;
        let id = req.session.usuario.id;

        const enderecoDb = await enderecos.findAll(
            {
              where: {
                id_usuario: id
            },
              type: Sequelize.QueryTypes.SELECT,
            }
          );

          if(enderecoDb.length < 1) {

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

            let enderecoId = "";

            let enderecoIddB = await enderecos.findAll(
              {
                where: {
                  id_usuario: id
              },
                type: Sequelize.QueryTypes.SELECT,
              }
            );
            
            enderecoIddB.forEach(element => {
              enderecoId = element.id_endereco;
            });
            

            await usuarios.update({
              id_endereco: enderecoId,
              updateAt: new Date(),
            },{
              where:{
                id_usuario:id,
              }});
            

          }else{

            await enderecos.update({
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
            },{
            where:{
                id_usuario:id
            }});

          }

        

            return res.redirect("/cliente");
    },

    updateC: async(req,res) => {
        const {CPF, nome, nascimento, sexo, ofertas} = req.body;
        let id = req.session.usuario.id;

        const enderecoDb = await enderecos.findAll(
            {
              where: {
                id_usuario: id
            },
              type: Sequelize.QueryTypes.SELECT,
            }
          );

          
          let id_endereco = "";

          enderecoDb.forEach(element => {

            id_endereco = element.id_endereco;
              
          });

        //   console.log("id_endereco = " + id_endereco);

          await usuarios.update({
                CPF, 
                nome,
                endereco: id_endereco,
                nascimento,
                sexo,
                ofertas,
                updateAt:new Date(),
          },{
              where:{
                  id_usuario:id
              }
          });



          return res.redirect("/cliente");

    }

    
}

module.exports = clienteController;