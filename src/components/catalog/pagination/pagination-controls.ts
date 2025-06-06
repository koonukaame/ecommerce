import { queryState } from '../../../app/state/query-state';
import { createDiv, createButton } from '../../../utils/create-elements/create-tags';
import { applyQuery } from '../../../utils/apply-query/apply-query';
import { PAGINATION } from '../../../pages/catalog/constants';
import { CustomEventEmitter } from '../../../utils/event-emitter';
import { OFFSET_STEP } from '../../../shared/constants';

export const paginationEventEmitter = new CustomEventEmitter();

export function createPaginationControls(wrapper: HTMLDivElement): HTMLDivElement {
  const controls = createDiv({ parent: wrapper, classes: PAGINATION.wrapper });

  const left = createButton({
    parent: controls,
    classes: PAGINATION.button,
    text: '<',
    events: {
      click: async () => {
        if (queryState.offset > 0) {
          queryState.offset -= OFFSET_STEP;
        }
        await applyQuery();
      },
    },
  });
  const page = createDiv({ parent: controls, text: `${Math.floor(queryState.offset / OFFSET_STEP) + 1}` });

  const right = createButton({
    parent: controls,
    classes: PAGINATION.button,
    text: '>',
    events: {
      click: async () => {
        queryState.offset += OFFSET_STEP;
        await applyQuery();
      },
    },
  });

  paginationEventEmitter.subscribe('pagination', () => {
    const maxOffset = Math.max(queryState.products - OFFSET_STEP, 0);

    page.textContent = `${Math.floor(queryState.offset / OFFSET_STEP) + 1}`;
    left.disabled = queryState.offset === 0;
    right.disabled = queryState.offset >= maxOffset;
  });

  paginationEventEmitter.emit('pagination');

  return controls;
}
