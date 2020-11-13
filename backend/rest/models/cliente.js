'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    documento: DataTypes.STRING,
    nombres: DataTypes.STRING,
    mail: DataTypes.STRING,
    celular: DataTypes.INTEGER,
    billetera: DataTypes.INTEGER
  }, {
    hooks: {

      // Se ejcuta una funcion de crear Billetera luego de Registrar a un Cliente
      afterCreate: (user, options) => {
        console.log(user, "USER PARAMETROs")
        console.log(options, "OPTIONS PARAMETROs")
        return sequelize.models.Billetera.create({
          saldo: 0,
          ClienteId: user.dataValues.id
        })
      }
    }
  });
  Cliente.associate = function(models) {
    
    Cliente.hasOne(models.Billetera), {
      foreignKey: "ClienteId"
    }
  };
  return Cliente;
};

