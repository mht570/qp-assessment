import { Request, Response } from "express";
import { GroceryRepo } from "../repo";
import { GroceryItemCreationAttributes, GroceryItem } from "../models/groceryArticle";

export const insertGroceryList = async (req: Request, res: Response) => {
  const { name, price, quantity } = req.body;
  console.log(name, price, quantity);
  const newGroceryItemData: GroceryItemCreationAttributes = { name, price, quantity };
  const newGroceryItem = await GroceryRepo.insert(newGroceryItemData);
  res.status(201).json(newGroceryItem);
};

export const getGroceryList = async (req: Request, res: Response) => {
  const newGroceryItem = await GroceryRepo.getAll();
  res.status(201).json(newGroceryItem);
};

export const getAvailableGroceryList = async (req: Request, res: Response) => {
  const newGroceryItem = await GroceryRepo.getAvailable();
  res.status(201).json(newGroceryItem);
};

export const deleteGroceryItem = async (req: Request, res: Response) => {
  const id: any = req.query.id;
  const newGroceryItem = await GroceryRepo.delete(id);
  res.status(201).json(newGroceryItem);
};

export const updateGroceryItem = async (req: Request, res: Response) => {
  const { id, name, price, quantity } = req.body;

  let updateObject: any = {};
  if (name != undefined) updateObject.name = name;
  if (price != undefined) updateObject.price = price;
  if (quantity != undefined) updateObject.quantity = quantity;

  let newGroceryItemData: GroceryItemCreationAttributes = updateObject;

  console.log(newGroceryItemData);

  const newGroceryItem = await GroceryRepo.update(id, newGroceryItemData);
  res.status(201).json(newGroceryItem);
};

export const addGroceryItemToCart = async (req: Request, res: Response) => {
  const newGroceryItem = await GroceryRepo.addToCart(req.body);
  res.status(201).json(newGroceryItem);
};
