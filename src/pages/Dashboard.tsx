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
   
    </div>
  );
};

export default Dashboard;