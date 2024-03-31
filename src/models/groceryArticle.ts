import { Model, DataTypes, Sequelize } from "sequelize";

// Define the attributes of the GroceryItem model
interface GroceryItemAttributes {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define the attributes for creation, which is similar to GroceryItemAttributes but without the id
interface GroceryItemCreationAttributes extends Omit<GroceryItemAttributes, "id"> {}

// Define the GroceryItem model class
class GroceryItem extends Model<GroceryItemAttributes, GroceryItemCreationAttributes> implements GroceryItemAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public quantity!: number;

  // Required for sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the model fields and options
const initModel = (sequelize: Sequelize): void => {
  GroceryItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "grocery",
      modelName: "GroceryItem",
      timestamps: true, // Enable timestamps (createdAt, updatedAt)
    }
  );
};

export { GroceryItem, GroceryItemAttributes, GroceryItemCreationAttributes, initModel };
