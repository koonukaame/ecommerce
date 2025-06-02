import { CustomEventEmitter } from '../../utils/event-emitter';
import { createDiv } from '../../utils/create-elements/create-tags';
import { renderProductResults } from '../../helpers/render-product-results';
import { ERROR_MESSAGES, CATALOG } from '../../pages/catalog/constants';

export const productsWrapperEmitter = new CustomEventEmitter();

export function createProductsWrapper(layout: HTMLDivElement): HTMLDivElement {
  const productsWrapper = createDiv({ classes: CATALOG.productsWrapper, parent: layout });
  productsWrapperEmitter.unsubscribe('render-products');

  productsWrapperEmitter.subscribe('render-products', (data) => {
    renderProductResults(productsWrapper, data, ERROR_MESSAGES.query.noResults, ERROR_MESSAGES.query.error);
  });

  return productsWrapper;
}
