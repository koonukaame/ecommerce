import { appState } from '../app/app-state';
import { createMain } from '../utils/create-elements/create-tags';

const CLASSES = [
  'flex',
  'justify-center',
  'items-center',
  'h-[calc(100vh-65px)]',
  'p-3',
  'bg-[#EEECE8]',
  'text-3xl',
  'text-[var(--hover-link-header)]',
  'uppercase',
  'bold',
  'font-mono',
  'font-semibold',
  'font-sans',
  'text-center',
];

export function undercunstruction(): void {
  createMain({
    classes: CLASSES,
    parent: document.body,
    text: `${appState.currentPage} page under construction`,
  });
}
