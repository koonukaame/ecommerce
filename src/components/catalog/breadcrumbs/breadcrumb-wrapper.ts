import { createDiv } from '../../../utils/create-elements/create-tags';
import { createBreadcrumbs } from './breadcrumbs';
import { queryChangeEmitter } from '../layout';

export async function createBreadcrumbsWrapper(layout: HTMLDivElement): Promise<HTMLDivElement> {
  const breadcrumbsContainer = createDiv({ parent: layout });
  await createBreadcrumbs(breadcrumbsContainer);

  queryChangeEmitter.subscribe('category-change', async () => {
    breadcrumbsContainer.replaceChildren();
    await createBreadcrumbs(breadcrumbsContainer);
  });

  return breadcrumbsContainer;
}
