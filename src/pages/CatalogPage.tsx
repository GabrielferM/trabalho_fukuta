import { useMemo, useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { FilterPanel } from '../components/FilterPanel';
import { VehicleGrid } from '../components/VehicleGrid';
import { AddVehicleModal } from '../components/AddVehicleModal';
import { useVehicles } from '../hooks/useVehicles';
import { useVehicleFilters } from '../hooks/useVehicleFilters';
import { getBrandOptions, getYearOptions } from '../utils/vehicleOptions';
import '../styles/catalog.css';

export function CatalogPage() {
  const { vehicles, loading, error, addVehicle } = useVehicles();
  const { filters, filteredVehicles, updateFilter, clearFilters } = useVehicleFilters(vehicles);
  const [isModalOpen, setModalOpen] = useState(false);

  const brands = useMemo(() => getBrandOptions(vehicles), [vehicles]);
  const years = useMemo(() => getYearOptions(vehicles), [vehicles]);

  return (
    <main className="catalog-page">
      <div className="catalog-container">
        <AppHeader total={vehicles.length} filtered={filteredVehicles.length} onAdd={() => setModalOpen(true)} />

        <FilterPanel
          filters={filters}
          brands={brands}
          years={years}
          onChange={updateFilter}
          onClear={clearFilters}
        />

        {error && <p className="feedback feedback-error">{error}</p>}
        {loading ? <p className="feedback">Carregando catalogo...</p> : <VehicleGrid vehicles={filteredVehicles} />}
      </div>

      <AddVehicleModal open={isModalOpen} onClose={() => setModalOpen(false)} onSubmit={addVehicle} />
    </main>
  );
}
