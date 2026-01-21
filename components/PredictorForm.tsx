
import React, { useState } from 'react';
import { mlEngine } from '../services/mlEngine';
import { PerformanceCategory } from '../types';

const PredictorForm: React.FC = () => {
  const [formData, setFormData] = useState({
    attendance: 85,
    internal: 20,
    previous: 75,
    study: 5
  });

  const [result, setResult] = useState<{ score: number; category: PerformanceCategory } | null>(null);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    const prediction = mlEngine.predict({
      attendance_percentage: formData.attendance,
      internal_score: formData.internal,
      previous_exam_score: formData.previous,
      study_hours: formData.study
    });
    setResult(prediction);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="p-2 bg-blue-100 rounded-lg">🤖</span>
        Performance Predictor
      </h2>
      
      <form onSubmit={handlePredict} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attendance (%)</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.attendance}
              onChange={(e) => setFormData({...formData, attendance: Number(e.target.value)})}
              min="0" max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Internal Score (out of 30)</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.internal}
              onChange={(e) => setFormData({...formData, internal: Number(e.target.value)})}
              min="0" max="30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prev Exam Score (%)</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.previous}
              onChange={(e) => setFormData({...formData, previous: Number(e.target.value)})}
              min="0" max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Daily Study Hours</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.study}
              onChange={(e) => setFormData({...formData, study: Number(e.target.value)})}
              min="0" max="24"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
        >
          Run Backend Prediction
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-sm text-blue-600 font-medium mb-1">Prediction Result</p>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-4xl font-bold text-blue-900">{result.score}</span>
              <span className="text-lg text-blue-700 font-medium ml-1">/ 100</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${
              result.category === 'High' ? 'bg-green-100 text-green-700' : 
              result.category === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
            }`}>
              {result.category} Performance
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictorForm;
