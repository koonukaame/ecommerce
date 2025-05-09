import { createButton, createDiv, createImg, createMain, createP } from "../../utils/create-elements/create-tags";
import { ERROR, IMAGE_PATH } from "./constants";

export function ErrorPage():HTMLElement {
  // const wrapper = createDiv({ classes: ERROR.image, parent: container, children: Header() });
  const image = createImg({
    attributes: { "alt":'jacket 404', "src":IMAGE_PATH, }, 
    classes: ERROR.image,
  });

  const errorNumber = createP({ classes: ERROR.errorNumber, text: '404' })
  const errorTitle = createP({ classes: ERROR.errorTitle, text: 'Page not Found!!!' })
  const errorText = createP({ classes: ERROR.errorText, text: "The page you are looking for doesn't exist. Please try searching for some other page, or return to the website's homepage to find what you're looking for." });
  const mainButton = createButton({ classes: ["text-3xl"], events: {click: ()=> console.log('go to main page')}, text: 'Main page', })

  const infoWrapper = createDiv({ children: [errorNumber, errorTitle, errorText, mainButton], classes: ERROR.infoWrapper, });

  const wrapper = createDiv({ children: [image, infoWrapper], classes: ERROR.wrapper});
  const container = createMain({ children: [wrapper], classes: ERROR.container, parent: document.body});

  return container;
}