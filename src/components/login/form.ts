import { LOGIN } from '../../pages/login/constants';
import { loginButton } from '../../shared/components/button';
import { createCredentials } from '../../shared/components/credentials';
import { CHECKBOX } from '../../shared/styles';
import { createDiv, createForm, createInput, createLabel } from '../../utils/create-elements/create-tags';
import { togglePasswordEmitter } from '../../utils/event-emitter';

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
          togglePasswordEmitter.emit('togglePassword', event.target.checked);
        }
      },
    },
    parent: togglePasswordContainer,
  });
  createLabel({ attributes: { for: 'password' }, parent: togglePasswordContainer, text: 'Show password' });

  return createForm({
    children: [credentialsFieldset, togglePasswordContainer, loginButton],
    classes: LOGIN.form,
  });
}
