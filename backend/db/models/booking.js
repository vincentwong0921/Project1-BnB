'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.Spot,
        {foreignKey: 'spotId'}
      ),
      Booking.belongsTo(
        models.User,
        {foreignKey: 'userId'}
      )
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull:false,
      validate: {
        isDate: true,
        isAfterToday(value){
          const today = new Date().getTime();
          if (new Date(value).getTime() < today) {
            throw new Error('startDate cannot be in the past')
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull:false,
      validate: {
        isDate: true,
        isAfterStartDate(value){
          if (new Date(value) <= new Date(this.startDate)) {
            throw new Error("endDate cannot be on or before startDate");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
