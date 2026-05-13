import { useMemo, useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { FilterPanel } from '../components/FilterPanel';
import { VehicleGrid } from '../components/VehicleGrid';
import { AddVehicleModal } from '../components/Veiculo-formulario';
import { useVehicles } from '../hooks/useVehicles';
import { useVehicleFilters } from '../hooks/useVehicleFilters';
import { getBrandOptions, getYearOptions } from '../utils/vehicleOptions';
import { Veiculo } from '../models/Veiculo';
import '../styles/catalog.css';

export function CatalogPage() {
  const { vehicles, loading, error, addVehicle, updateVehicle, removeVehicle } = useVehicles();
  const { filters, filteredVehicles, updateFilter, clearFilters } = useVehicleFilters(vehicles);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Veiculo | null>(null);
  const [isFilterOpen, setFilterOpen] = useState(false);

  const brands = useMemo(() => getBrandOptions(vehicles), [vehicles]);
  const years = useMemo(() => getYearOptions(vehicles), [vehicles]);

  const handleEdit = (vehicle: Veiculo) => {
    setEditingVehicle(vehicle);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      await removeVehicle(id);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingVehicle(null);
  };

  const handleModalSubmit = async (input: any) => {
    if (editingVehicle) {
      await updateVehicle(editingVehicle.id, input);
    } else {
      await addVehicle(input);
    }
  };

  return (
    <main className="catalog-page">
      <div className="catalog-layout">
        
        <aside className={`sidebar-wrapper ${isFilterOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-inner">
            <FilterPanel
              filters={filters}
              brands={brands}
              years={years}
              onChange={updateFilter}
              onClear={clearFilters}
            />
          </div>
        </aside>

        <div className="catalog-content">
          <div className="layout-controls">
            <button className="btn btn-ghost toggle-btn" onClick={() => setFilterOpen(!isFilterOpen)}>
              {isFilterOpen ? '← Ocultar Filtros' : '→ Mostrar Filtros'}
            </button>
          </div>

          <AppHeader 
            total={vehicles.length} 
            filtered={filteredVehicles.length} 
            onAdd={() => { setEditingVehicle(null); setModalOpen(true); }} 
          />

          {error && <p className="feedback feedback-error">{error}</p>}
          {loading ? <p className="feedback">Carregando catálogo...</p> : <VehicleGrid vehicles={filteredVehicles} onUpdate={handleEdit} onDelete={handleDelete} />}
        </div>
      </div>

      <AddVehicleModal open={isModalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit} initialData={editingVehicle} />
    </main>
  );
}
