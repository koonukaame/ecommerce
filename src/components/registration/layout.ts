import { REGISTRATION } from "../../pages/registration/constants";
import { registrationLink } from "../../shared/components/link";
import { HEADER2 } from "../../shared/styles";
import { createDiv, createH2 } from "../../utils/create-elements/create-tags";
import { form } from "./form";

export function registration(): HTMLDivElement {
  const title = createH2({classes: HEADER2.general, text: 'Registration' });
  const regForm = form();

  const layout = createDiv({
    children: [title, regForm, registrationLink],
    classes: REGISTRATION.wrapper,
  });

  return layout;
}