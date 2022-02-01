import {
  Sequelize,
  DataTypes,
  Optional,
  Model,
  Association,
  HasManyCountAssociationsMixin
} from 'sequelize'
import { Address } from './address'
interface UserAttributes {
  id: number
  firstName: string
  email: string
  phone: string
}

// You can also set multiple attributes optional at once
export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'email' | 'phone'> {}

export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id: number
  public firstName: string
  public email: string
  public phone: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public countAddresses!: HasManyCountAssociationsMixin

  public static associations: {
    addresses: Association<User, Address>
  }
}

export default function (sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING(13)
      }
    },
    {
      tableName: 'users',
      sequelize
    }
  )

  return User
}
