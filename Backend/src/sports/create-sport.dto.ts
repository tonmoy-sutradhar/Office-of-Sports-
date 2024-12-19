export class CreateSportDto {
  name: string;
  type: 'outdoor' | 'indoor';
  price: number;
  maxPlayers: number;
  is_paid: boolean;
}
