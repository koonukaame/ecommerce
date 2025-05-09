import { registerUser } from './app/api';
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

// test registerUser function: change the email in order to send request

const ZERO_FOR_CHECKS = 0;

try {
  const customer = {
    addresses: [
      {
        city: "Tel Aviv",
        country: "IL",
        postalCode: "12345",
        streetName: "Main Street",
        streetNumber: "123",
      }
    ],
    billingAddresses: [ZERO_FOR_CHECKS],
    dateOfBirth: "1984-01-04",
    defaultBillingAddress: 0,
    defaultShippingAddress: 0,
    email: "huhyfffxecp@mailinator.com",
    firstName: "Ori",
    lastName: "Berry",
    password: "Pa$$w0rd!",
    shippingAddresses: [ZERO_FOR_CHECKS]
  };

  const result = await registerUser(customer)
  console.log(result);
} catch (error) {
  console.log(error);
}