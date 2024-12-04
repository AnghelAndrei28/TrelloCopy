import CreateBoardModal from "@/app/components/CreateBoardModal";
import TrelloGrid from "@/app/components/TrelloGrid";
import React, { useEffect, useState } from "react";
import { Trelloboard } from "@/model/board";

export default function Home() {
  const [boards, setBoards] = useState<Trelloboard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBoards = async () => {
    try {
      const response = await fetch('/api/getBoards');
      if (response.ok) {
        const data = await response.json();
        setBoards(data);
      } else {
        console.error('Failed to fetch boards');
      }
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreateBoard = async (title: string) => {
    try {
      const response = await fetch('/api/createBoard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        await fetchBoards(); // Refetch all boards after creating a new one
      } else {
        console.error('Failed to create board');
      }
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create New Board
      </button>
      <TrelloGrid
        boards={boards}
        fetchBoards={fetchBoards}
      />
      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateBoard}
      />
    </div>
  );
}