import { LOGIN } from "../../pages/login/constants";
import { loginButton } from "../../shared/components/button";
import { CHECKBOX } from "../../shared/styles";
import { emailInput, passwordInput } from "../../shared/ui-configs/credential-inputs";
import { createDiv, createFieldset, createForm, createInput, createLabel } from "../../utils/create-elements/create-tags";

export function form(): HTMLFormElement {
  const togglePasswordContainer = createDiv({ classes: [...CHECKBOX.general, ...CHECKBOX.login] });
  
  const credentialsFieldset = createFieldset({ 
    children: [emailInput, passwordInput, togglePasswordContainer], 
      classes: LOGIN.inputsContainer,
    });
  
  createInput({ attributes: { id: 'password', type: 'checkbox' }, parent: togglePasswordContainer });
  createLabel({ attributes: { for: 'password' }, parent: togglePasswordContainer, text: 'Show password' });
  
  return createForm({
    children: [credentialsFieldset, loginButton],
    classes: LOGIN.form,
  });
}