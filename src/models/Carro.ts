import { Veiculo } from './Veiculo';
import type { VehicleDTO } from '../types/vehicle';

// HERANÇA
export class Carro extends Veiculo {
  constructor(data: VehicleDTO) {
    super(data);
  }

  // SOBRESCRITA DE MÉTODOS (OVERRIDE)
  override getDescricaoDiferencial(): string {
    return 'Conforto e equilibrio para uso urbano e rodoviario.';
  }

  override getBadgeTipo(): string {
    return 'Carro';
  }

  override getCardAccentClass(): string {
    return 'accent-carro';
  }

  override getAspectosEspecificos(): string[] {
    return [
      `Potencia: ${this.potenciaCv} cv`,
      `Autonomia: ${this.autonomiaKm} km`,
      'Foco em conforto e uso familiar'
    ];
  }
}
