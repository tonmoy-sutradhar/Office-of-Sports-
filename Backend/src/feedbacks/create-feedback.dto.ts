export class CreateFeedbackDto {
  comment: string;
  rating: number;
  sport: number; // sport_id (foreign key)
  student: number; // student_id (foreign key)
}
