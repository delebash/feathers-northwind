/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inventory_transactions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    transaction_type: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'inventory_transaction_types',
        key: 'id'
      }
    },
    transaction_created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    transaction_modified_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    purchase_order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'purchase_orders',
        key: 'id'
      }
    },
    customer_order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    comments: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'inventory_transactions'
  });
};
