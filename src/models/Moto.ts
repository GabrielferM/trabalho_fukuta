import { Veiculo } from './Veiculo';
import type { VehicleDTO } from '../types/vehicle';

export class Moto extends Veiculo {
  constructor(data: VehicleDTO) {
    super(data);
  }

  override getDescricaoDiferencial(): string {
    return 'Mobilidade agil com excelente custo de manutencao.';
  }

  override getBadgeTipo(): string {
    return 'Moto';
  }

  override getCardAccentClass(): string {
    return 'accent-moto';
  }

  override getAspectosEspecificos(): string[] {
    return [
      `Potencia: ${this.potenciaCv} cv`,
      `Autonomia: ${this.autonomiaKm} km`,
      'Agilidade para cidade e deslocamentos rapidos'
    ];
  }
}
