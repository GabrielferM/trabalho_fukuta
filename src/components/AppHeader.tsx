interface AppHeaderProps {
  total: number;
  filtered: number;
  onAdd: () => void;
}

export function AppHeader({ total, filtered, onAdd }: AppHeaderProps) {
  return (
    <header className="hero">
      <div>
        <h1>Catálogo de veículos</h1>
        <p className="hero-subtitle">
          Explore ofertas e filtros avançados do catalogo de veículos.
        </p>
      </div>

      <div className="hero-actions">
        <div className="stat-box">
          <strong>{filtered}</strong>
          <span>veículos filtrados</span>
        </div>
        <div className="stat-box">
          <strong>{total}</strong>
          <span>total no catálogo</span>
        </div>
        <button className="btn btn-primary" onClick={onAdd} type="button">
          Adicionar veículo
        </button>
      </div>
    </header>
  );
}
