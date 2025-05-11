import { REGISTRATION } from '../../pages/registration/constants';
import { registrationButton } from '../../shared/components/button';
import { countriesSelect } from '../../shared/components/select';
import { CHECKBOX } from '../../shared/styles';
import { emailInput, passwordInput } from '../../shared/ui-config/credential-inputs';
import { createDiv, createForm, createLabel } from '../../utils/create-elements/create-tags';
import { createFieldset } from '../../utils/create-elements/create-tags';
import { createAddressBlock } from './address-block';
import { defaultBillingAddress } from './checkbox';
import { defaultShippingAddress } from './checkbox';
import { sameAddress } from './checkbox';
import { birthDateInput, cityInput, firstNameInput, lastNameInput, postalCodeInput, streetInput } from './input';

export function form(): HTMLFormElement {
  const credentialsFieldset = createFieldset({
    children: [emailInput.container, passwordInput.container],
    classes: REGISTRATION.inputsContainer,
  });

  const personalInfoFieldset = createFieldset({
    children: [firstNameInput.container, lastNameInput.container, birthDateInput.container],
    classes: REGISTRATION.inputsContainer,
  });

  const shippingAddressBlock = createAddressBlock(
    'Shipping address',
    [countriesSelect, streetInput.container, cityInput.container, postalCodeInput.container],
    defaultShippingAddress,
    'shipping',
  );

  const billingAddressBlock = createAddressBlock(
    'Billing address',
    [countriesSelect, streetInput.container, cityInput.container, postalCodeInput.container],
    defaultBillingAddress,
    'billing',
  );

  const sameAddressLabel = createLabel({
    attributes: { for: sameAddress.getAttribute('id') || '' },
    text: 'Use same address for billing',
  });
  const sameAddressContainer = createDiv({ children: [sameAddress, sameAddressLabel], classes: CHECKBOX.general });

  const form = createForm({
    children: [
      credentialsFieldset,
      personalInfoFieldset,
      shippingAddressBlock,
      sameAddressContainer,
      billingAddressBlock,
      registrationButton,
    ],
    classes: REGISTRATION.form,
  });

  return form;
}
