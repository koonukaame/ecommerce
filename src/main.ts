import './style.css';
import { loginUser } from './app/api';
// test
// delete the lines below
try {
  const result = await loginUser('rado@mailinator.com', '1234');
  console.log(result);
} catch (error) {
  console.log(error);
}
