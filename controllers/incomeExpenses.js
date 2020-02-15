const mysql = require("mysql");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllEntries = (req, res) => {
  pool.query("SELECT * FROM incomeExpenses", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getEntryById = (req, res) => {
  let sql = "SELECT * FROM incomeExpenses WHERE expensesId = ?";
  sql = mysql.format(sql, [req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createEntry = (req, res) => {
  // INSERT INTO Income&Expenses test entry
  let regularIncome = req.body.regularIncome;
  let taxes = req.body.taxes;
  let insurance = req.body.insurance;
  let debts = req.body.debts;
  let housing = req.body.housing;
  let investing = req.body.investing;
  let remainingIncome = req.body.remainingIncome;

  let sql =
    "INSERT INTO incomeExpenses (regularIncome, taxes, insurance, debts, housing, investing, remainingIncome) VALUES (?, ?, ?, ?, ?, ?, ?);";
  // WHAT GOES IN THE BRACKETS
  const replacements = [
    regularIncome,
    taxes,
    insurance,
    debts,
    housing,
    investing,
    remainingIncome
  ];
  sql = mysql.format(sql, replacements);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

const updateEntryById = (req, res) => {
  const {
    regularIncome,
    taxes,
    insurance,
    debts,
    housing,
    investing,
    remainingIncome
  } = req.body;
  let sql =
    "UPDATE incomeExpenses SET regularIncome = ?, taxes = ?, insurance = ?, debts = ?, housing = ?, investing = ?, remainingIncome = ? WHERE expensesId = ? ";
  sql = mysql.format(sql, [
    regularIncome,
    taxes,
    insurance,
    debts,
    housing,
    investing,
    remainingIncome,
    req.params.id
  ]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

// const updateUserById = (req, res) => {
//   const { firstName, lastName } = req.body;
//   let sql = "UPDATE users SET first_name = ?, last_name = ? WHERE id = ?";
//   sql = mysql.format(sql, [firstName, lastName, req.params.id]);

//   pool.query(sql, (err, results) => {
//     if (err) return handleSQLError(res, err);
//     return res.status(204).json();
//   });
// };

const deleteUserByExpensesId = (req, res) => {
  let sql = "DELETE FROM incomeExpenses WHERE expensesId = ?";
  sql = mysql.format(sql, [req.params.expensesId]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  });
};

module.exports = {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntryById,
  deleteUserByExpensesId
};
