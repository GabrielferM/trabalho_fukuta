import type { VehicleDTO } from '../types/vehicle';
import { Veiculo } from './Veiculo';
import { Carro } from './Carro';
import { Moto } from './Moto';
import { Caminhonete } from './Caminhonete';
import { Eletrico } from './Eletrico';

export function createVehicleInstance(data: VehicleDTO): Veiculo {
  switch (data.tipo) {
    case 'carro':
      return new Carro(data);
    case 'moto':
      return new Moto(data);
    case 'caminhonete':
      return new Caminhonete(data);
    case 'eletrico':
      return new Eletrico(data);
    default:
      return new Carro(data);
  }
}
