  import { REGISTRATION } from "../../pages/registration/constants";
  import { registrationButton } from "../../shared/components/button";
  import { billingSelect, shippingSelect } from "../../shared/components/select";
  import { CHECKBOX } from "../../shared/styles";
  import { emailInput, passwordInput } from "../../shared/ui-config/credential-inputs";
  import { createDiv, createForm, createLabel } from "../../utils/create-elements/create-tags";
  import { createFieldset } from "../../utils/create-elements/create-tags";
  import { createAddressBlock } from "./address-block";
  import { defaultBillingAddress } from "./checkbox";
  import { defaultShippingAddress } from "./checkbox";
  import { sameAddress } from "./checkbox";
  import { birthDate, firstName, lastName } from "./input";
  import { billingCity, billingPostalCode, billingStreet, shippingCity, shippingPostalCode, shippingStreet } from "./input";

export function form(): HTMLFormElement {
  const credentials = createFieldset({ children: [emailInput, passwordInput], classes: REGISTRATION.inputsContainer });

  const userData = createFieldset({ children: [firstName, lastName, birthDate], classes: REGISTRATION.inputsContainer });

  const billingBlock = createAddressBlock('Billing address', [billingSelect, billingStreet, billingCity, billingPostalCode], defaultBillingAddress);

  const shippingBlock = createAddressBlock('Shipping address', [shippingSelect, shippingStreet, shippingCity, shippingPostalCode], defaultShippingAddress);

  const sameAddressLabel = createLabel({attributes: { for: sameAddress.getAttribute('id') || '' }, text: 'Use same address for billing'});
  const sameAddressWrapper = createDiv({ children: [sameAddress, sameAddressLabel], classes: CHECKBOX.general });

  const form = createForm({ children: [credentials, userData, shippingBlock, sameAddressWrapper, billingBlock, registrationButton], classes: REGISTRATION.form });

  return form;
}
