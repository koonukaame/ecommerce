import { HEADER2 } from '../../shared/styles';
import { createDiv, createH2 } from '../../utils/create-elements/create-tags';
import { PROFILE_CLASSES } from './constants';
import { createPasswordSection } from './password-section/password-section';
import { createPersonalInfoSection } from './personal-info-section/personal-info';
import { createOptionalAddressSection } from './optional-address-section/create-optional-address-section';
import { createDefaultAddressSection } from './default-address-section/create-default-address-section';
import { isHTMLElement } from '../../helpers/is-html-element';

export async function profileLayout(): Promise<HTMLDivElement | void> {
  const title = createH2({ classes: HEADER2.general, text: 'Personal Profile' });

  const sections = await Promise.all([
    createPersonalInfoSection(),
    createPasswordSection(),
    createDefaultAddressSection('shipping'),
    createDefaultAddressSection('billing'),
    createOptionalAddressSection('optional-shipping'),
    createOptionalAddressSection('optional-billing'),
  ]);

  if (!isHTMLElement(sections)) {
    return;
  }

  const layout = createDiv({
    classes: PROFILE_CLASSES.wrapper,
    children: [title, ...sections],
  });

  return layout;
}
