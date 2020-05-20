'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('pedido', { 
    id_pedido:{
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       },
     endereco:{
       type: Sequelize.STRING,
      },
     pedido_status:{
       type: Sequelize.INTEGER,
      },
     data_pedido:{
       type: Sequelize.DATE,
      },
     id_usuario:{
       type: Sequelize.INTEGER,
      },
     id_carrinho:{
      type: Sequelize.INTEGER,
    },
    createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
     });

 },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');

    */
   return queryInterface.dropTable('pedido');

  }
};
