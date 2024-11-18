export interface HealthData {
  date: string;
  steps: number;
  calories: number;
  score: number;
  sleepHours: number;
  heartRate: number;
}

export interface ActivityDistribution {
  name: string;
  value: number;
}

export const ACTIVITY_TYPES = ['Walking', 'Running', 'Cycling', 'Exercise'];
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const generateHealthData = (days: number): HealthData[] => {
  const data: HealthData[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.unshift({
      date: date.toLocaleDateString(),
      steps: Math.floor(Math.random() * 5000 + 3000),
      calories: Math.floor(Math.random() * 300 + 200),
      score: Math.floor(Math.random() * 20 + 70),
      sleepHours: Number((Math.random() * 2 + 6).toFixed(1)),
      heartRate: Math.floor(Math.random() * 20 + 60)
    });
  }
  
  return data;
};

export const generateActivityDistribution = (): ActivityDistribution[] => {
  return ACTIVITY_TYPES.map(type => ({
    name: type,
    value: Math.floor(Math.random() * 100)
  }));
};
