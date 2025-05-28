import { PROFILE_CLASSES } from '../../pages/profile/constants';
import { HEADER2 } from '../../shared/styles';
import { createDiv, createH2 } from '../../utils/create-elements/create-tags';
import { createPasswordSection } from './password-section/password-section';
import { createPersonalInfoSection } from './personal-info-section/personal-info';

export async function profileLayout(): Promise<HTMLDivElement | void> {
  const title = createH2({ classes: HEADER2.general, text: 'Personal Profile' });

  const personalInfoSection = await createPersonalInfoSection();
  const passwordSection = await createPasswordSection();

  if (!(personalInfoSection instanceof HTMLDivElement && passwordSection instanceof HTMLDivElement)) {
    return;
  }

  const layout = createDiv({
    classes: PROFILE_CLASSES.wrapper,
    children: [title, personalInfoSection, passwordSection],
  });

  return layout;
}
