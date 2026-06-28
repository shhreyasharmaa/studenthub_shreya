import TaskManager from "../components/TaskManager";
import StickyNotes from "../components/StickyNotes";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>My Dashboard 🎀</h1>

      <div className="dashboard-grid">
        <TaskManager />
        <StickyNotes />
      </div>
    </div>
  );
}

export default Dashboard;