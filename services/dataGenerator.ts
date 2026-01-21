
import { StudentRecord } from '../types';

export const generateSampleData = (count: number = 100): StudentRecord[] => {
  const data: StudentRecord[] = [];
  for (let i = 1; i <= count; i++) {
    const attendance = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    const internal = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
    const previous = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
    const studyHours = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    
    // Linear relationship simulation with some noise
    // final = 0.3*attendance + 0.8*internal + 0.4*previous + 1.2*studyHours + noise
    const noise = (Math.random() - 0.5) * 5;
    let finalScore = (attendance * 0.2) + (internal * 1.0) + (previous * 0.4) + (studyHours * 1.5) + noise;
    
    // Clamp values to realistic ranges
    finalScore = Math.min(100, Math.max(0, Math.round(finalScore)));

    data.push({
      student_id: `STU${1000 + i}`,
      attendance_percentage: attendance,
      internal_score: internal,
      previous_exam_score: previous,
      study_hours: studyHours,
      final_score: finalScore
    });
  }
  return data;
};

export const convertToCSV = (data: StudentRecord[]): string => {
  const headers = "student_id,attendance_percentage,internal_score,previous_exam_score,study_hours,final_score";
  const rows = data.map(s => `${s.student_id},${s.attendance_percentage},${s.internal_score},${s.previous_exam_score},${s.study_hours},${s.final_score}`);
  return [headers, ...rows].join("\n");
};
