import { CENTS_IN_DOLLAR } from '../../../shared/constants';
import { createSpan } from '../../../utils/create-elements/create-tags';

export const totalCostComponent = createTotalCost();

function createTotalCost(): {
  setCost: (value: number) => void;
  getComponent: (value?: number) => HTMLSpanElement;
} {
  const totalCost = createSpan({
    classes: ['text-xl'],
  });

  function setCost(value: number): void {
    totalCost.textContent = `Total to be paid: ${value / CENTS_IN_DOLLAR} $`;
  }

  function getComponent(value?: number): HTMLSpanElement {
    if (value) {
      setCost(value);
    }
    return totalCost;
  }

  return { setCost, getComponent };
}
