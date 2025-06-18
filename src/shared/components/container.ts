import { Header } from '../../components/header';
import { createDiv, createMain } from '../../utils/create-elements/create-tags';
import { CONTAINER } from '../styles';

Header();

const mainElement = createMain({ parent: document.body });
export const container = createDiv({ classes: CONTAINER.general, parent: mainElement });
