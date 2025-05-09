import './style.css';
import { loginUser } from './app/api';
import { ErrorPage } from './pages/error';

// test
// delete the lines below
ErrorPage();
try {
  const result = await loginUser('rado@mailinator.com', '1234');
  console.log(result);
} catch (error) {
  console.log(error);
}