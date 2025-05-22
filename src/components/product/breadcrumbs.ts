import { Page } from '../../app/constants';
import { changePath } from '../../app/router/handlers';
import { createButton, createDiv, createSpan } from '../../utils/create-elements/create-tags';

const BREADSCRUMS_PARTS = {
  'Main page': () => changePath(Page.main)(),
  Catalog: () => changePath(Page.catalog)(),
  'Category name': () => console.log('go to category'),
  'Product name': () => console.log('go to product'),
};

export function breadcrumbs(): HTMLElement {
  const container = createDiv({ classes: ['w-full', 'px-5'] });
  Object.entries(BREADSCRUMS_PARTS).map(([linkName, getCallback], index, array) => {
    createButton({
      classes: ['p-3', 'cursor-pointer', 'md:text-xl', 'hover:text-(--hover-link-header)', 'transition-[color]'],
      text: linkName,
      events: { click: () => getCallback() },
      parent: container,
    });

    if (index < array.length - 1) {
      createSpan({
        classes: ['bg-no-repeat', 'bg-contain', 'h-5', 'mx-6', 'w-5', 'inline-block', 'bg-[url("./svg/greater.svg")]'],
        parent: container,
      });
    }
  });
  return container;
}
