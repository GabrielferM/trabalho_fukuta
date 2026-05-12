import { Veiculo } from './Veiculo';
import type { VehicleDTO } from '../types/vehicle';

export class Caminhao extends Veiculo {
  constructor(data: VehicleDTO) {
    super(data);
  }

  override getDescricaoDiferencial(): string {
    return 'Veículo de grande porte focado no transporte de cargas.';
  }

  override getBadgeTipo(): string {
    return 'Caminhão';
  }

  override getCardAccentClass(): string {
    return 'accent-caminhao';
  }

  override getAspectosEspecificos(): string[] {
    const carga = this.data.capacidadeCargaToneladas ? `Carga: ${this.data.capacidadeCargaToneladas} t` : 'Capacidade de carga elevada';
    const eixos = this.data.eixos ? `Eixos: ${this.data.eixos}` : 'Eixos duplos/triplos';

    return [
      `Potência: ${this.potenciaCv} cv`,
      `Autonomia: ${this.autonomiaKm} km`,
      carga,
      eixos
    ];
  }
}
