import { REGISTRATION } from "../../pages/registration/constants";
import { registrationLink } from "../../shared/components/link";
import { HEADER2 } from "../../shared/styles";
import { createDiv, createH2 } from "../../utils/create-elements/create-tags";
import { form } from "./form";

export function registrationLayout(): HTMLDivElement {
  const title = createH2({classes: HEADER2.general, text: 'Registration' });
  const registrationForm = form();

  const layout = createDiv({
    children: [title, registrationForm, registrationLink],
    classes: REGISTRATION.wrapper,
  });

  return layout;
}