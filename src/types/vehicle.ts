export type VehicleType = 'carro' | 'moto' | 'caminhonete' | 'eletrico';

export type FuelType = 'flex' | 'gasolina' | 'diesel' | 'eletrico' | 'hibrido';

export type TransmissionType = 'manual' | 'automatico' | 'cvt';

export interface VehicleDTO {
  id: string;
  foto: string;
  marca: string;
  modelo: string;
  ano: number;
  quilometragem: number;
  preco: number;
  potenciaCv: number;
  autonomiaKm: number;
  bateriaKwh?: number;
  tempoRecargaHoras?: number;
  combustivel: FuelType;
  tipo: VehicleType;
  cambio: TransmissionType;
}

export type NewVehicleInput = Omit<VehicleDTO, 'id'>;
