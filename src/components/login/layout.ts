import { LOGIN } from '../../pages/login/constants';
import { loginLink } from '../../shared/components/link';
import { HEADER2 } from '../../shared/styles';
import { createDiv, createH2 } from '../../utils/create-elements/create-tags';
import { form } from './form';

export function loginLayout(): HTMLDivElement {
  const title = createH2({ classes: HEADER2.general, text: 'Login' });
  const loginForm = form();

  const layout = createDiv({ children: [title, loginForm, loginLink], classes: LOGIN.wrapper });

  return layout;
}
