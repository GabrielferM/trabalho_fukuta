export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
}

export function formatMileage(value: number): string {
  return `${new Intl.NumberFormat('pt-BR').format(value)} km`;
}

export function formatPower(value: number): string {
  return `${new Intl.NumberFormat('pt-BR').format(value)} cv`;
}

export function formatAutonomy(value: number): string {
  return `${new Intl.NumberFormat('pt-BR').format(value)} km autonomia`;
}

export function formatFuel(value: string): string {
  const map: Record<string, string> = {
    flex: 'Flex',
    gasolina: 'Gasolina',
    diesel: 'Diesel',
    eletrico: 'Eletrico',
    hibrido: 'Hibrido'
  };

  return map[value] ?? value;
}

export function formatTransmission(value: string): string {
  const map: Record<string, string> = {
    manual: 'Manual',
    automatico: 'Automatico',
    cvt: 'CVT'
  };

  return map[value] ?? value;
}
