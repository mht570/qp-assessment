import Joi from "joi";

// Joi schema for the Grocery
export const grocerySchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
});

export const cartSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(0).required(),
  })
);

// Joi schema for the Grocery
export const groceryUpdateSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number().min(0),
  id: Joi.number().integer().required(),
  quantity: Joi.number().min(0),
});
