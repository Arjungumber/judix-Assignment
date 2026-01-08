export default function TaskCard({ task, onEdit, onDelete }) {
  const { title, assignedTo, status, dueDate } = task;

  return (
    <div className="bg-white shadow p-4 rounded flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500">Assigned to: {assignedTo}</p>
        <p className="text-gray-500">
          Status:{" "}
          <span
            className={
              status === "Pending"
                ? "text-red-600"
                : status === "Completed"
                ? "text-green-600"
                : "text-yellow-600"
            }
          >
            {status}
          </span>
        </p>
        <p className="text-gray-500 text-sm">Due: {dueDate}</p>
      </div>
      <div>
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white mb-2 px-3 py-1 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
