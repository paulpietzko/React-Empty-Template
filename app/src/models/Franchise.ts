export interface Franchise {
  Id: number;
  Name: string;
  City: string;
  Championships: number;
  Logo: string;
  Website?: string;
  Color: string;
  Conference: 'East' | 'West';
  Stadium: string;
}