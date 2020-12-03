import { Model, DataTypes, Sequelize } from 'sequelize'

interface AddressAttributes {
  id?: number
  userId: number
  address: string
}

// You can write `extends Model<AddressAttributes, AddressAttributes>` instead,
// but that will do the exact same thing as below
export class Address extends Model<AddressAttributes> implements AddressAttributes {
  public id!: number
  public userId!: number
  public address!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export default function (sequelize: Sequelize) {
  Address.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      address: {
        type: DataTypes.STRING(128),
        allowNull: false
      }
    },
    {
      tableName: 'addresses',
      sequelize // passing the `sequelize` instance is required
    }
  )

  return Address
}
