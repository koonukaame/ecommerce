import { HEADER2 } from '../../shared/styles';
import { createDiv, createH2 } from '../../utils/create-elements/create-tags';
import { PROFILE_CLASSES } from './constants';
import { createPasswordSection } from './password-section/password-section';
import { createPersonalInfoSection } from './personal-info-section/personal-info';
import { createOptionalAddressSection } from './optional-address-section/create-optional-address-section';
import { createDefaultAddressSection } from './default-address-section/create-default-address-section';

export async function profileLayout(): Promise<HTMLDivElement | void> {
  const title = createH2({ classes: HEADER2.general, text: 'Personal Profile' });

  const personalInfoSection = await createPersonalInfoSection();
  const passwordSection = await createPasswordSection();
  const defaultShippingSection = await createDefaultAddressSection('shipping');
  const defaultBillingSection = await createDefaultAddressSection('billing');
  const optionalShippingSection = await createOptionalAddressSection('optional-shipping');
  const optionalBillingSection = await createOptionalAddressSection('optional-billing');

  if (
    !(
      personalInfoSection instanceof HTMLDivElement &&
      passwordSection instanceof HTMLDivElement &&
      defaultShippingSection instanceof HTMLDivElement &&
      defaultBillingSection instanceof HTMLDivElement &&
      optionalShippingSection instanceof HTMLDivElement &&
      optionalBillingSection instanceof HTMLDivElement
    )
  ) {
    return;
  }

  const layout = createDiv({
    classes: PROFILE_CLASSES.wrapper,
    children: [
      title,
      personalInfoSection,
      passwordSection,
      defaultShippingSection,
      defaultBillingSection,
      optionalShippingSection,
      optionalBillingSection,
    ],
  });

  return layout;
}
