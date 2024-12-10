import React from 'react';

interface QuickPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

const QuickPrompts: React.FC<QuickPromptsProps> = ({ onPromptSelect }) => {
  const prompts = [
    "Tell me about the latest F1 race results",
    "Who is leading the drivers' championship?",
    "What's the next F1 Grand Prix?",
    "Explain F1 DRS system",
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {prompts.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onPromptSelect(prompt)}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default QuickPrompts;

