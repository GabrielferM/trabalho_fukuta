interface AppHeaderProps {
  total: number;
  filtered: number;
  onAdd: () => void;
}

export function AppHeader({ total, filtered, onAdd }: AppHeaderProps) {
  return (
    <header className="hero">
      <div>
        <p className="hero-tag">Marketplace de Veiculos</p>
        <h1>Catalogo Premium</h1>
        <p className="hero-subtitle">
          Explore ofertas com visual profissional, filtros avancados e cadastro em tempo real.
        </p>
      </div>

      <div className="hero-actions">
        <div className="stat-box">
          <strong>{filtered}</strong>
          <span>veiculos filtrados</span>
        </div>
        <div className="stat-box">
          <strong>{total}</strong>
          <span>total no catalogo</span>
        </div>
        <button className="btn btn-primary" onClick={onAdd} type="button">
          Adicionar veiculo
        </button>
      </div>
    </header>
  );
}
