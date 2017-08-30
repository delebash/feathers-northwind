/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoices', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    invoice_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tax: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.0000'
    },
    shipping: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.0000'
    },
    amount_due: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.0000'
    }
  }, {
    tableName: 'invoices'
  });
};
