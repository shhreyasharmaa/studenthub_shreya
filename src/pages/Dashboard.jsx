import TaskManager from "../components/TaskManager";
import StickyNotes from "../components/StickyNotes";
import ExpenseTracker from "../components/ExpenseTracker";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>My Dashboard 🎀</h1>

      <div className="dashboard-grid">
        <TaskManager />
        <StickyNotes />
        <ExpenseTracker />
      </div>
    </div>
  );
}

export default Dashboard;