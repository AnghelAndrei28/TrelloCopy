import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TrelloGridItemProps {
  title: string;
  onDelete: () => void;
  onEdit: () => void;
  onClick: () => void;
}

const TrelloGridItem: React.FC<TrelloGridItemProps> = ({ title, onDelete, onEdit, onClick }) => {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 relative cursor-pointer" onClick={onClick}>
      <div className="absolute top-2 right-2 flex space-x-2">
        <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="text-blue-500 hover:text-blue-700">
          <FaEdit />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-red-500 hover:text-red-700">
          <FaTrash />
        </button>
      </div>
      <div className="text-left text-xl font-semibold">
        {title}
      </div>
    </div>
  );
};

export default TrelloGridItem;