
import React, { useState, useEffect } from 'react';
import { StudentRecord, ModelMetrics } from './types';
import { generateSampleData, convertToCSV } from './services/dataGenerator';
import { mlEngine } from './services/mlEngine';
import PredictorForm from './components/PredictorForm';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis
} from 'recharts';

const App: React.FC = () => {
  const [data, setData] = useState<StudentRecord[]>([]);
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    const initialData = generateSampleData(100);
    setData(initialData);
  }, []);

  const handleTrainModel = () => {
    setIsTraining(true);
    // Simulate training delay
    setTimeout(() => {
      const results = mlEngine.train(data);
      setMetrics(results);
      setIsTraining(false);
    }, 1500);
  };

  const downloadCSV = () => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
              <h1 className="text-xl font-bold text-gray-800">Student AI Analytics</h1>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={downloadCSV}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 flex items-center gap-1"
              >
                📥 Download CSV
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Intro Section */}
        <div className="mb-8 bg-blue-600 rounded-2xl p-8 text-white shadow-xl shadow-blue-100">
          <h2 className="text-3xl font-bold mb-2">Student Performance Prediction System</h2>
          <p className="text-blue-100 max-w-2xl">
            A real-world implementation of a regression-based machine learning pipeline. 
            This system analyzes historical academic data to forecast future performance with high accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Data & Training */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Visual Insights */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Dataset Insight</h3>
                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-500 rounded uppercase tracking-wider">
                  N = {data.length} Records
                </span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis type="number" dataKey="attendance_percentage" name="Attendance" unit="%" stroke="#94a3b8" />
                    <YAxis type="number" dataKey="final_score" name="Final Score" stroke="#94a3b8" />
                    <ZAxis type="number" dataKey="study_hours" range={[50, 400]} name="Study Hours" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Students" data={data} fill="#3b82f6" fillOpacity={0.6} />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-gray-400 mt-4 italic text-center">
                Scatter Plot: Attendance vs Final Score (Bubble size represents Daily Study Hours)
              </p>
            </div>

            {/* Backend Pipeline Status */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                ⚙️ Backend Machine Learning Pipeline
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Data Preprocessing</h4>
                    <p className="text-sm text-gray-500">Handling missing values and features: Attendance, Internal Scores, and Study Hours.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-700">Model Training</h4>
                    <p className="text-sm text-gray-500 mb-3">Training a Linear Regression model with 80/20 train-test split.</p>
                    <button 
                      onClick={handleTrainModel}
                      disabled={isTraining}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                        isTraining ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-900'
                      }`}
                    >
                      {isTraining ? 'Training in Progress...' : 'Start Model Training'}
                    </button>
                  </div>
                </div>

                {metrics && (
                  <div className="grid grid-cols-2 gap-4 mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">R² Accuracy Score</p>
                      <p className="text-2xl font-mono font-bold text-blue-600">{(metrics.r2_score * 100).toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Mean Absolute Error</p>
                      <p className="text-2xl font-mono font-bold text-orange-600">{metrics.mae}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interaction */}
          <div className="space-y-8">
            <PredictorForm />

            <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Backend Flow (Python)
              </h3>
              <div className="space-y-4 text-sm font-mono text-gray-300">
                <div className="border-l-2 border-gray-700 pl-4 py-1">
                  <p className="text-blue-400"># Step 1: Load</p>
                  <p>df = pd.read_csv('students.csv')</p>
                </div>
                <div className="border-l-2 border-gray-700 pl-4 py-1">
                  <p className="text-blue-400"># Step 2: Split</p>
                  <p>X_train, X_test, y_train, y_test = train_test_split(X, y)</p>
                </div>
                <div className="border-l-2 border-gray-700 pl-4 py-1">
                  <p className="text-blue-400"># Step 3: Train</p>
                  <p>model = LinearRegression().fit(X_train, y_train)</p>
                </div>
                <div className="border-l-2 border-gray-700 pl-4 py-1">
                  <p className="text-blue-400"># Step 4: Evaluate</p>
                  <p>print(r2_score(y_test, preds))</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-xl border border-dashed border-gray-300">
              <h4 className="font-bold text-gray-700 mb-2">Resume Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {['Linear Regression', 'Pandas', 'Data Preprocessing', 'Scikit-Learn', 'Feature Engineering', 'Model Evaluation'].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium border border-blue-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© 2024 AI Student Performance Prediction System - Built for Internship Portfolios</p>
        </div>
      </main>
    </div>
  );
};

export default App;
