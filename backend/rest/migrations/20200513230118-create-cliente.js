'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      documento: {
        type: Sequelize.STRING
      },
      nombres: {
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING
      },
      celular: {
        type: Sequelize.INTEGER
      },
      billetera: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Clientes');
  }
};