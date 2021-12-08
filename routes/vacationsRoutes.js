"use strict";

const router = require("express").Router(),
  vacationsController = require("../controllers/vacationsController");

router.get("", vacationsController.index, vacationsController.indexView);
router.get("/new", vacationsController.new);
router.post("/create", vacationsController.create, vacationsController.redirectView);
router.get("/:id/edit", vacationsController.edit);
router.put("/:id/update", vacationsController.update, vacationsController.redirectView);
router.get("/:id", vacationsController.show, vacationsController.showView);
router.delete("/:id/delete", vacationsController.delete, vacationsController.redirectView);
module.exports = router;
