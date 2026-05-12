import type { NewVehicleInput, VehicleDTO } from '../types/vehicle';
import { Veiculo } from '../models/Veiculo';
import { Carro } from '../models/Carro';
import { Moto } from '../models/Moto';
import { Caminhao } from '../models/Caminhao';
import { Eletrico } from '../models/Eletrico';
import { vehiclesSeed } from '../data/vehiclesSeed';

const STORAGE_KEY = 'trabalho_fukuta_vehicles_v2';
const LEGACY_STORAGE_KEY = 'trabalho_fukuta_vehicles_v1';

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

class VehicleRepository {
  private readonly eventTarget = new EventTarget();
  private readonly changeEvent = 'vehicles-change';

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.onStorageSync);
    }
  }

  private onStorageSync = (event: StorageEvent): void => {
    if (event.key === STORAGE_KEY) {
      this.notify();
    }
  };

  private notify(): void {
    this.eventTarget.dispatchEvent(new Event(this.changeEvent));
  }

  private getDefaultPower(tipo: VehicleDTO['tipo']): number {
    const map: Record<VehicleDTO['tipo'], number> = {
      carro: 120,
      moto: 40,
      caminhao: 350,
      eletrico: 160
    };
    return map[tipo];
  }

  private getDefaultAutonomy(tipo: VehicleDTO['tipo']): number {
    const map: Record<VehicleDTO['tipo'], number> = {
      carro: 650,
      moto: 320,
      caminhao: 1200,
      eletrico: 320
    };
    return map[tipo];
  }

  private normalizeVehicle(item: unknown): VehicleDTO | null {
    if (!item || typeof item !== 'object') {
      return null;
    }

    const candidate = item as Partial<VehicleDTO>;
    const allowedTypes: VehicleDTO['tipo'][] = ['carro', 'moto', 'caminhao', 'eletrico'];
    const allowedFuels: VehicleDTO['combustivel'][] = ['flex', 'gasolina', 'diesel', 'eletrico', 'hibrido'];
    const allowedTransmissions: VehicleDTO['cambio'][] = ['manual', 'automatico', 'cvt'];

    const tipo = allowedTypes.includes(candidate.tipo as VehicleDTO['tipo'])
      ? (candidate.tipo as VehicleDTO['tipo'])
      : 'carro';
    const combustivel = tipo === 'eletrico'
      ? 'eletrico'
      : allowedFuels.includes(candidate.combustivel as VehicleDTO['combustivel'])
        ? (candidate.combustivel as VehicleDTO['combustivel'])
        : 'flex';
    const cambio = allowedTransmissions.includes(candidate.cambio as VehicleDTO['cambio'])
      ? (candidate.cambio as VehicleDTO['cambio'])
      : 'manual';

    if (
      typeof candidate.id !== 'string' ||
      typeof candidate.foto !== 'string' ||
      typeof candidate.marca !== 'string' ||
      typeof candidate.modelo !== 'string' ||
      typeof candidate.ano !== 'number' ||
      typeof candidate.quilometragem !== 'number' ||
      typeof candidate.preco !== 'number'
    ) {
      return null;
    }

    return {
      id: candidate.id,
      foto: candidate.foto,
      marca: candidate.marca,
      modelo: candidate.modelo,
      ano: candidate.ano,
      quilometragem: candidate.quilometragem,
      preco: candidate.preco,
      potenciaCv:
        typeof candidate.potenciaCv === 'number' ? candidate.potenciaCv : this.getDefaultPower(tipo),
      autonomiaKm:
        typeof candidate.autonomiaKm === 'number'
          ? candidate.autonomiaKm
          : this.getDefaultAutonomy(tipo),
      bateriaKwh: typeof candidate.bateriaKwh === 'number' ? candidate.bateriaKwh : undefined,
      tempoRecargaHoras:
        typeof candidate.tempoRecargaHoras === 'number' ? candidate.tempoRecargaHoras : undefined,
      capacidadeCargaToneladas: typeof candidate.capacidadeCargaToneladas === 'number' ? candidate.capacidadeCargaToneladas : undefined,
      eixos: typeof candidate.eixos === 'number' ? candidate.eixos : undefined,
      combustivel,
      tipo,
      cambio
    };
  }

  private readStorage(key = STORAGE_KEY): VehicleDTO[] {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return [];
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.map((item) => this.normalizeVehicle(item)).filter((item): item is VehicleDTO => item !== null);
    } catch {
      return [];
    }
  }

  private writeStorage(data: VehicleDTO[], key = STORAGE_KEY): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private ensureSeedData(): void {
    const existing = this.readStorage(STORAGE_KEY);
    if (existing.length === 0) {
      const legacy = this.readStorage(LEGACY_STORAGE_KEY);
      if (legacy.length > 0) {
        this.writeStorage(legacy, STORAGE_KEY);
        localStorage.removeItem(LEGACY_STORAGE_KEY);
        return;
      }

      this.writeStorage(vehiclesSeed, STORAGE_KEY);
      return;
    }

    // Regrava dados normalizados no schema mais atual
    this.writeStorage(existing, STORAGE_KEY);
  }

  private createInstance(data: VehicleDTO): Veiculo {
    switch (data.tipo) {
      case 'carro':
        // PONTO DE APRESENTAÇÃO: Aqui demonstramos a INSTANCIAÇÃO DE OBJETOS usando a palavra reservada 'new'.
        // Estamos criando um OBJETO real em memória a partir da nossa classe 'Carro'.
        return new Carro(data);
      case 'moto':
        return new Moto(data);
      case 'caminhao':
        return new Caminhao(data);
      case 'eletrico':
        return new Eletrico(data);
      default:
        return new Carro(data);
    }
  }

  async list() {
    this.ensureSeedData();
    await wait(140);
    return this.readStorage().map(item => this.createInstance(item));
  }

  async add(input: NewVehicleInput) {
    this.ensureSeedData();
    const data = this.readStorage();

    const created: VehicleDTO = {
      id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.round(Math.random() * 1000)}`,
      ...input
    };

    data.unshift(created);
    this.writeStorage(data);
    this.notify();
    await wait(140);

    return this.createInstance(created);
  }

  subscribe(listener: () => void): () => void {
    const handler = () => listener();
    this.eventTarget.addEventListener(this.changeEvent, handler);

    return () => {
      this.eventTarget.removeEventListener(this.changeEvent, handler);
    };
  }
}

export const vehicleRepository = new VehicleRepository();
