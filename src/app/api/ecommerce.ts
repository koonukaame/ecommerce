import './style.css'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const AUTH_URL = import.meta.env.VITE_AUTH_URL;
const API_URL = import.meta.env.VITE_API_URL;
const SCOPES = import.meta.env.VITE_SCOPES;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

export function renderLoginPage() {

  function createHTMLElements() {
    const title = document.createElement('h1');
    title.className = 'title';
    title.textContent = 'Yanki';
    document.body.appendChild(title);
    
    const form = document.createElement('form');
    form.id = 'login-form';
    
    const formTitle = document.createElement('h2');
    formTitle.className = 'login-form__title';
    formTitle.textContent = 'Sign In';
    form.appendChild(formTitle);
    
    const emailWrapper = document.createElement('div');
    emailWrapper.className = 'input-wrapper';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'login-email';
    emailInput.placeholder = 'Enter your email';
    emailInput.required = true;
    emailWrapper.appendChild(emailInput);
    form.appendChild(emailWrapper);
    
    const passwordWrapper = document.createElement('div');
    passwordWrapper.className = 'input-wrapper';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'login-password';
    passwordInput.placeholder = 'Enter your password';
    passwordInput.required = true;
    passwordWrapper.appendChild(passwordInput);
    form.appendChild(passwordWrapper);
    
    const signupLinkDiv = document.createElement('div');
    signupLinkDiv.className = 'signup-link';
    const signupLink = document.createElement('a');
    signupLink.href = '#signup';
    signupLink.textContent = "Don't have an account?";
    signupLink.addEventListener('click', () => window.location.hash = '#signup')

    signupLinkDiv.appendChild(signupLink);
    form.appendChild(signupLinkDiv);
    
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'button_sign-in';
    submitButton.textContent = 'Sign In';
    form.appendChild(submitButton);
  
    document.body.appendChild(form);
  }
  createHTMLElements();

  async function loginUser(email: string, password: string) {
      const tokenResponse = await fetch(`${AUTH_URL}/oauth/${PROJECT_KEY}/customers/token`, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "password",
          username: email,
          password: password,
          scope: SCOPES,
        }),
      });
  
      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        showNotification(errorData.message, 'failed');
        return;
      }
    
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
      const refreshToken = tokenData.refresh_token;
      console.log('Токен:', accessToken);
      console.log('Обновленный токен:', refreshToken);
      
      const userResponse = await fetch(`${API_URL}/${PROJECT_KEY}/me`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }
      });
  
      console.log(userResponse);
      if (!userResponse.ok) {
        console.log('check2');
      } else {
        showNotification("You're logged in", 'success')
      }
  
      const userData = await userResponse.json();
  
      console.log('Данные пользователя:', userData)

      setTimeout(() => location.hash = 'main', 1000)
  }
  
  const loginForm = document.querySelector('#login-form') as HTMLFormElement;
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = (document.querySelector('#login-email') as HTMLInputElement).value;
    const password = (document.querySelector('#login-password') as HTMLInputElement).value;
  
    await loginUser(email, password);
  });
  
  
  function showNotification(message: string, type: string) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    if (type === 'failed') {
      notification.style.backgroundColor = '#f8d7da';
    }
    if (type === 'success') {
      notification.style.backgroundColor = '#5bda52';
    }
    
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    notification.appendChild(errorMessage);
  
    document.body.appendChild(notification);
  
    setTimeout(() => notification.classList.add('show'), 0);
  
    setTimeout(() => notification.classList.remove('show'), 2000);
  
    setTimeout(() => notification.remove(), 2500);
  }
}