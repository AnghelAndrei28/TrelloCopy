import React, { useState } from 'react';

interface CardDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  card: { id: string; title: string; description: string };
  onUpdate: (id: string, title: string, description: string) => void;
  onDelete: (id: string) => void;
}

const CardDetails: React.FC<CardDetailsProps> = ({ isOpen, onClose, card, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);

  const handleSave = () => {
    onUpdate(card.id, title, description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(card.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg relative z-60" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          &times;
        </button>
        {isEditing ? (
          <>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <p className="mb-4">{description}</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardDetails;