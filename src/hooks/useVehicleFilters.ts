import { useMemo, useState } from 'react';
import type { VehicleFilters } from '../types/filters';
import type { Veiculo } from '../models/Veiculo';

const initialFilters: VehicleFilters = {
  search: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  year: '',
  type: '',
  fuel: '',
  transmission: '',
  sortPrice: 'none'
};

export function useVehicleFilters(vehicles: Veiculo[]) {
  const [filters, setFilters] = useState<VehicleFilters>(initialFilters);

  const filteredVehicles = useMemo(() => {
    const minPrice = Number(filters.minPrice) || 0;
    const maxPrice = Number(filters.maxPrice) || Number.MAX_SAFE_INTEGER;

    const result = vehicles.filter((vehicle) => {
      const matchesSearch =
        filters.search.trim() === '' ||
        vehicle.getBuscaTexto().includes(filters.search.trim().toLowerCase());
      const matchesBrand = filters.brand === '' || vehicle.marca === filters.brand;
      const matchesYear = filters.year === '' || String(vehicle.ano) === filters.year;
      const matchesType = filters.type === '' || vehicle.tipo === filters.type;
      const matchesFuel = filters.fuel === '' || vehicle.combustivel === filters.fuel;
      const matchesTransmission =
        filters.transmission === '' || vehicle.cambio === filters.transmission;
      const matchesPrice = vehicle.preco >= minPrice && vehicle.preco <= maxPrice;

      return (
        matchesSearch &&
        matchesBrand &&
        matchesYear &&
        matchesType &&
        matchesFuel &&
        matchesTransmission &&
        matchesPrice
      );
    });

    if (filters.sortPrice === 'none') {
      return result;
    }

    return [...result].sort((a, b) =>
      filters.sortPrice === 'asc' ? a.preco - b.preco : b.preco - a.preco
    );
  }, [vehicles, filters]);

  const updateFilter = <K extends keyof VehicleFilters>(key: K, value: VehicleFilters[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    filteredVehicles,
    updateFilter,
    clearFilters
  };
}
