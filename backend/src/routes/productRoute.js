import { Router } from "express";
import { addProduct, getMyProducts, getAllProducts, getProductById, toggleLike, toggleBookmark ,deleteProduct,bookMarked} from "../controllers/productController.js";
import isUser from "../middlewares/isUser.js";

const productRouter = Router(); 

// Specific routes BEFORE dynamic routes
productRouter.post("/add", isUser, addProduct);
productRouter.get("/my-products", isUser, getMyProducts);
productRouter.get("/bookmarked", isUser, bookMarked);

// General routes
productRouter.get("/all", getAllProducts);

// Dynamic routes LAST
productRouter.get("/:id", getProductById);
productRouter.post("/:id/toggle-like", isUser, toggleLike);
productRouter.post("/:id/toggle-bookmark", isUser, toggleBookmark);
productRouter.get("/delete/:id", deleteProduct);

export default productRouter;