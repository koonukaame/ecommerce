import { cartLayout } from '../../components/cart/layout';
import { container } from '../../shared/components/container';
import { createButton } from '../../utils/create-elements/create-tags';
import { applyPromocode } from '../../app/api';

export function CartPage(): HTMLElement {
  const layout = cartLayout();
  const button = createButton({});
  button.style.marginRight = '20px';
  button.style.padding = '5px';
  button.style.cursor = 'pointer';
  button.style.border = '2px solid black';
  button.textContent = 'Кнопка';

  button.addEventListener('click', async () => {
    const priseWithPromoCode = await applyPromocode('WELCOME15');

    console.log(
      'Обновленная корзина с 15% скидкой на все товары в "totalPrice" свойстве объекта корзины',
      priseWithPromoCode,
    );
  });

  container.append(layout, button);
  return container;
}
