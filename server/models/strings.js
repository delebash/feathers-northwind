/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('strings', {
    string_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    string_data: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'strings'
  });
};
