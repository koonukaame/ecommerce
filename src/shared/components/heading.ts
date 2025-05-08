import { createH1 } from "../../utils/create-elements/create-tags"
import { HEADER1 } from "../styles"

export const HEADING_CONFIG = {
  login: {
    classes: HEADER1.general,
    text: 'Login',
  },
}

export const loginHeading = createH1(HEADING_CONFIG.login);