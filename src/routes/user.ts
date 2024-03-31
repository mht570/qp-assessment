import { Router } from "express";
import * as groceryController from "../controller/grocery";
import { wrapErrHandler, wrapSchema } from "../utils/wrapper";
import { cartSchema } from "../middlwares/validateModels";

const router = Router();

router.get("/getAvailable", wrapErrHandler(groceryController.getAvailableGroceryList));
router.post("/addToCart", wrapSchema(cartSchema), wrapErrHandler(groceryController.addGroceryItemToCart));

export default router;
