export class CreateSportDto {
  name: string;
  type: 'outdoor' | 'indoor';
  is_paid: boolean;
}
