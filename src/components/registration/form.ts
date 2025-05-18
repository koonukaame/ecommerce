import { defaultCheckboxSubscribe } from '../../helpers/same-address-emitter';
import { REGISTRATION, REGISTRATION_CHECKBOXES_CONFIG } from '../../pages/registration/constants';
import { createCredentials } from '../../shared/components/credentials';
import { CHECKBOX } from '../../shared/styles';
import { BUTTONS_CONFIG } from '../../shared/ui-config/button';
import { createButton, createDiv, createForm, createInput, createLabel } from '../../utils/create-elements/create-tags';
import { createAddressBlock } from './address-block';
import { createPersonalInfoFieldset } from './input';

export function form(): HTMLFormElement {
  const defaultShippingAddress = createInput(REGISTRATION_CHECKBOXES_CONFIG.defaultShippingAddress);
  const sameAddress = createInput(REGISTRATION_CHECKBOXES_CONFIG.sameAddress);
  const defaultBillingAddress = createInput(REGISTRATION_CHECKBOXES_CONFIG.defaultBillingAddress);

  defaultCheckboxSubscribe(defaultBillingAddress, defaultShippingAddress);

  const credentialsFieldset = createCredentials();

  const personalInfoFieldset = createPersonalInfoFieldset();

  const shippingAddressBlock = createAddressBlock('Shipping address', defaultShippingAddress, 'shipping');

  const billingAddressBlock = createAddressBlock('Billing address', defaultBillingAddress, 'billing');

  const sameAddressLabel = createLabel({
    attributes: { for: sameAddress.getAttribute('id') || '' },
    text: 'Use same address for billing',
  });
  const sameAddressContainer = createDiv({ children: [sameAddress, sameAddressLabel], classes: CHECKBOX.general });

  const registrationButton = createButton(BUTTONS_CONFIG.registration);

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
