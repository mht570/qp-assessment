import { Router } from "express";
import * as groceryController from "../controller/grocery";
import { wrapErrHandler, wrapSchema } from "../utils/wrapper";
import { grocerySchema, groceryUpdateSchema } from "../middlwares/validateModels";
const router = Router();

router.post("/insertGrocery", wrapSchema(grocerySchema), wrapErrHandler(groceryController.insertGroceryList));
router.get("/getList", wrapErrHandler(groceryController.getGroceryList));
router.patch("/updateGrocery", wrapSchema(groceryUpdateSchema), wrapErrHandler(groceryController.updateGroceryItem));
router.delete("/deleteGrocery", wrapErrHandler(groceryController.deleteGroceryItem));

export default router;
