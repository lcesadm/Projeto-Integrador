const Sequelize = require("sequelize");

const {carrinhos} = require("../../models");


function destroyer(id_carinho){
    console.log(id_carinho);
    carrinhos.destroy({
        where: {id_carrinho: id_carinho}
    })
}

