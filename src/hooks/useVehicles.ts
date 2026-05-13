import { useCallback, useEffect, useState } from 'react';
import type { NewVehicleInput } from '../types/vehicle';
import { Veiculo } from '../models/Veiculo';
import { vehicleRepository } from '../services/vehicleRepository';

interface UseVehiclesResult {
  vehicles: Veiculo[];
  loading: boolean;
  error: string;
  addVehicle: (vehicle: NewVehicleInput) => Promise<void>;
  updateVehicle: (id: string, vehicle: Partial<NewVehicleInput>) => Promise<void>;
  removeVehicle: (id: string) => Promise<void>;
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

  const updateVehicle = useCallback(async (id: string, vehicle: Partial<NewVehicleInput>) => {
    try {
      setError('');
      await vehicleRepository.update(id, vehicle);
      const refreshed = await vehicleRepository.list();
      setVehicles(refreshed);
    } catch {
      setError('Nao foi possivel atualizar o veiculo.');
    }
  }, []);

  const removeVehicle = useCallback(async (id: string) => {
    try {
      setError('');
      await vehicleRepository.remove(id);
      const refreshed = await vehicleRepository.list();
      setVehicles(refreshed);
    } catch {
      setError('Nao foi possivel remover o veiculo.');
    }
  }, []);

  useEffect(() => {
    void loadVehicles();

    const unsubscribe = vehicleRepository.subscribe(() => {
      void loadVehicles();
    });

    return unsubscribe;
  }, [loadVehicles]);

  return { vehicles, loading, error, addVehicle, updateVehicle, removeVehicle };
}
