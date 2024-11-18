import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { HealthData, ActivityDistribution, COLORS, generateHealthData, generateActivityDistribution } from './utils/mockData';

const App = () => {
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [activityDistribution, setActivityDistribution] = useState<ActivityDistribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setHealthData(generateHealthData(7));
      setActivityDistribution(generateActivityDistribution());
      setLoading(false);
    }, 1000);
  }, []);

  const currentHealth = healthData[healthData.length - 1];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-lg font-semibold text-gray-600">Loading your health data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">HealthSync</h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Sync Data
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Health Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Health Score</h2>
            <div className="flex items-center">
              <div className="text-4xl font-bold text-blue-600">{currentHealth?.score}</div>
              <div className="ml-2 text-gray-500">/100</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Daily Steps</h2>
            <div className="text-3xl font-bold text-green-600">
              {currentHealth?.steps.toLocaleString()}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Calories</h2>
            <div className="text-3xl font-bold text-orange-600">
              {currentHealth?.calories} kcal
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Sleep</h2>
            <div className="text-3xl font-bold text-indigo-600">
              {currentHealth?.sleepHours}h
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Health Trends */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Weekly Health Trends</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="steps" stroke="#0088FE" name="Steps" />
                  <Line type="monotone" dataKey="score" stroke="#00C49F" name="Health Score" />
                  <Line type="monotone" dataKey="heartRate" stroke="#FF8042" name="Heart Rate" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Activity Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {activityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">AI Recommendations</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="font-medium text-blue-800">Daily Goal Progress</h3>
              <p className="text-blue-600">
                You're 2,000 steps away from your daily goal. A 15-minute walk could help you reach it!
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-md">
              <h3 className="font-medium text-green-800">Sleep Insight</h3>
              <p className="text-green-600">
                Your sleep pattern has been consistent. Keep maintaining your 10 PM bedtime routine.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-md">
              <h3 className="font-medium text-orange-800">Exercise Suggestion</h3>
              <p className="text-orange-600">
                Based on your activity pattern, consider adding a cardio session to balance your workout routine.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
