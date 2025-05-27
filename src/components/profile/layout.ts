import { PROFILE_CLASSES } from '../../pages/profile/constants';
import { HEADER2 } from '../../shared/styles';
import { createDiv, createH2 } from '../../utils/create-elements/create-tags';
import { createPersonalInfoSection } from './personal-info-section/create-personal-info-section';

export async function profileLayout(): Promise<HTMLDivElement | void> {
  const title = createH2({ classes: HEADER2.general, text: 'Personal Profile' });
  const personalInfoSection = await createPersonalInfoSection();

  if (!(personalInfoSection instanceof HTMLDivElement)) {
    return;
  }

  const layout = createDiv({ classes: PROFILE_CLASSES.wrapper, children: [title, personalInfoSection] });

  return layout;
}
