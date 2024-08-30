import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config'

interface MeasureAttributes {
  measure_uuid?: string;
  measure_datetime: Date;
  measure_type: string;
  measure_value: number;
  has_confirmed: boolean;
  image_url: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  customer_id: number;
}

export interface MeasureInput extends Optional<MeasureAttributes, 'measure_uuid'> {}
export interface MeasureOuput extends Required<MeasureAttributes> {}


class Measure extends Model<MeasureAttributes> implements MeasureAttributes {
  public measure_uuid?: string
  public measure_datetime!: Date
  public measure_type!: string
  public measure_value!: number
  public has_confirmed!: boolean
  public image_url!: string
  public customer_id!: number

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // Associações
  static associate(models: any) {
    Measure.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'customer' });
  }
}

Measure.init({
  measure_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  measure_datetime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  measure_type: {
    type: DataTypes.STRING,
    allowNull: false
  },  
  measure_value: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  has_confirmed: {
    type: DataTypes.BOOLEAN
  },
  image_url: {
    type: DataTypes.STRING
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Customers', 
      key: 'id', 
    }
  }
}, {
  timestamps: true,
  sequelize: sequelize,
  paranoid: true
})

export default Measure