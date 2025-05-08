import { getAnonymousToken } from './app/ecommerce/get-anonymous-token';
import './style.css';

// test
// delete the lines below
try {
  const result = await getAnonymousToken();
  console.log(result);
} catch (error) {
  console.log(error);
}