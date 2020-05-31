module.exports = (sequelize, Datatypes) => {
    const mapas = sequelize.define('mapas', {
        id_Mapa: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        endereco: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: Datatypes.FLOAT(10, 6),
            allowNull: false,
        },
        longitude: {
            type: Datatypes.FLOAT(10, 6),
            allowNull: false,
        },
        tipo: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        // ceatedAt: Datatypes.DATE,
        // updatedAt: Datatypes.DATE,
    })
    return mapas
}