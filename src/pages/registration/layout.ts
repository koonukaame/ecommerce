import { registrationButton } from "../../shared/components/button";
import { container } from "../../shared/components/form-input-container";
import { registrationLink } from "../../shared/components/link";
import { billingSelect, shippingSelect } from "../../shared/components/select";
import { HEADER2 } from "../../shared/styles";
import { CHECKBOX } from "../../shared/styles";
import { emailInput, passwordInput } from "../../shared/ui-config/credential-inputs";
import { createDiv, createFieldset, createForm, createH2, createLabel } from "../../utils/create-elements/create-tags";
import { createAddressBlock } from "./address-block";
import { defaultBillingAddress, defaultShippingAddress, sameAddress } from "./checkbox";
import { REGISTRATION } from "./constants";
import { billingCity, billingPostalCode, billingStreet, birthDate, firstName, lastName, shippingCity, shippingPostalCode, shippingStreet } from "./input";

export function RegistrationPage(): HTMLElement {
  const heading = createH2({classes: HEADER2.general, text: 'Registration' });

  const credentials = createFieldset({ children: [emailInput, passwordInput], classes: REGISTRATION.inputsContainer });

  const userData = createFieldset({ children: [firstName, lastName, birthDate], classes: REGISTRATION.inputsContainer });

  const billingBlock = createAddressBlock('Billing address', [billingSelect, billingStreet, billingCity, billingPostalCode], defaultBillingAddress);
  const shippingBlock = createAddressBlock('Shipping address', [shippingSelect, shippingStreet, shippingCity, shippingPostalCode], defaultShippingAddress);

  const sameAddressLabel = createLabel({attributes: { for: sameAddress.getAttribute('id') || '' }, text: 'Use same address for billing',})
  const sameAddressWrapper = createDiv({ children: [sameAddress, sameAddressLabel], classes: CHECKBOX.general, })

  const form = createForm({ children: [credentials, userData, shippingBlock, sameAddressWrapper, billingBlock, registrationButton], classes: REGISTRATION.form })
  createDiv({ children: [heading, form, registrationLink], classes: REGISTRATION.wrapper, parent: container });

  return container;
}
