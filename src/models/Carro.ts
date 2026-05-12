import { Veiculo } from './Veiculo';
import type { VehicleDTO } from '../types/vehicle';

// PONTO DE APRESENTAÇÃO: Aqui demonstramos o conceito de HERANÇA.
// A classe 'Carro' herda (estende) da classe abstrata 'Veiculo', ganhando todos os seus atributos e métodos.
export class Carro extends Veiculo {
  constructor(data: VehicleDTO) {
    super(data);
  }

  // PONTO DE APRESENTAÇÃO: Exemplo de SOBRESCRITA DE MÉTODO (OVERRIDE).
  // Estamos implementando e personalizando o comportamento do método abstrato que foi definido na classe mãe ('Veiculo').
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
