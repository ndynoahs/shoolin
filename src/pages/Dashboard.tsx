import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, BarChart3, User } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  selectedOption?: string;
}

interface Assignment {
  id: string;
  className: string;
  questionCount: string;
  timeLimit: string;
  questions: Question[];
}

const Dashboard: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number>(70); // 01:10 in seconds

  // Mock assignment data
  const assignment: Assignment = {
    id: '1',
    className: 'Teacha Class 1',
    questionCount: '01/10 Questions',
    timeLimit: '01:10 seconds',
    questions: [
      {
        id: 1,
        text: 'How many days tools do Teacha provide for students?',
        options: [
          { id: 'A', text: 'Option 1' },
          { id: 'B', text: 'Option 2' },
          { id: 'C', text: 'Option 3' },
          { id: 'D', text: 'Option 4' }
        ]
      }
    ]
  };

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Assignment</h1>
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600" />
          </div>
        </div>

        {/* Assignment Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-semibold text-gray-800">{assignment.className}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-semibold text-gray-800">{assignment.questionCount}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="font-semibold text-orange-500">{formatTime(timeRemaining)} seconds</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-medium">1</span>
              </div>
              <span className="text-lg font-semibold text-gray-800">Question 1</span>
            </div>
            
            <h2 className="text-xl text-gray-800 mb-2">
              {assignment.questions[0].text}
            </h2>
            
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-600 mb-2">Instruction</p>
              <p className="text-sm text-gray-500 italic">
                Make sure to submit before the timer elapses to avoid missing marks.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-medium text-gray-700 mb-4">Select Option</p>
            
            <div className="grid grid-cols-2 gap-4">
              {assignment.questions[0].options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedOption === option.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded border-2 flex items-center justify-center font-medium ${
                        selectedOption === option.id
                          ? 'border-purple-600 bg-purple-600 text-white'
                          : 'border-gray-300 text-gray-600'
                      }`}>
                        {option.id}
                      </div>
                      <span className="text-gray-700">{option.text}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              disabled={!selectedOption}
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;