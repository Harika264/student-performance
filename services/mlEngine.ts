
import { StudentRecord, ModelMetrics, PerformanceCategory } from '../types';

/**
 * Senior Backend Dev Note: 
 * In a real Python environment, we'd use Scikit-Learn:
 * model = LinearRegression().fit(X_train, y_train)
 * Here we simulate that logic for the UI demonstration.
 */

export class StudentPerformanceModel {
  // Coefficients derived from simulated training
  private weights = {
    attendance: 0.21,
    internal: 0.95,
    previous: 0.42,
    study: 1.45,
    intercept: 5.2
  };

  public train(data: StudentRecord[]): ModelMetrics {
    // In a real scenario, this would involve matrix multiplication.
    // For this educational dashboard, we simulate a successful training phase.
    return {
      r2_score: 0.88 + (Math.random() * 0.05),
      mae: 2.1,
      mse: 6.4,
      trained_at: new Date().toISOString()
    };
  }

  public predict(features: Omit<StudentRecord, 'student_id' | 'final_score'>): { score: number; category: PerformanceCategory } {
    const { attendance_percentage, internal_score, previous_exam_score, study_hours } = features;
    
    const score = 
      (attendance_percentage * this.weights.attendance) +
      (internal_score * this.weights.internal) +
      (previous_exam_score * this.weights.previous) +
      (study_hours * this.weights.study) +
      this.weights.intercept;

    const finalScore = Math.min(100, Math.max(0, Math.round(score)));
    
    let category: PerformanceCategory = 'Medium';
    if (finalScore >= 80) category = 'High';
    else if (finalScore < 50) category = 'Low';

    return { score: finalScore, category };
  }
}

export const mlEngine = new StudentPerformanceModel();
