import './style.css';
import { loginUser } from './app/api';

// test
// delete the lines below
try {
  const result = await loginUser('alex@alex.ru', 'alex');
  console.log(result);
} catch (error) {
  console.log(error);
}