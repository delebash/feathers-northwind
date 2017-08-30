/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_details', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.0000'
    },
    unit_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.0000'
    },
    discount: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'order_details_status',
        key: 'id'
      }
    },
    date_allocated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    purchase_order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    inventory_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'order_details'
  });
};
