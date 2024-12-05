import posthog from "posthog-js";
import React, { useState } from "react";

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
}

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState("");

  React.useEffect(() => {
    posthog.capture('CreateBoardModal');
  }, []);

  const handleCreate = () => {
    onCreate(title);
    setTitle("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Board</h2>
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
          placeholder="Board Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBoardModal;