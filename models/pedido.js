module.exports = (sequelize, DataTypes) => {
    const Pedido = sequelize.define(
        "Pedido", 
        {
            id_pedido:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                },
              endereco:{
                type: DataTypes.STRING,
                allowNull: false,
              },
              pedido_status:{
                type: DataTypes.INTEGER,
                allowNull: false,
              },
              data_pedido:{
                type: DataTypes.DATE,
                allowNull: false,
              },
              id_usuario:{
                type: DataTypes.INTEGER,
                allowNull: false,
              },
              id_carrinho:{
               type: DataTypes.INTEGER,
               allowNull: false,
             },
             createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        });
        return Pedido;

    };
