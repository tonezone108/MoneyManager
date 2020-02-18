const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllAllocations = (req, res) => {
  pool.query("SELECT * FROM incomeAllocation", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getAllocationById = (req, res) => {
  let sql = "SELECT * FROM incomeAllocation WHERE allocationId = ?";
  sql = mysql.format(sql, [req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createAllocation = (req, res) => {
  const {
    earnedIncome,
    savings,
    groceries,
    transport,
    leisure,
    luxuries
  } = req.body;
  let sql =
    "INSERT INTO incomeAllocation (earnedIncome, savings, groceries, transport, leisure, luxuries  ) VALUES (?, ?, ?, ?, ?, ?)";
  sql = mysql.format(sql, [
    earnedIncome,
    savings,
    groceries,
    transport,
    leisure,
    luxuries
  ]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
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
const updateAllocationById = (req, res) => {
  const {
    earnedIncome,
    savings,
    groceries,
    transport,
    leisure,
    luxuries
  } = req.body;
  let sql =
    "UPDATE incomeAllocation SET earnedIncome = ?, savings = ?, groceries = ?, transport = ?, leisure = ?, luxuries = ?  WHERE allocationId = ?";
  sql = mysql.format(sql, [
    earnedIncome,
    savings,
    groceries,
    transport,
    leisure,
    luxuries,
    req.params.id
  ]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

const deleteALlocationByAllocationId = (req, res) => {
  let sql = "DELETE FROM incomeAllocation WHERE allocationId = ?";
  sql = mysql.format(sql, [req.params.userName]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  });
};

module.exports = {
  getAllAllocations,
  getAllocationById,
  createAllocation,
  updateAllocationById,
  deleteALlocationByAllocationId
};
