// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Model, Optional, Sequelize, DataTypes, ModelCtor } from 'sequelize';
import { Application } from '../declarations';

export interface MasterAttributes {
  id: number;
  text: string;
  deletedAt: Date;
}

// eslint-disable-next-line
interface MasterCreationAttributes extends Optional<MasterAttributes, 'id'> {

}

export default function (
  app: Application,
): ModelCtor<Model<MasterAttributes, MasterCreationAttributes>> {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const masters = sequelizeClient.define<
    Model<MasterAttributes, MasterCreationAttributes>
  >(
    'masters',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    },
  );

  // eslint-disable-next-line no-unused-vars
  (masters as any).associate = function (models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return masters;
}
