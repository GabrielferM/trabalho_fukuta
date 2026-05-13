import type { Veiculo } from '../models/Veiculo';
import { VehicleCard } from './VehicleCard';

interface VehicleGridProps {
  vehicles: Veiculo[];
  onUpdate?: (vehicle: Veiculo) => void;
  onDelete?: (id: string) => void;
}

export function VehicleGrid({ vehicles, onUpdate, onDelete }: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="empty-state">
        <h3>Nenhum veiculo encontrado</h3>
        <p>Ajuste os filtros para ver mais resultados no catalogo.</p>
      </div>
    );
  }

  return (
    <section className="vehicle-grid">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </section>
  );
}
