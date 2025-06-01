import React, { useState } from 'react';
import { BookOpen, BarChart3, Clock, ArrowRight, Users, Calendar } from 'lucide-react';

// Mock ContentHeader component
const ContentHeader = ({ title }) => (
  <div className="mb-6 lg:mb-8">
    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
  </div>
);

// Mock data structure
const courses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    description: "Calculus, Linear Algebra, and Differential Equations",
    questionCount: 10,
    timeLimit: 30,
    students: 45,
    dueDate: "Dec 15, 2024",
    difficulty: "Advanced",
    color: "purple"
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    description: "Mechanics, Thermodynamics, and Wave Theory",
    questionCount: 8,
    timeLimit: 25,
    students: 38,
    dueDate: "Dec 18, 2024",
    difficulty: "Intermediate",
    color: "blue"
  },
  {
    id: 3,
    title: "Chemistry Basics",
    description: "Atomic Structure, Chemical Bonding, and Reactions",
    questionCount: 12,
    timeLimit: 35,
    students: 52,
    dueDate: "Dec 20, 2024",
    difficulty: "Beginner",
    color: "green"
  },
  {
    id: 4,
    title: "Computer Science",
    description: "Data Structures, Algorithms, and Programming",
    questionCount: 15,
    timeLimit: 45,
    students: 67,
    dueDate: "Dec 22, 2024",
    difficulty: "Advanced",
    color: "indigo"
  }
];

const questionData = {
  1: {
    id: 1,
    text: "What is the derivative of f(x) = x³ + 2x² - 5x + 1 with respect to x?",
    options: [
      { id: "A", text: "3x² + 4x - 5" },
      { id: "B", text: "x³ + 4x - 5" },
      { id: "C", text: "3x² + 2x - 5" },
      { id: "D", text: "3x² + 4x + 1" },
    ]
  }
};

