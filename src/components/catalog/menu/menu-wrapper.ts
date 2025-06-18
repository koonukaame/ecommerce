import { createDiv } from '../../../utils/create-elements/create-tags';
import { MENU } from '../../../pages/catalog/constants';
import { queryChangeEmitter } from '../../../helpers/apply-query-emitter';
import { createCategoryMenu } from './menu';

export async function createMenuWrapper(layout: HTMLDivElement): Promise<HTMLDivElement> {
  const menuWrapper = createDiv({ parent: layout, classes: MENU.wrapper });

  await createCategoryMenu(menuWrapper);

  queryChangeEmitter.subscribe('category-change', async () => {
    await createCategoryMenu(menuWrapper);
  });

  return menuWrapper;
}
