import { useState, useEffect } from "react";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  useEffect(() => {
    fetch("http://localhost:5001/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  const addExpense = async () => {
    if (!title || !amount) return;

    const res = await fetch("http://localhost:5001/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        amount: Number(amount),
        category,
      }),
    });

    const newExpense = await res.json();

    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
  };

  const deleteExpense = async (id) => {
    await fetch(`http://localhost:5001/api/expenses/${id}`, {
      method: "DELETE",
    });

    setExpenses(expenses.filter((expense) => expense._id !== id));
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="expense-card">
      <h2>💸 Expense Tracker</h2>

      <div className="expense-form">
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Study</option>
        </select>

        <button onClick={addExpense}>
          ➕ Add Expense
        </button>
      </div>

      <h3 className="total">
        💰 Total Spent: ₹{total}
      </h3>

      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        expenses.map((expense) => (
          <div className="expense-item" key={expense._id}>
            <div>
              <strong>{expense.title}</strong>
              <br />
              ₹{expense.amount} • {expense.category}
            </div>

            <button
              onClick={() => deleteExpense(expense._id)}
              className="delete-btn"
            >
              🗑 Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseTracker;