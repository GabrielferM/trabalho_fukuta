# Catálogo de Veículos — React + TypeScript

Aplicação de catálogo de veículos com visual profissional, inspirada em marketplaces automotivos, desenvolvida com **React 18**, **TypeScript 5** e **Vite 5**. O projeto demonstra os principais conceitos de **Programação Orientada a Objetos (POO)** aplicados em um front-end moderno.

---

## ✨ Funcionalidades

- **Listagem** de veículos em cards responsivos com imagem, badge de tipo e especificações técnicas
- **Ações por card**: botões de *Atualizar* e *Excluir* exibidos ao passar o mouse
- **Filtros avançados** via painel lateral animado:
  - Busca por nome/modelo
  - Marca
  - Faixa de preço
  - Ano
  - Tipo de veículo (Carro, Moto, Caminhão, Elétrico)
  - Tipo de combustível
  - Câmbio
  - Ordenação por preço (crescente/decrescente)
- **Cadastro** de novo veículo via modal com formulário completo
- **Edição** de veículo existente via modal reutilizável
- **Exclusão** de veículos com atualização imediata do catálogo
- **Persistência local** com `localStorage` (back-end simulado)
- **Sincronização entre abas** via `StorageEvent`

---

## 🧩 POO Aplicada

O projeto demonstra explicitamente os seguintes conceitos de Orientação a Objetos:

| Conceito | Implementação |
|---|---|
| **Classe abstrata** | `Veiculo` — base para todos os tipos de veículo |
| **Métodos abstratos** | `getDescricaoDiferencial()`, `getBadgeTipo()`, `getCardAccentClass()`, `getAspectosEspecificos()` |
| **Herança** | `Carro`, `Moto`, `Caminhao` e `Eletrico` estendem `Veiculo` |
| **Sobrescrita com `override`** | Cada subclasse redefine os métodos abstratos da superclasse |
| **Encapsulamento** | Atributos protegidos com `protected readonly`, expostos via `get` |
| **Instanciação de objetos** | `VehicleRepository.createInstance()` instancia o tipo correto via `switch` |
| **Método concreto compartilhado** | `getNomeCompleto()`, `getBuscaTexto()`, `toDTO()` definidos na superclasse |

### Hierarquia de classes

```
Veiculo (abstract)
├── Carro
├── Moto
├── Caminhao
└── Eletrico
```

---

## 📁 Estrutura de Pastas

```
src/
├── components/
│   ├── AppHeader.tsx           # Cabeçalho da aplicação
│   ├── FilterPanel.tsx         # Painel lateral de filtros animado
│   ├── VehicleCard.tsx         # Card individual com ações de hover
│   ├── VehicleGrid.tsx         # Grid responsivo de cards
│   └── Veiculo-formulario.tsx  # Modal de cadastro e edição
├── data/
│   └── vehiclesSeed.ts         # Dados iniciais da aplicação
├── hooks/                      # Custom hooks React
├── models/
│   ├── Veiculo.ts              # Classe abstrata base
│   ├── Carro.ts                # Subclasse: Carro
│   ├── Moto.ts                 # Subclasse: Moto
│   ├── Caminhao.ts             # Subclasse: Caminhão
│   └── Eletrico.ts             # Subclasse: Elétrico
├── pages/
│   └── CatalogPage.tsx         # Página principal do catálogo
├── services/
│   └── vehicleRepository.ts    # Repositório com CRUD e persistência
├── styles/                     # Estilos globais e por componente
├── types/
│   └── vehicle.ts              # Tipos e interfaces (VehicleDTO, etc.)
└── utils/
    └── formatters.ts           # Funções de formatação (moeda, km, etc.)
```

---

## ▶️ Como rodar

**1. Instalar dependências:**

```bash
npm install
```

**2. Iniciar o servidor de desenvolvimento:**

```bash
npm run dev
```

**3. Build de produção:**

```bash
npm run build
```

**4. Pré-visualizar o build:**

```bash
npm run preview
```

---

## 📝 Observações

- Não utiliza banco de dados real; toda persistência é feita via `localStorage`
- O estado inicial do catálogo vem de `src/data/vehiclesSeed.ts`
- O catálogo é salvo automaticamente após cada operação (adicionar, editar ou excluir)
- A sincronização entre abas do navegador é feita via `StorageEvent`
- Tipos de veículo suportados: `carro`, `moto`, `caminhao`, `eletrico`
- Combustíveis suportados: `flex`, `gasolina`, `diesel`, `eletrico`, `hibrido`
- Câmbios suportados: `manual`, `automatico`, `cvt`
