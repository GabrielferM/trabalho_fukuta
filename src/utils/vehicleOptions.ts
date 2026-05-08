import type { Veiculo } from '../models/Veiculo';

export function getBrandOptions(vehicles: Veiculo[]): string[] {
  return [...new Set(vehicles.map((item) => item.marca))].sort((a, b) =>
    a.localeCompare(b, 'pt-BR')
  );
}

export function getYearOptions(vehicles: Veiculo[]): number[] {
  return [...new Set(vehicles.map((item) => item.ano))].sort((a, b) => b - a);
}
