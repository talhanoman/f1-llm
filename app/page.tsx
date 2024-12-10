'use client'

import Image from 'next/image'
import { useChat } from 'ai/react'
import QuickPrompts from './components/chat/QuickPrompts'
import { DarkModeToggle } from './components/DarkModeToggle'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface BubbleProps {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const Bubble: React.FC<BubbleProps> = ({ role, content }) => (
  <li className={`flex gap-x-2 sm:gap-x-4 ${role === 'user' ? 'justify-end' : ''}`}>
    <div className={`grow max-w-[90%] md:max-w-2xl w-full space-y-3 ${role === 'user' ? 'bg-red-100 dark:bg-red-900' : 'bg-gray-100 dark:bg-gray-800'} p-4 rounded-lg`}>
      <p className="text-sm text-gray-800 dark:text-gray-200">{content}</p>
    </div>
  </li>
)

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  

  const handleQuickPrompt = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as React.ChangeEvent<HTMLTextAreaElement>)    
  }

  return (
    <main className="relative min-h-screen bg-[url('/assets/f1_background.jpg')] bg-cover bg-center dark:bg-[url('/assets/f1_background_dark.jpg')]">
      <div className="absolute inset-0 bg-black bg-opacity-70 dark:bg-opacity-80"></div>
      <DarkModeToggle />
      <div className="relative max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="text-center flex items-center flex-col">
          <Image
            src="/assets/final-logo.png"
            alt="F1 Logo"
            width={200}
            height={100}
            className="mb-6"
          />
          <h1 className="text-4xl font-bold text-white sm:text-5xl mb-2">
            F1 AI Copilot
          </h1>
          <p className="mt-3 text-xl text-gray-300">
            Your AI-powered assistant for all things Formula 1
          </p>
        </div>

        <ul className="mt-16 space-y-5">
          {messages.map((message: Message) => (
            <Bubble key={message.id} {...message} />
          ))}
        </ul>

        <div className="mt-8 sticky bottom-0 z-10 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 border-t border-gray-200 dark:border-gray-700 pt-4 pb-6 px-4 sm:px-6 lg:px-0">
          <div className="max-w-4xl mx-auto">
            {(input.length === 0 && !isLoading) && <QuickPrompts onPromptSelect={handleQuickPrompt} />}
            <form onSubmit={handleSubmit} className="relative">
              <textarea
                value={input}
                onChange={handleInputChange}
                className="p-4 pb-12 block w-full border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 text-gray-900 dark:text-gray-100"
                placeholder="Ask me anything about F1..."
              ></textarea>

              <div className="absolute bottom-1 right-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 dark:bg-red-700 dark:hover:bg-red-600"
                >
                  {isLoading ? (
                    <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

