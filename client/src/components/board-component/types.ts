export type CardSelectionModalOptions = {
    actionName: string;
    isOpen: boolean;
    cardOptions: Card[];
    cardsSelected?: Card[];
    isRequired: boolean;
    callback: (selectedCards: Card[]) => void;
    selectionLimit: number;
  }