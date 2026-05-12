import type { FuelType, TransmissionType, VehicleType } from '../types/vehicle';
import type { VehicleFilters } from '../types/filters';

interface FilterPanelProps {
  filters: VehicleFilters;
  brands: string[];
  years: number[];
  onChange: <K extends keyof VehicleFilters>(key: K, value: VehicleFilters[K]) => void;
  onClear: () => void;
}

const fuelOptions: FuelType[] = ['flex', 'gasolina', 'diesel', 'eletrico', 'hibrido'];
const typeOptions: VehicleType[] = ['carro', 'moto', 'caminhao', 'eletrico'];
const transmissionOptions: TransmissionType[] = ['manual', 'automatico', 'cvt'];

export function FilterPanel({ filters, brands, years, onChange, onClear }: FilterPanelProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Filtros avançados</h2>
        <button className="btn btn-ghost" type="button" onClick={onClear}>
          Limpar filtros
        </button>
      </div>

      <div className="sidebar-grid">
        <label>
          Buscar nome/modelo
          <input
            type="text"
            placeholder="Ex: Corolla"
            value={filters.search}
            onChange={(event) => onChange('search', event.target.value)}
          />
        </label>

        <label>
          Marca
          <select value={filters.brand} onChange={(event) => onChange('brand', event.target.value)}>
            <option value="">Todas</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>

        <label>
          Preço mínimo
          <input
            type="number"
            min={0}
            placeholder="0"
            value={filters.minPrice}
            onChange={(event) => onChange('minPrice', event.target.value)}
          />
        </label>

        <label>
          Preço máximo
          <input
            type="number"
            min={0}
            placeholder="300000"
            value={filters.maxPrice}
            onChange={(event) => onChange('maxPrice', event.target.value)}
          />
        </label>

        <label>
          Ano
          <select value={filters.year} onChange={(event) => onChange('year', event.target.value)}>
            <option value="">Todos</option>
            {years.map((year) => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tipo
          <select value={filters.type} onChange={(event) => onChange('type', event.target.value as VehicleType | '')}>
            <option value="">Todos</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          Combustível
          <select value={filters.fuel} onChange={(event) => onChange('fuel', event.target.value as FuelType | '')}>
            <option value="">Todos</option>
            {fuelOptions.map((fuel) => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </label>

        <label>
          Câmbio
          <select
            value={filters.transmission}
            onChange={(event) => onChange('transmission', event.target.value as TransmissionType | '')}
          >
            <option value="">Todos</option>
            {transmissionOptions.map((transmission) => (
              <option key={transmission} value={transmission}>
                {transmission}
              </option>
            ))}
          </select>
        </label>

        <label>
          Ordenar por preço
          <select
            value={filters.sortPrice}
            onChange={(event) => onChange('sortPrice', event.target.value as VehicleFilters['sortPrice'])}
          >
            <option value="none">Padrão</option>
            <option value="asc">Menor para maior</option>
            <option value="desc">Maior para menor</option>
          </select>
        </label>

        <button className="btn btn-ghost" type="button" onClick={onClear} style={{ marginTop: '0.5rem' }}>
          Limpar todos os filtros
        </button>
      </div>
    </section>
  );
}
