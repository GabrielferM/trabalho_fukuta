import { Veiculo } from './Veiculo';
import type { VehicleDTO } from '../types/vehicle';

export class Caminhonete extends Veiculo {
  constructor(data: VehicleDTO) {
    super(data);
  }

  override getDescricaoDiferencial(): string {
    return 'Forca e espaco para carga, aventura e trabalho pesado.';
  }

  override getBadgeTipo(): string {
    return 'Caminhonete';
  }

  override getCardAccentClass(): string {
    return 'accent-caminhonete';
  }

  override getAspectosEspecificos(): string[] {
    return [
      `Potencia: ${this.potenciaCv} cv`,
      `Autonomia: ${this.autonomiaKm} km`,
      'Estrutura robusta para trabalho pesado'
    ];
  }
}
