# Rubrica Telefonica React + TypeScript

Un esempio "standalone" di applicazione React per la gestione di contatti, scritta interamente in TypeScript con Functional Components e Hooks.

## Struttura del Progetto

```
src/
  ├── components/
  │    ├── ContactForm.tsx  # Form per creazione/modifica
  │    ├── ContactItem.tsx  # Singola riga della lista
  │    └── ContactList.tsx  # Lista contatti
  ├── App.tsx               # Logica principale e stato
  ├── index.css             # Stili base
  ├── types.ts              # Interfacce TypeScript condivise
  └── utils.ts              # Generazione dati fittizi
```

## Flusso dei Dati (Data Flow)

Il flusso dei dati è **unidirezionale (One-Way Data Flow)**, tipico di React:

1.  **Stato Centrale**: Lo stato `contacts` risiede in `App.tsx`.
2.  **Props Down**: La lista dei contatti passa a `ContactList` -> `ContactItem`.
3.  **Events Up**: Le azioni (delete, edit) risalgono tramite callback (`onDelete`, `onEdit`) da `ContactItem` fino a `App.tsx`, dove viene aggiornato lo stato.

## Gestione dello Stato

-   Usiamo `useState` in `App.tsx` per:
    -   L'elenco dei contatti (`contacts`).
    -   L'ID del contatto in modifica (`editingId`).
    -   La visibilità del form di creazione (`isCreating`).
-   `ContactForm` ha un suo **stato locale** per gestire gli input dell'utente prima dell'invio.

## TypeScript: Benefici in questo progetto

1.  **Interfacce Condivise**: L'interfaccia `Contact` in `types.ts` assicura che un "contatto" abbia sempre la stessa forma in tutta l'applicazione.
2.  **Prop Types Sicure**: Definendo `interface Props` per ogni componente, è impossibile passare props sbagliate o dimenticarne alcune (es. dimenticare `onDelete` in `ContactItem` genererebbe un errore di compilazione).
3.  **Event Handling**: TypeScript aiuta a tipizzare correttamente gli eventi dei form (`ChangeEvent<HTMLInputElement>`, `FormEvent`), offrendo autocompletamento e prevenendo errori comuni.
4.  **Refactoring Sicuro**: Se decidessimo di cambiare `phone` da `string` a `number`, TypeScript segnalerebbe immediatamente tutti i punti del codice da aggiornare.
