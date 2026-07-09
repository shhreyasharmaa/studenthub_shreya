const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Expense Schema
const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

// Home Route
app.get("/", (req, res) => {
  res.send("StudentHub Backend Running 🚀");
});

app.get("/api/expenses", async (req, res) => {
  console.log("✅ GET /api/expenses called");

  try {
    const expenses = await Expense.find();
    console.log(expenses);
    res.status(200).json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST new expense
app.post("/api/expenses", async (req, res) => {
  console.log("✅ POST /api/expenses called");
  const expense = new Expense(req.body);
  await expense.save();
  res.json(expense);
});

// DELETE expense
app.delete("/api/expenses/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense Deleted" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});