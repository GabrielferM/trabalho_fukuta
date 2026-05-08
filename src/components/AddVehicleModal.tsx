import { useMemo, useState, type FormEvent } from 'react';
import type { FuelType, NewVehicleInput, TransmissionType, VehicleType } from '../types/vehicle';

interface AddVehicleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (vehicle: NewVehicleInput) => Promise<void>;
}

type FormValues = {
  foto: string;
  marca: string;
  modelo: string;
  ano: string;
  quilometragem: string;
  preco: string;
  potenciaCv: string;
  autonomiaKm: string;
  bateriaKwh: string;
  tempoRecargaHoras: string;
  combustivel: FuelType;
  tipo: VehicleType;
  cambio: TransmissionType;
};

const initialValues: FormValues = {
  foto: '',
  marca: '',
  modelo: '',
  ano: '',
  quilometragem: '',
  preco: '',
  potenciaCv: '',
  autonomiaKm: '',
  bateriaKwh: '',
  tempoRecargaHoras: '',
  combustivel: 'flex',
  tipo: 'carro',
  cambio: 'manual'
};

export function AddVehicleModal({ open, onClose, onSubmit }: AddVehicleModalProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [submitting, setSubmitting] = useState(false);

  const isElectricType = values.tipo === 'eletrico';

  const isFormValid = useMemo(() => {
    const baseIsValid =
      values.foto.trim() !== '' &&
      values.marca.trim() !== '' &&
      values.modelo.trim() !== '' &&
      Number(values.ano) > 1900 &&
      Number(values.quilometragem) >= 0 &&
      Number(values.preco) > 0 &&
      Number(values.potenciaCv) > 0 &&
      Number(values.autonomiaKm) > 0;

    if (!baseIsValid) {
      return false;
    }

    if (!isElectricType) {
      return true;
    }

    return Number(values.bateriaKwh) > 0 && Number(values.tempoRecargaHoras) > 0;
  }, [values, isElectricType]);

  if (!open) {
    return null;
  }

  const updateField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => {
      if (key === 'tipo' && value === 'eletrico') {
        return {
          ...prev,
          tipo: 'eletrico',
          combustivel: 'eletrico',
          cambio: 'automatico'
        };
      }

      return {
        ...prev,
        [key]: value
      };
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    setSubmitting(true);

    const payload: NewVehicleInput = {
      foto: values.foto.trim(),
      marca: values.marca.trim(),
      modelo: values.modelo.trim(),
      ano: Number(values.ano),
      quilometragem: Number(values.quilometragem),
      preco: Number(values.preco),
      potenciaCv: Number(values.potenciaCv),
      autonomiaKm: Number(values.autonomiaKm),
      bateriaKwh: isElectricType ? Number(values.bateriaKwh) : undefined,
      tempoRecargaHoras: isElectricType ? Number(values.tempoRecargaHoras) : undefined,
      combustivel: isElectricType ? 'eletrico' : values.combustivel,
      tipo: values.tipo,
      cambio: values.cambio
    };

    try {
      await onSubmit(payload);
      setValues(initialValues);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">
          <h2>Adicionar veiculo</h2>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Fechar
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            URL da foto
            <input
              type="url"
              required
              placeholder="https://..."
              value={values.foto}
              onChange={(event) => updateField('foto', event.target.value)}
            />
          </label>

          <label>
            Marca
            <input
              type="text"
              required
              value={values.marca}
              onChange={(event) => updateField('marca', event.target.value)}
            />
          </label>

          <label>
            Modelo
            <input
              type="text"
              required
              value={values.modelo}
              onChange={(event) => updateField('modelo', event.target.value)}
            />
          </label>

          <label>
            Ano
            <input
              type="number"
              min={1900}
              max={2100}
              required
              value={values.ano}
              onChange={(event) => updateField('ano', event.target.value)}
            />
          </label>

          <label>
            Quilometragem
            <input
              type="number"
              min={0}
              required
              value={values.quilometragem}
              onChange={(event) => updateField('quilometragem', event.target.value)}
            />
          </label>

          <label>
            Preco
            <input
              type="number"
              min={1}
              required
              value={values.preco}
              onChange={(event) => updateField('preco', event.target.value)}
            />
          </label>

          <label>
            Potencia (cv)
            <input
              type="number"
              min={1}
              required
              value={values.potenciaCv}
              onChange={(event) => updateField('potenciaCv', event.target.value)}
            />
          </label>

          <label>
            Autonomia (km)
            <input
              type="number"
              min={1}
              required
              value={values.autonomiaKm}
              onChange={(event) => updateField('autonomiaKm', event.target.value)}
            />
          </label>

          {isElectricType && (
            <>
              <label>
                Bateria (kWh)
                <input
                  type="number"
                  min={1}
                  required
                  value={values.bateriaKwh}
                  onChange={(event) => updateField('bateriaKwh', event.target.value)}
                />
              </label>

              <label>
                Tempo de recarga (h)
                <input
                  type="number"
                  min={0.1}
                  step={0.1}
                  required
                  value={values.tempoRecargaHoras}
                  onChange={(event) => updateField('tempoRecargaHoras', event.target.value)}
                />
              </label>
            </>
          )}

          <label>
            Tipo
            <select value={values.tipo} onChange={(event) => updateField('tipo', event.target.value as VehicleType)}>
              <option value="carro">Carro</option>
              <option value="moto">Moto</option>
              <option value="caminhonete">Caminhonete</option>
              <option value="eletrico">Eletrico</option>
            </select>
          </label>

          <label>
            Combustivel
            <select
              value={values.combustivel}
              disabled={isElectricType}
              onChange={(event) => updateField('combustivel', event.target.value as FuelType)}
            >
              <option value="flex">Flex</option>
              <option value="gasolina">Gasolina</option>
              <option value="diesel">Diesel</option>
              <option value="eletrico">Eletrico</option>
              <option value="hibrido">Hibrido</option>
            </select>
          </label>

          <label>
            Cambio
            <select
              value={values.cambio}
              onChange={(event) => updateField('cambio', event.target.value as TransmissionType)}
            >
              <option value="manual">Manual</option>
              <option value="automatico">Automatico</option>
              <option value="cvt">CVT</option>
            </select>
          </label>

          <button type="submit" className="btn btn-primary" disabled={!isFormValid || submitting}>
            {submitting ? 'Salvando...' : 'Salvar veiculo'}
          </button>
        </form>
      </div>
    </div>
  );
}
