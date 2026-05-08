import type { Veiculo } from '../models/Veiculo';
import {
  formatCurrency,
  formatFuel,
  formatMileage,
  formatTransmission,
  formatAutonomy,
  formatPower
} from '../utils/formatters';

interface VehicleCardProps {
  vehicle: Veiculo;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <article className={`vehicle-card ${vehicle.getCardAccentClass()}`}>
      <div className="vehicle-image-wrap">
        <img src={vehicle.foto} alt={vehicle.getNomeCompleto()} className="vehicle-image" loading="lazy" />
        <span className="type-badge">{vehicle.getBadgeTipo()}</span>
      </div>

      <div className="vehicle-body">
        <h3>{vehicle.getNomeCompleto()}</h3>
        <p className="vehicle-year">Ano {vehicle.ano}</p>
        <p className="vehicle-price">{formatCurrency(vehicle.preco)}</p>
        <p className="vehicle-highlight">{vehicle.getDescricaoDiferencial()}</p>

        <div className="vehicle-specs">
          <span>{formatMileage(vehicle.quilometragem)}</span>
          <span>{formatFuel(vehicle.combustivel)}</span>
          <span>{formatTransmission(vehicle.cambio)}</span>
        </div>

        <div className="vehicle-tech">
          <span>{formatPower(vehicle.potenciaCv)}</span>
          <span>{formatAutonomy(vehicle.autonomiaKm)}</span>
        </div>

        <ul className="vehicle-aspects">
          {vehicle.getAspectosEspecificos().map((aspect) => (
            <li key={aspect}>{aspect}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
