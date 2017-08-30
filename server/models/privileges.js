/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('privileges', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    privilege_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'privileges'
  });
};
