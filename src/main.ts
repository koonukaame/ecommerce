import './style.css';
import { loginUser } from './app/api';
import { componentHeader } from './components/header';
import { toggleClassesOnRedirect } from './helpers/toggle-classes-on-redirect';

document.querySelector('body')?.append(componentHeader);

//test toggleclasses
toggleClassesOnRedirect(true, 'catalog');

// test
// delete the lines below
try {
  const result = await loginUser('rado@mailinator.com', '1234');
  console.log(result);
} catch (error) {
  console.log(error);
}