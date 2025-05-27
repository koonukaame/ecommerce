import { container } from '../../shared/components/container';
import { profileLayout } from '../../components/profile/layout';

export async function ProfilePage(): Promise<HTMLElement | void> {
  const layout = await profileLayout();

  if (!(layout instanceof HTMLDivElement)) {
    return;
  }
  container.append(layout);

  return container;
}
