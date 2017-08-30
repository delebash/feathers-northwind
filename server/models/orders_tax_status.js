/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders_tax_status', {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true
    },
    tax_status_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'orders_tax_status'
  });
};
