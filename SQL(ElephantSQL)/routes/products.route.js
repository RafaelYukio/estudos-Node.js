import express from "express";
import ProductController from "../controllers/products.controller.js";

const router = express.Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProduct);
router.delete("/:id", ProductController.deleteProduct);
router.put("/", ProductController.updateProduct);

export default router;
