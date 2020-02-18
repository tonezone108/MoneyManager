const express = require("express");
const incomeAllocationController = require("../controllers/incomeAllocation");
const { authenticate } = require("../middleware");
const router = express.Router();

router.get("/", authenticate, incomeAllocationController.getAllAllocations);

router.get("/:id", authenticate, incomeAllocationController.getAllocationById);

router.post("/", authenticate, incomeAllocationController.createAllocation);

router.put(
  "/:id",
  authenticate,
  incomeAllocationController.updateAllocationById
);

router.delete(
  "/:userName",
  authenticate,
  incomeAllocationController.deleteALlocationByAllocationId
);

module.exports = router;
