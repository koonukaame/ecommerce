import { LOGIN } from '../../pages/login/constants';
import { createCredentials } from '../../shared/components/credentials';
import { CHECKBOX } from '../../shared/styles';
import { BUTTONS_CONFIG } from '../../shared/ui-config/button';
import { createButton, createDiv, createForm, createInput, createLabel } from '../../utils/create-elements/create-tags';

export function form(): HTMLFormElement {
  const togglePasswordContainer = createDiv({ classes: [...CHECKBOX.general, ...CHECKBOX.login] });

  const credentialsFieldset = createCredentials();

  createInput({
    attributes: {
      id: 'password',
      type: 'checkbox',
    },
    events: {
      change: (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`Show password: ${event.target.checked}`);
        }
      },
    },
    parent: togglePasswordContainer,
  });
  createLabel({ attributes: { for: 'password' }, parent: togglePasswordContainer, text: 'Show password' });

  const loginButton = createButton(BUTTONS_CONFIG.login);

  return createForm({
    children: [credentialsFieldset, togglePasswordContainer, loginButton],
    classes: LOGIN.form,
  });
}
