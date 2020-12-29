// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Optional, Model, Sequelize, DataTypes, ModelCtor } from 'sequelize';
import { Application } from '../declarations';

export interface UploadAttributes {
  id: number;
  url: string;
  deletedAt: Date;
}

// eslint-disable-next-line
interface UploadCreationAttributes extends Optional<UploadAttributes, 'id'> {}

export default function (
  app: Application,
): ModelCtor<Model<UploadAttributes, UploadCreationAttributes>> {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const upload = sequelizeClient.define<
    Model<UploadAttributes, UploadCreationAttributes>
  >(
    'upload',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      hooks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
  (upload as any).associate = function (models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return upload;
}
