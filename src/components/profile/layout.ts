import { HEADER2 } from '../../shared/styles';
import { createDiv, createH2 } from '../../utils/create-elements/create-tags';
import { createShippingAddressSection } from './shipping-address-section.ts/address-section';
import { PROFILE_CLASSES } from './constants';
import { createPasswordSection } from './password-section/password-section';
import { createPersonalInfoSection } from './personal-info-section/personal-info';
import { createBillingAddressSection } from './billing-address-section.ts/address-section';
import { createFirstOptionalAddressSection } from './first-optional-address-section/address-section';

export async function profileLayout(): Promise<HTMLDivElement | void> {
  const title = createH2({ classes: HEADER2.general, text: 'Personal Profile' });

  const personalInfoSection = await createPersonalInfoSection();
  const passwordSection = await createPasswordSection();
  const shippingSection = await createShippingAddressSection();
  const billingSection = await createBillingAddressSection();
  const firstOptionalSection = await createFirstOptionalAddressSection();

  if (
    !(
      personalInfoSection instanceof HTMLDivElement &&
      passwordSection instanceof HTMLDivElement &&
      shippingSection instanceof HTMLDivElement &&
      billingSection instanceof HTMLDivElement &&
      firstOptionalSection instanceof HTMLDivElement
    )
  ) {
    return;
  }

  const layout = createDiv({
    classes: PROFILE_CLASSES.wrapper,
    children: [title, personalInfoSection, passwordSection, shippingSection, billingSection, firstOptionalSection],
  });

  return layout;
}
