import { object } from "joi";
import { Op, Sequelize } from "sequelize";
import { GroceryItem, GroceryItemCreationAttributes } from "../models/groceryArticle";

class Grocery {
  private conn: Sequelize;
  private groceryModel: typeof GroceryItem;

  constructor(conn: Sequelize) {
    this.conn = conn;
    this.groceryModel = GroceryItem;
  }

  // insert grocery items
  insert(groceryData: GroceryItemCreationAttributes): Promise<GroceryItem> {
    return this.groceryModel.create(groceryData);
  }

  // Read all grocery items
  getAll(): Promise<GroceryItem[]> {
    return this.groceryModel.findAll();
  }

  //reall avialble grocyer
  getAvailable(): Promise<GroceryItem[]> {
    return this.groceryModel.findAll({
      where: {
        quantity: { [Op.gt]: 0 },
      },
    });
  }

  // Read a single grocery item by ID
  getById(id: number): Promise<GroceryItem | null> {
    return this.groceryModel.findByPk(id);
  }

  // Update a grocery item
  async update(id: number, updatedData: Partial<GroceryItemCreationAttributes>): Promise<GroceryItem | null> {
    const [numUpdated] = await this.groceryModel.update(updatedData, {
      where: { id },
    });
    if (numUpdated) {
      const updatedGroceryItem = await this.groceryModel.findByPk(id);
      return updatedGroceryItem;
    }
    return null; // Return null if no record was updated
  }

  // Delete a grocery item
  delete(id: number): Promise<number> {
    return this.groceryModel.destroy({
      where: { id },
    });
  }

  //add item to cart
  async addToCart(cartItems: { id: number; quantity: number }[]): Promise<void> {
    // Begin a transaction
    await this.conn.transaction(async (transaction) => {
      for (const item of cartItems) {
        // Find the grocery item by ID
        const groceryItem = await this.groceryModel.findByPk(item.id, { transaction });

        if (!groceryItem) {
          throw new Error(`Grocery item with ID ${item.id} not found`);
        }

        // Check if the quantity is sufficient
        if (groceryItem.quantity < item.quantity) {
          throw new Error(`Insufficient quantity for item with ID ${item.id}`);
        }

        // Subtract the quantity from the grocery item
        await groceryItem.decrement("quantity", { by: item.quantity, transaction });
      }
    });
  }
}

export default Grocery;
