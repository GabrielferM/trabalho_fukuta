import type { FuelType, TransmissionType, VehicleType } from './vehicle';

export type PriceSort = 'none' | 'asc' | 'desc';

export interface VehicleFilters {
  search: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  year: string;
  type: VehicleType | '';
  fuel: FuelType | '';
  transmission: TransmissionType | '';
  sortPrice: PriceSort;
}
