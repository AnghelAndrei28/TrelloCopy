import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BoardQueueComponent from '@/app/components/BoardQueueComponent';

const BoardPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [queues, setQueues] = useState<{ id: string; title: string; cards: { id: string; title: string; description: string }[] }[]>([]);
  const [newQueueTitle, setNewQueueTitle] = useState('');

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const response = await fetch(`/api/getAllQueues?boardId=${id}`);
        if (response.ok) {
          const data = await response.json();
          setQueues(data.map((queue: any) => ({ id: queue._id, title: queue.title, cards: [] })));
        } else {
          console.error('Failed to fetch queues');
        }
      } catch (error) {
        console.error('Error fetching queues:', error);
      }
    };

    if (id) {
      fetchQueues();
    }
  }, [id]);

  const handleAddQueue = async () => {
    if (newQueueTitle.trim()) {
      try {
        const response = await fetch('/api/createQueue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ boardId: id, title: newQueueTitle }),
        });

        if (response.ok) {
          const data = await response.json();
          const newQueue = {
            id: data.queue._id,
            title: newQueueTitle,
            cards: [],
          };
          setQueues([...queues, newQueue]);
          setNewQueueTitle('');
        } else {
          console.error('Failed to create queue');
        }
      } catch (error) {
        console.error('Error creating queue:', error);
      }
    }
  };

  const handleEditQueue = async (queueId: string) => {
    const newTitle = prompt('Enter new title');
    if (newTitle) {
      try {
        const response = await fetch('/api/updateQueueTitle', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: queueId, title: newTitle }),
        });

        if (response.ok) {
          setQueues(queues.map(queue => queue.id === queueId ? { ...queue, title: newTitle } : queue));
        } else {
          console.error('Failed to update queue title');
        }
      } catch (error) {
        console.error('Error updating queue title:', error);
      }
    }
  };

  const handleDeleteQueue = async (queueId: string) => {
    try {
      const response = await fetch(`/api/deleteQueue?id=${queueId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setQueues(queues.filter(queue => queue.id !== queueId));
      } else {
        console.error('Failed to delete queue');
      }
    } catch (error) {
      console.error('Error deleting queue:', error);
    }
  };

  const handleCreateCard = (queueId: string, title: string, description: string) => {
    setQueues(queues.map(queue => {
      if (queue.id === queueId) {
        return {
          ...queue,
          cards: [...queue.cards, { id: `card${queue.cards.length + 1}`, title, description }],
        };
      }
      return queue;
    }));
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6">Board ID: {id}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {queues.map((queue) => (
          <BoardQueueComponent
            key={queue.id}
            id={queue.id}
            title={queue.title}
            onEdit={() => handleEditQueue(queue.id)}
            onDelete={() => handleDeleteQueue(queue.id)}
            onCreateCard={(title, description) => handleCreateCard(queue.id, title, description)}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 w-64"
          placeholder="Add a list..."
          value={newQueueTitle}
          onChange={(e) => setNewQueueTitle(e.target.value)}
        />
        {newQueueTitle.trim() && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleAddQueue}
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  );
};

export default BoardPage;