const ResponsiveAssignment = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(1800);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setTimeRemaining(course.timeLimit * 60); // Convert minutes to seconds
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setSelectedOption('');
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CourseCard = ({ course, onSelect }) => {
    let iconBg, iconText, buttonBorder, buttonText, buttonHoverBg;
    
    switch (course.color) {
      case 'purple':
        iconBg = 'bg-purple-100';
        iconText = 'text-purple-600';
        buttonBorder = 'border-purple-600';
        buttonText = 'text-purple-600';
        buttonHoverBg = 'hover:bg-purple-100';
        break;
      case 'blue':
        iconBg = 'bg-blue-100';
        iconText = 'text-blue-600';
        buttonBorder = 'border-blue-600';
        buttonText = 'text-blue-600';
        buttonHoverBg = 'hover:bg-blue-100';
        break;
      case 'green':
        iconBg = 'bg-green-100';
        iconText = 'text-green-600';
        buttonBorder = 'border-green-600';
        buttonText = 'text-green-600';
        buttonHoverBg = 'hover:bg-green-100';
        break;
      case 'indigo':
        iconBg = 'bg-indigo-100';
        iconText = 'text-indigo-600';
        buttonBorder = 'border-indigo-600';
        buttonText = 'text-indigo-600';
        buttonHoverBg = 'hover:bg-indigo-100';
        break;
      default:
        iconBg = 'bg-purple-100';
        iconText = 'text-purple-600';
        buttonBorder = 'border-purple-600';
        buttonText = 'text-purple-600';
        buttonHoverBg = 'hover:bg-purple-100';
    }

    return (
      <div
        onClick={() => onSelect(course)}
        className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer group"
      >
        {/* Course Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
              <BookOpen className={`w-6 h-6 ${iconText}`} />
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(course.difficulty)}`}>
              {course.difficulty}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-gray-900">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Course Details */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{course.questionCount} Questions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{course.timeLimit} mins</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{course.students} students</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{course.dueDate}</span>
            </div>
          </div>
          
          {/* Start Button */}
          <button className={`w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 ${buttonBorder} ${buttonText} rounded-lg ${buttonHoverBg} transition-all duration-200 group-hover:shadow-sm`}>
            <span className="font-medium">Start Assignment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const OptionButton = ({ option, isSelected, color, onSelect }) => {
    let borderColor, bgColor, numberBg, numberText;
    
    if (isSelected) {
      switch (color) {
        case 'purple':
          borderColor = 'border-purple-600';
          bgColor = 'bg-purple-100';
          numberBg = 'bg-purple-600';
          numberText = 'text-white';
          break;
        case 'blue':
          borderColor = 'border-blue-600';
          bgColor = 'bg-blue-100';
          numberBg = 'bg-blue-600';
          numberText = 'text-white';
          break;
        case 'green':
          borderColor = 'border-green-600';
          bgColor = 'bg-green-100';
          numberBg = 'bg-green-600';
          numberText = 'text-white';
          break;
        case 'indigo':
          borderColor = 'border-indigo-600';
          bgColor = 'bg-indigo-100';
          numberBg = 'bg-indigo-600';
          numberText = 'text-white';
          break;
        default:
          borderColor = 'border-purple-600';
          bgColor = 'bg-purple-100';
          numberBg = 'bg-purple-600';
          numberText = 'text-white';
      }
    } else {
      borderColor = 'border-gray-200';
      bgColor = 'hover:bg-gray-50';
      numberBg = 'border-gray-300';
      numberText = 'text-gray-600';
    }

    return (
      <div
        onClick={() => onSelect(option.id)}
        className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-all duration-200 ${borderColor} ${bgColor} ${!isSelected ? 'hover:border-gray-300' : ''}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onSelect(option.id);
          }
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className={`w-8 h-8 rounded border-2 flex items-center justify-center font-medium flex-shrink-0 ${isSelected ? `${borderColor} ${numberBg}` : numberBg} ${numberText}`}>
              {option.id}
            </div>
            <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {option.text}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const SubmitButton = ({ color, disabled }) => {
    let bgColor, hoverBg;
    
    switch (color) {
      case 'purple':
        bgColor = 'bg-purple-600';
        hoverBg = 'hover:bg-purple-700';
        break;
      case 'blue':
        bgColor = 'bg-blue-600';
        hoverBg = 'hover:bg-blue-700';
        break;
      case 'green':
        bgColor = 'bg-green-600';
        hoverBg = 'hover:bg-green-700';
        break;
      case 'indigo':
        bgColor = 'bg-indigo-600';
        hoverBg = 'hover:bg-indigo-700';
        break;
      default:
        bgColor = 'bg-purple-600';
        hoverBg = 'hover:bg-purple-700';
    }

    return (
      <button 
        className={`w-full sm:w-auto px-6 py-3 ${disabled ? 'bg-gray-300 cursor-not-allowed' : `${bgColor} ${hoverBg}`} text-white rounded-lg transition-all duration-200 font-medium text-sm sm:text-base`}
        disabled={disabled}
        aria-label="Submit your answer"
      >
        Submit Answer
      </button>
    );
  };

  // Courses List View
  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <ContentHeader title="Assignments"/>
             
          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} onSelect={handleCourseSelect} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Question View
  let headerIconBg, headerIconText, questionNumberBg;
  
  switch (selectedCourse.color) {
    case 'purple':
      headerIconBg = 'bg-purple-100';
      headerIconText = 'text-purple-600';
      questionNumberBg = 'bg-purple-600';
      break;
    case 'blue':
      headerIconBg = 'bg-blue-100';
      headerIconText = 'text-blue-600';
      questionNumberBg = 'bg-blue-600';
      break;
    case 'green':
      headerIconBg = 'bg-green-100';
      headerIconText = 'text-green-600';
      questionNumberBg = 'bg-green-600';
      break;
    case 'indigo':
      headerIconBg = 'bg-indigo-100';
      headerIconText = 'text-indigo-600';
      questionNumberBg = 'bg-indigo-600';
      break;
    default:
      headerIconBg = 'bg-purple-100';
      headerIconText = 'text-purple-600';
      questionNumberBg = 'bg-purple-600';
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <ContentHeader title="Assignment"/>

        {/* Header with Back Button */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {/* Class Name */}
              <div className="flex items-center space-x-2 min-w-0">
                <div className={`w-8 h-8 ${headerIconBg} rounded-lg flex items-center justify-center`}>
                  <BookOpen className={`w-5 h-5 ${headerIconText}`} />
                </div>
                <span className="font-semibold text-gray-800 truncate">{selectedCourse.title}</span>
              </div>
              
              {/* Question Count */}
              <div className="flex items-center space-x-2 min-w-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-semibold text-gray-800 truncate">{selectedCourse.questionCount} Questions</span>
              </div>
            </div>
            
            {/* Timer */}
            <div className="flex items-center space-x-2 lg:justify-end">
              <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <span className="font-semibold text-orange-500 text-sm sm:text-base">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className={`w-6 h-6 ${questionNumberBg} rounded flex items-center justify-center flex-shrink-0`}>
                <span className="text-white text-sm font-medium">1</span>
              </div>
              <span className="text-base sm:text-lg font-semibold text-gray-800">
                Question 1
              </span>
            </div>
            
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 leading-tight">
              {questionData[1].text}
            </h2>
            
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Instruction
              </p>
              <p className="text-sm text-gray-500 italic leading-relaxed">
                Make sure to submit before the timer elapses to avoid missing marks.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-medium text-gray-700 mb-4">Select Option</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {questionData[1].options.map((option) => (
                <OptionButton 
                  key={option.id}
                  option={option}
                  isSelected={selectedOption === option.id}
                  color={selectedCourse.color}
                  onSelect={handleOptionSelect}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex justify-center sm:justify-end">
            <SubmitButton 
              color={selectedCourse.color}
              disabled={!selectedOption}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveAssignment;