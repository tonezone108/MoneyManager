const express = require("express");
const incomeExpenses = require("../controllers/incomeExpenses");
const { authenticate } = require("../middleware");
const router = express.Router();

router.get("/", authenticate, incomeExpenses.getAllEntries);

router.get("/:id", authenticate, incomeExpenses.getEntryById);

router.post("/", authenticate, incomeExpenses.createEntry);

router.put("/:id", authenticate, incomeExpenses.updateEntryById);

router.delete(
  "/:expensesId",
  authenticate,
  incomeExpenses.deleteUserByExpensesId
);

module.exports = router;
