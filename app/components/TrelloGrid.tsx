import React from "react";
import { useRouter } from 'next/router';
import TrelloGridItem from "@/app/components/TrelloGridItem";
import { Trelloboard } from "@/model/board";

interface TrelloGridProps {
  boards: Trelloboard[];
  fetchBoards: () => void;
}

const TrelloGrid: React.FC<TrelloGridProps> = ({ boards, fetchBoards }) => {
  const router = useRouter();

  const handleDeleteBoard = async (id: string) => {
    try {
      const response = await fetch(`/api/deleteBoard?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchBoards(); // Refetch all boards after deleting one
      } else {
        console.error('Failed to delete board');
      }
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const handleEditBoard = async (id: string, newTitle: string) => {
    try {
      const response = await fetch('/api/editBoard', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title: newTitle }),
      });

      if (response.ok) {
        await fetchBoards(); // Refetch all boards after editing one
      } else {
        console.error('Failed to edit board');
      }
    } catch (error) {
      console.error('Error editing board:', error);
    }
  };

  const handleItemClick = (id: string) => {
    router.push(`/board/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {boards.map((board) => (
        <TrelloGridItem
          key={board._id}
          title={board.title}
          onDelete={() => handleDeleteBoard(board._id)}
          onEdit={() => handleEditBoard(board._id, prompt("Enter new title", board.title) || board.title)}
          onClick={() => handleItemClick(board._id)}
        />
      ))}
    </div>
  );
};

export default TrelloGrid;