import { buttonStyles, inputStyles } from "../../shared/styles";
import { createButton, createDiv, createForm, createH1, createInput, createMain } from "../../utils/create-elements/create-tags";

export function LoginPage(): HTMLElement {
  const container = createMain({ classes: ['flex', 'justify-center', 'items-center', 'min-h-screen', 'p-3'], parent: document.body})
  const wrapper = createDiv({ classes: ['flex', 'flex-col', 'max-w-[600px]', 'w-full', 'items-center', 'gap-[30px]', 'p-3', 'border', 'border-[#252525]/50'], parent: container });

    createH1({classes: ['text-[20px]'], parent: wrapper, text: 'Registration'});

  const inputsContainer = createForm({ classes: ['flex', 'flex-col', 'gap-[20px]', 'w-full', 'items-center'], parent: wrapper })

  const emailInput = createInput({ 
    attributes: { autocomplete: 'true', placeholder: 'Enter your email*', type: 'email' }, 
    classes: inputStyles.general, 
    events: { input: () => console.log(`email: ${emailInput.value}`)},
    parent: inputsContainer,
  });

  const passwordInput = createInput({ 
    attributes: { autocomplete: 'true', placeholder: 'Enter your password*', type: 'password', }, 
    classes: inputStyles.general, 
    events: { input: () => console.log(`password: ${passwordInput.value}`)},
    parent: inputsContainer,
  });

  createButton({
    attributes: { type: 'button' }, //! Was added to prevent redirecting; consider removing it when validation will be done
    classes: buttonStyles.general,
    events: { click: () => console.log('clicked')},
    parent: inputsContainer,
    text: 'Login'
  })

  return container;
}