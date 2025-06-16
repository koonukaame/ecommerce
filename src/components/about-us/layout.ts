import {
  ABOUT_CLASSES,
  ABOUT_TEAM,
  DEVELOPERS,
  LABEL_RSS_LINK,
  MENTOR,
  RSS_LINK,
  TEAM_SLOGAN,
} from '../../pages/about-us/constants';
import { LAYOUT_CLASSES } from '../../pages/product/constants';
import { createDiv, createH2, createP } from '../../utils/create-elements/create-tags';
import { createDeveloperCard } from './developer-cart';
import { createLinkWithPicture } from './link-with-picture';

export function AboutUsLayout(): HTMLDivElement {
  const cardsContainer = createDiv({
    classes: ABOUT_CLASSES.cardsContainer,
  });

  DEVELOPERS.map((DeveloperInfo) => cardsContainer.append(createDeveloperCard(DeveloperInfo)));

  const teamNameElement = createH2({ text: TEAM_SLOGAN, classes: ABOUT_CLASSES.h2 });

  const teamDescription = createP({
    classes: ABOUT_CLASSES.aboutTeamP,
    text: ABOUT_TEAM,
  });
  const mentorCart = createDeveloperCard(MENTOR);
  const rssLink = createLinkWithPicture(LABEL_RSS_LINK, RSS_LINK, ABOUT_CLASSES.rssLogo, ABOUT_CLASSES.rssLink, false);

  const layout = createDiv({
    children: [cardsContainer, teamNameElement, teamDescription, mentorCart, rssLink],
    classes: LAYOUT_CLASSES,
  });

  return layout;
}
