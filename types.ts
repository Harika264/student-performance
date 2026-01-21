
export interface StudentRecord {
  student_id: string;
  attendance_percentage: number;
  internal_score: number;
  previous_exam_score: number;
  study_hours: number;
  final_score: number;
}

export interface ModelMetrics {
  r2_score: number;
  mae: number;
  mse: number;
  trained_at: string;
}

export type PerformanceCategory = 'Low' | 'Medium' | 'High';
