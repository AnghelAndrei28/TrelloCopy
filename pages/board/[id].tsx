import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BoardQueueComponent from '@/app/components/BoardQueueComponent';
import posthog from 'posthog-js';

const BoardPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [boardName, setBoardName] = useState('');
  const [queues, setQueues] = useState<{ id: string; title: string; cards: { id: string; title: string; description: string }[] }[]>([]);
  const [newQueueTitle, setNewQueueTitle] = useState('');

  const fetchBoardDetails = async () => {
    try {
      const response = await fetch(`/api/getBoard?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setBoardName(data.title);
      } else {
        console.error('Failed to fetch board details');
      }
    } catch (error) {
      console.error('Error fetching board details:', error);
    }
  };

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

  useEffect(() => {
    if (id) {
      fetchBoardDetails();
      fetchQueues();
    }
    posthog.capture('BoardPage');
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

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6">{boardName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {queues.map((queue) => (
          <BoardQueueComponent
            key={queue.id}
            id={queue.id}
            title={queue.title}
            onEditQueue={() => fetchQueues()}
            onDeleteQueue={() => fetchQueues()}
            onCreateCard={() => fetchQueues()}
            refetch={fetchQueues}
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