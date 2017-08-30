/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('purchase_order_details', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    purchase_order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'purchase_orders',
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
      allowNull: false
    },
    unit_cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    date_received: {
      type: DataTypes.DATE,
      allowNull: true
    },
    posted_to_inventory: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    inventory_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'inventory_transactions',
        key: 'id'
      }
    }
  }, {
    tableName: 'purchase_order_details'
  });
};
