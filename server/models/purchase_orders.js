/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('purchase_orders', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    supplier_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'suppliers',
        key: 'id'
      }
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    submitted_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
      references: {
        model: 'purchase_order_status',
        key: 'id'
      }
    },
    expected_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    shipping_fee: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.0000'
    },
    taxes: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.0000'
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    payment_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.0000'
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    approved_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    approved_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    submitted_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'purchase_orders'
  });
};
