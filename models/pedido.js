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
          
         },
         id_produto:{
           type: DataTypes.INTEGER,
           allowNull: false,
          
         },
         nome_produto:{
           type: DataTypes.STRING,
           allowNull: false,
          
         },
         quantidade_produto:{
           type: DataTypes.INTEGER,
           allowNull: false,
          
         },
         valor_produto:{
           type: DataTypes.DECIMAL,
           allowNull: false,
          
         },
         valor_total_produto:{
           type: DataTypes.DECIMAL,
           allowNull: false,
         },
         createdAt: DataTypes.DATE,
         updatedAt: DataTypes.DATE,
          });
          Pedido.associate = (models) => {
            Pedido.belongsTo(models.usuarios, {foreignKey:"id_usuario", as: 'usuarios'});
          };
          
        return Pedido;

    };
