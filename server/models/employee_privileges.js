/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee_privileges', {
    employee_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    privilege_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'privileges',
        key: 'id'
      }
    }
  }, {
    tableName: 'employee_privileges'
  });
};
