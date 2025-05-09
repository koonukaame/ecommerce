import { registrationButton } from "../../shared/components/button";
import { container } from "../../shared/components/form-input-container";
import { registrationLink } from "../../shared/components/link";
import { billingSelect, shippingSelect } from "../../shared/components/select";
import { HEADER2 } from "../../shared/styles";
import { emailInput, passwordInput } from "../../shared/ui-config/credential-inputs";
import { createDiv, createForm, createH2 } from "../../utils/create-elements/create-tags";
import { createAddressBlock } from "./address-block";
import { defaultBillingAddress, defaultShippingAddress } from "./checkbox";
import { REGISTRATION } from "./constants";
import { billingCity, billingPostalCode, billingStreet, birthDate, firstName, lastName, shippingCity, shippingPostalCode, shippingStreet } from "./input";

export function RegistrationPage(): HTMLElement {
  const heading = createH2({classes: HEADER2.general, text: 'Registration' });

  const credentials = createDiv({ children: [emailInput, passwordInput], classes: REGISTRATION.inputsContainer });

  const userData = createDiv({ children: [firstName, lastName, birthDate], classes: REGISTRATION.inputsContainer });

  const billingBlock = createAddressBlock('Billing address', [billingSelect, billingStreet, billingCity, billingPostalCode], defaultBillingAddress);

  const shippingBlock = createAddressBlock('Shipping address', [shippingSelect, shippingStreet, shippingCity, shippingPostalCode], defaultShippingAddress);

  const form = createForm({ children: [credentials, userData, billingBlock, shippingBlock, registrationButton], classes: REGISTRATION.form })
  createDiv({ children: [heading, form, registrationLink], classes: REGISTRATION.wrapper, parent: container });

  return container;
}
