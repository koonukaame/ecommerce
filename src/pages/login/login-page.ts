import { createInputField } from "../../shared/components/input";
import { buttonStyles } from "../../shared/styles";
import { createA, createButton, createDiv, createForm, createH1, createInput, createLabel, createMain } from "../../utils/create-elements/create-tags";

export function LoginPage(): HTMLElement {
  const container = createMain({ classes: ['flex', 'justify-center', 'items-center', 'min-h-screen', 'p-3'], parent: document.body});
  const wrapper = createDiv({ classes: ['flex', 'flex-col', 'max-w-[600px]', 'w-full', 'items-center', 'gap-[30px]', 'p-3', 'border', 'border-[#252525]/50'], parent: container });

  createH1({classes: ['text-[20px]'], parent: wrapper, text: 'Registration'});

  const inputsContainer = createForm({ classes: ['flex', 'flex-col', 'gap-[20px]', 'w-full', 'items-center'], parent: wrapper });

  createInputField('email', 'Enter your email*', inputsContainer, (value) => { console.log(`email: ${value}`)});

  createInputField('password', 'Enter your password*', inputsContainer, (value) => { console.log(`password: ${value}`)});

  const passwordVisibilityWrapper = createDiv({ classes: ['w-full', 'max-w-[400px]', 'flex', 'justify-end', 'gap-1'], parent: inputsContainer});

  createInput({ attributes: {id: 'password', type: 'checkbox' }, parent: passwordVisibilityWrapper, });

  createLabel({ attributes: { for: 'password' }, parent: passwordVisibilityWrapper, text: 'Show password' });

  createButton({
    attributes: { type: 'button' }, //! Was added to prevent redirecting; consider removing it when validation will be done
    classes: [...buttonStyles.general, ...buttonStyles.generalHover, ...buttonStyles.generalFocus],
    events: { click: () => console.log('clicked')},
    parent: inputsContainer,
    text: 'Login',
  })

  createA({ classes: ['cursor-pointer', 'duration-300', 'hover:underline'], events: { click: () => console.log('clicked')}, parent: wrapper, text: "Don't have an account? Register" });

  return container;
}