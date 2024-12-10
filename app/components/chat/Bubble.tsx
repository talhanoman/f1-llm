import React from 'react';
import { Message } from 'ai';



const Bubble: React.FC<Message> = ({ id, role, content }) => {
  return (
    <ul key={id} className="space-y-5">
      {role === 'user' ? (
        // User Message
        <li className="max-w-lg ms-auto flex justify-end gap-x-2 sm:gap-x-4">
          <div className="grow text-end space-y-3">
            {/* User Chat Bubble */}
            <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
              <p className="text-sm text-white">{content}</p>
            </div>
          </div>
        </li>
      ) : (
        // Assistant Message
        <li className="max-w-lg flex gap-x-2 sm:gap-x-4">
          {/* Assistant Chat Bubble */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
            <p className="text-sm text-gray-800 dark:text-white">{content}</p>
          </div>
        </li>
      )}
    </ul>
  );
};

export default Bubble;
