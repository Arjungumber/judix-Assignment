import { useState } from "react";
import { Filter, ArrowUpDown } from "lucide-react";

export default function FilterSortBar({
  filterStatus,
  setFilterStatus,
  sortOrder,
  setSortOrder,
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  return (
    <div className="flex items-center gap-3 relative">
      <div className="relative">
        <button
          onClick={() => {
            setShowFilter(!showFilter);
            setShowSort(false);
          }}
          className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-100"
        >
          <Filter size={16} />
          <span>Filter</span>
        </button>

        {showFilter && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-md border border-gray-200 z-10 w-40">
            {["All", "Pending", "In Progress", "Completed"].map((status) => (
              <div
                key={status}
                onClick={() => {
                  setFilterStatus(status);
                  setShowFilter(false);
                }}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  filterStatus === status ? "bg-gray-50 font-medium" : ""
                }`}
              >
                {status}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => {
            setShowSort(!showSort);
            setShowFilter(false);
          }}
          className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-100"
        >
          <ArrowUpDown size={16} />
          <span>Sort</span>
        </button>

        {showSort && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-md border border-gray-200 z-10 w-48">
            {[
              { label: "Due Date: Earliest", value: "asc" },
              { label: "Due Date: Latest First", value: "desc" },
            ].map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  setSortOrder(option.value);
                  setShowSort(false);
                }}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  sortOrder === option.value ? "bg-gray-50 font-medium" : ""
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
