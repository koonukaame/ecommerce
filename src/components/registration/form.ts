  import { REGISTRATION } from "../../pages/registration/constants";
  import { registrationButton } from "../../shared/components/button";
  import { CHECKBOX } from "../../shared/styles";
  import { createDiv, createForm, createLabel } from "../../utils/create-elements/create-tags";
  import { createFieldset } from "../../utils/create-elements/create-tags";
  import { createAddressBlock } from "./address-block";
  import { defaultBillingAddress } from "./checkbox";
  import { defaultShippingAddress } from "./checkbox";
  import { sameAddress } from "./checkbox";
import { billingCityBlock, 
  billingPostalCodeBlock, 
  billingSelectBlock, 
  billingStreetBlock, 
  birthdateBlock, 
  emailBlock, 
  firstNameBlock, 
  lastNameBlock, 
  passwordBlock, 
  shippingCityBlock, 
  shippingPostalCodeCode, 
  shippingSelectBlock, 
  shippingStreetBlock } from "./input-block";

export function form(): HTMLFormElement {
  const credentials = createFieldset({ children: [emailBlock.wrapper, passwordBlock.wrapper], classes: REGISTRATION.inputsContainer });

  const userData = createFieldset({ children: [firstNameBlock.wrapper, lastNameBlock.wrapper, birthdateBlock.wrapper], classes: REGISTRATION.inputsContainer });

  const billingBlock = createAddressBlock('Billing address', [billingSelectBlock.wrapper, billingStreetBlock.wrapper, billingCityBlock.wrapper, billingPostalCodeBlock.wrapper], defaultBillingAddress);

  const shippingBlock = createAddressBlock('Shipping address', [shippingSelectBlock.wrapper, shippingStreetBlock.wrapper, shippingCityBlock.wrapper, shippingPostalCodeCode.wrapper], defaultShippingAddress);

  const sameAddressLabel = createLabel({attributes: { for: sameAddress.getAttribute('id') || '' }, text: 'Use same address for billing'});
  const sameAddressWrapper = createDiv({ children: [sameAddress, sameAddressLabel], classes: CHECKBOX.general });

  const form = createForm({ children: [credentials, userData, shippingBlock, sameAddressWrapper, billingBlock, registrationButton], classes: REGISTRATION.form });

  return form;
}
