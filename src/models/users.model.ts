// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Model, ModelCtor, Optional, Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Application } from '../declarations';

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  role: string;
}

// eslint-disable-next-line
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export default function (
  app: Application,
): ModelCtor<Model<UserAttributes, UserCreationAttributes>> {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const users = sequelizeClient.define<
    Model<UserAttributes, UserCreationAttributes>
  >(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
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
  (users as any).associate = function (models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
}
