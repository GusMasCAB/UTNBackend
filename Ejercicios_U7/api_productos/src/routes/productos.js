const express = require("express");
const router = express.Router();
const productoContoller = require("../controllers/productoController");
const { requiredScopes } = require('express-oauth2-jwt-bearer');
//Enrutamiento
//obtener todo los productos
router.get("/",requiredScopes("read:productos"),productoContoller.getAllProductos);

router.get("/:id",requiredScopes("read:productos"),productoContoller.getProductoById);

router.post("/",requiredScopes("write:productos"),productoContoller.createProducto);

router.put("/:id",requiredScopes("write:productos"),productoContoller.updateProductoById);

router.get("/:id",requiredScopes("write:productos"),productoContoller.deleteProductoById);

module.exports = router;