import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config'

interface CustomerAttributes {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CustomerInput extends Optional<CustomerAttributes, 'id'> {}
export interface CustomerOuput extends Required<CustomerAttributes> {}


class Customer extends Model<CustomerAttributes> implements CustomerAttributes {
  public id?: string
  public name!: string

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // Associações
  static associate(models: any) {
    Customer.hasMany(models.Measure, { foreignKey: 'customer_id', as: 'measures' });
  }
}

Customer.init({
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
}, {
  timestamps: true,
  sequelize: sequelize,
  paranoid: true
})

export default Customer