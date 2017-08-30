/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inventory_transaction_types', {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true
    },
    type_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'inventory_transaction_types'
  });
};
