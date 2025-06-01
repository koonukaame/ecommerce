import { HEADER2 } from '../../shared/styles';
import { createDiv, createH2 } from '../../utils/create-elements/create-tags';
import { PROFILE_CLASSES } from './constants';
import { createPasswordSection } from './password-section/password-section';
import { createPersonalInfoSection } from './personal-info-section/personal-info';
import { createFirstOptionalAddressSection } from './optional-shipping-section/address-section';
import { createDefaultAddressSection } from './default-address-section/create-default-address-section';

export async function profileLayout(): Promise<HTMLDivElement | void> {
  const title = createH2({ classes: HEADER2.general, text: 'Personal Profile' });

  const personalInfoSection = await createPersonalInfoSection();
  const passwordSection = await createPasswordSection();
  const shippingSection = await createDefaultAddressSection('shipping');
  const billingSection = await createDefaultAddressSection('billing');
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
