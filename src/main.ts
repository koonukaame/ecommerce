import './style.css';
import { loginUser } from './app/api';
import { Header } from './components/header';
import { toggleClassesOnRedirect } from './helpers/toggle-classes-on-redirect';

document.body.append(Header());

//test toggleclasses
toggleClassesOnRedirect(false, 'basket');

// test
// delete the lines below
try {
  const result = await loginUser('rado@mailinator.com', '1234');
  console.log(result);
} catch (error) {
  console.log(error);
}
