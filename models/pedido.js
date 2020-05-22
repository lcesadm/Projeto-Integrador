module.exports = (sequelize, DataTypes) => {
    const Pedido = sequelize.define(
        "Pedido", 
        {
          id:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
          }, 
         id_usuario:{
           type: DataTypes.INTEGER,
           allowNull: false,
          //  references: {
          //    model: "usuarios",
          //    key: "id_usuario",
          //    }
         },
         id_produto:{
           type: DataTypes.INTEGER,
           allowNull: false,
          //  references: {
          //    model: "carrinhos",
          //    key: "id_produto",
          //    }
         },
         nome_produto:{
           type: DataTypes.STRING,
           allowNull: false,
          //  references: {
          //    model: "carrinhos",
          //    key: "nome_produto",
          //    }
         },
         quantidade_produto:{
           type: DataTypes.INTEGER,
           allowNull: false,
          //  references: {
          //    model: "carrinhos",
          //    key: "quantidade_produto",
          //    }
         },
         valor_produto:{
           type: DataTypes.DECIMAL,
           allowNull: false,
          //  references: {
          //    model: "carrinhos",
          //    key: "valor_produto",
          //    }
         },
         valor_total_produto:{
           type: DataTypes.DECIMAL,
           allowNull: false,
          //  references: {
          //    model: "carrinhos",
          //    key: "valor_total_produto",
          //    }
         },
         createdAt: DataTypes.DATE,
         updatedAt: DataTypes.DATE,
          });
          Pedido.associate = (models) => {
            Pedido.belongsTo(models.usuarios, {foreignKey:"id_usuario", as: 'usuarios'});
          };
          
        return Pedido;

    };
