import { useCallback, useEffect, useState } from 'react';
import type { NewVehicleInput } from '../types/vehicle';
import { Veiculo } from '../models/Veiculo';
import { vehicleRepository } from '../services/vehicleRepository';

interface UseVehiclesResult {
  vehicles: Veiculo[];
  loading: boolean;
  error: string;
  addVehicle: (vehicle: NewVehicleInput) => Promise<void>;
}

export function useVehicles(): UseVehiclesResult {
  const [vehicles, setVehicles] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadVehicles = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const list = await vehicleRepository.list();
      setVehicles(list);
    } catch {
      setError('Nao foi possivel carregar o catalogo.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addVehicle = useCallback(async (vehicle: NewVehicleInput) => {
    try {
      setError('');
      await vehicleRepository.add(vehicle);
      const refreshed = await vehicleRepository.list();
      setVehicles(refreshed);
    } catch {
      setError('Nao foi possivel adicionar o veiculo.');
    }
  }, []);

  useEffect(() => {
    void loadVehicles();

    const unsubscribe = vehicleRepository.subscribe(() => {
      void loadVehicles();
    });

    return unsubscribe;
  }, [loadVehicles]);

  return { vehicles, loading, error, addVehicle };
}
