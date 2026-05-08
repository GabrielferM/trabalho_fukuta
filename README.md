# Catalogo de Veiculos - React + TypeScript

Aplicacao de catalogo de veiculos com visual profissional, inspirada em marketplaces automotivos, feita com React + TypeScript + Vite.

## Funcionalidades

- Listagem de veiculos em cards responsivos
- Filtros avancados:
  - busca por nome/modelo
  - marca
  - faixa de preco
  - ano
  - tipo de veiculo
  - combustivel
  - cambio
  - ordenacao por preco
- Cadastro de novo veiculo via modal
- Atualizacao imediata do catalogo apos cadastro
- Persistencia local com `localStorage` (back-end simulado)

## POO Aplicada

O projeto demonstra explicitamente:

- Classe abstrata: `Veiculo`
- Metodo abstrato: `getDescricaoDiferencial`, `getBadgeTipo`, `getCardAccentClass`
- Heranca: `Carro`, `Moto`, `Caminhonete` extendem `Veiculo`
- Sobrescrita com `override` nas classes filhas
- Instanciacao de objetos por factory: `createVehicleInstance`

## Estrutura de Pastas

```txt
src/
  components/
  pages/
  services/
  models/
  hooks/
  utils/
  styles/
  types/
  data/
```

## Como rodar

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar ambiente de desenvolvimento:

```bash
npm run dev
```

3. Build de producao:

```bash
npm run build
```

## Observacoes

- Nao usa banco de dados real
- O estado inicial vem de `src/data/vehiclesSeed.ts`
- O catalogo e salvo automaticamente em `localStorage`
