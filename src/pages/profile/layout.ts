import { container } from '../../shared/components/container';
import type { FetchError } from '../../app/types';
import { HEADER2 } from '../../shared/styles';
import { createDiv, createH2 } from '../../utils/create-elements/create-tags';
import { PROFILE_CLASSES } from './constants';
import { createPersonalInfoSection } from './personal info section/create-personal-info-section';

export async function ProfilePage(): Promise<HTMLElement | FetchError | void> {
  const title = createH2({ classes: HEADER2.general, text: 'Personal Profile' });
  const personalInfoSection = await createPersonalInfoSection();

  if (!(personalInfoSection instanceof HTMLDivElement)) {
    return;
  }

  const wrapper = createDiv({ classes: PROFILE_CLASSES.wrapper, children: [title, personalInfoSection] });

  container.append(wrapper);
  return container;
}
