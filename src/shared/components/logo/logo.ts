import { createH1 } from '../../../utils/create-elements/create-tags';

const LOGO_CLASSES: string[] = [
  'logo',
  'font-sans',
  'pl-4',
  'xs:pl-10',
  'mx-auto',
  'md:text-6xl',
  'cursor-pointer',
  'text-4xl',
  'transition-[color]',
  'uppercase',
  'col-span-2',
];

export const logo = createH1({
  classes: LOGO_CLASSES,
  events: {
    click: () => {
      console.log('Go to Main page');
    },
  },
  text: 'yanki',
});
