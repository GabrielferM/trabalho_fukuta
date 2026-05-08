import { Veiculo } from './Veiculo';
import type { VehicleDTO } from '../types/vehicle';

export class Eletrico extends Veiculo {
  constructor(data: VehicleDTO) {
    super(data);
  }

  override getDescricaoDiferencial(): string {
    return 'Tecnologia limpa com torque imediato e silencioso.';
  }

  override getBadgeTipo(): string {
    return 'Eletrico';
  }

  override getCardAccentClass(): string {
    return 'accent-eletrico';
  }

  override getAspectosEspecificos(): string[] {
    const bateria = this.bateriaKwh ? `Bateria: ${this.bateriaKwh} kWh` : 'Bateria de alta eficiencia';
    const recarga = this.tempoRecargaHoras
      ? `Recarga: ${this.tempoRecargaHoras.toFixed(1)} h`
      : 'Recarga rapida disponivel';

    return [
      `Potencia: ${this.potenciaCv} cv`,
      `Autonomia: ${this.autonomiaKm} km`,
      bateria,
      recarga
    ];
  }
}
