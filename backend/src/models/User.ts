import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: 'admin' | 'user';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Compare password method
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    const hashedPassword = this.getDataValue('password');
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  public static initModel(sequelize: any) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: [3, 50],
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [6, 255],
          },
        },
        role: {
          type: DataTypes.ENUM('admin', 'user'),
          defaultValue: 'admin',
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
        hooks: {
          beforeCreate: async (user: User) => {
            const password = user.getDataValue('password');
            if (password) {
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(password, salt);
              user.setDataValue('password', hashedPassword);
            }
          },
          beforeUpdate: async (user: User) => {
            if (user.changed('password')) {
              const password = user.getDataValue('password');
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(password, salt);
              user.setDataValue('password', hashedPassword);
            }
          },
        },
      }
    );
  }
}

export default User;
