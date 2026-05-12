import type { VehicleDTO } from '../types/vehicle';

// PONTO DE APRESENTAÇÃO: Aqui demonstramos a criação de uma CLASSE e de uma CLASSE ABSTRATA.
// Ela serve de molde (com atributos e métodos) para outras classes, mas não pode ser instanciada diretamente.
export abstract class Veiculo {
  protected readonly data: VehicleDTO;

  protected constructor(data: VehicleDTO) {
    this.data = data;
  }

  get id(): string {
    return this.data.id;
  }

  get foto(): string {
    return this.data.foto;
  }

  get marca(): string {
    return this.data.marca;
  }

  get modelo(): string {
    return this.data.modelo;
  }

  get ano(): number {
    return this.data.ano;
  }

  get quilometragem(): number {
    return this.data.quilometragem;
  }

  get preco(): number {
    return this.data.preco;
  }

  get potenciaCv(): number {
    return this.data.potenciaCv;
  }

  get autonomiaKm(): number {
    return this.data.autonomiaKm;
  }

  get bateriaKwh(): number | undefined {
    return this.data.bateriaKwh;
  }

  get tempoRecargaHoras(): number | undefined {
    return this.data.tempoRecargaHoras;
  }

  get combustivel(): VehicleDTO['combustivel'] {
    return this.data.combustivel;
  }

  get tipo(): VehicleDTO['tipo'] {
    return this.data.tipo;
  }

  get cambio(): VehicleDTO['cambio'] {
    return this.data.cambio;
  }

  // PONTO DE APRESENTAÇÃO: Exemplo de um MÉTODO comum que será herdado por todas as classes filhas.
  getNomeCompleto(): string {
    return `${this.marca} ${this.modelo}`;
  }

  getBuscaTexto(): string {
    return `${this.marca} ${this.modelo}`.toLowerCase();
  }

  // PONTO DE APRESENTAÇÃO: Aqui temos um MÉTODO ABSTRATO.
  // Ele obriga que qualquer classe que herde de Veiculo (filha) implemente sua própria versão (comportamento) deste método.
  abstract getDescricaoDiferencial(): string;

  abstract getBadgeTipo(): string;

  abstract getCardAccentClass(): string;

  abstract getAspectosEspecificos(): string[];

  toDTO(): VehicleDTO {
    return { ...this.data };
  }
}
