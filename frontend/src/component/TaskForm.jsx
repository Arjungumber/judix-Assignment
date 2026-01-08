import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function TaskForm({ onAdd, onUpdate, taskToEdit, users }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const { user } = useContext(AuthContext);
  const [assignedTo, setAssignedTo] = useState(""); 
  const [assignedUserId, setAssignedUserId] = useState(""); 


  const usersList = Array.isArray(users) ? users : users?.data || [];
  console.log("users", usersList);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setAssignedTo(taskToEdit.assignedTo || ""); 
      const cb = taskToEdit.createdBy;
      const cbId = cb?._id || cb;
      setAssignedUserId(cbId ? String(cbId) : ""); 
      setStatus(taskToEdit.status);
      setDueDate(
        taskToEdit.dueDate
          ? new Date(taskToEdit.dueDate).toISOString().split("T")[0]
          : ""
      );
    }
  }, [taskToEdit]);

  console.log("Current User:", user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    let finalAssignedName = assignedTo;
    let finalCreatedBy = user._id || user.id;

    if (user.role === "admin") {
      const selected = usersList.find(
        (u) => String(u._id) === String(assignedUserId)
      );
      if (!selected) {
        toast.error("Please select an assignee");
        return;
      }

      finalAssignedName = selected.fullName;
      finalCreatedBy = selected._id;
    }

    if (!title || !finalAssignedName || !dueDate) {
      toast.error("Please fill title, assignee and due date");
      return;
    }

    const taskData = {
      title,
      assignedTo: finalAssignedName,
      status,
      dueDate,
      createdBy: finalCreatedBy,
    };

    if (taskToEdit) {
      onUpdate(taskToEdit._id, taskData);
    } else {
      onAdd(taskData);
    }
    setTitle("");
    setAssignedTo("");
    setStatus("Pending");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md grid gap-4"
    >
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {usersList && usersList.length > 0 ? (
        <select
          value={assignedUserId}
          onChange={(e) => {
            const id = e.target.value;
            setAssignedUserId(id);
            const sel = usersList.find((u) => String(u._id) === String(id));
            if (sel) setAssignedTo(sel.fullName);
          }}
          className="border p-2 rounded w-full"
        >
          <option value="" disabled>
            Select Assignee
          </option>
          {usersList.map((user) => (
            <option key={user._id} value={user._id}>
              {user.fullName}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="border p-2 rounded w-full"
        />
      )}

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
