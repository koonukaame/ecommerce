const XMLNS_PATH = 'http://www.w3.org/2000/svg';

const createSvgSpread = (classSvg: string[], href: string):SVGSVGElement => {
  const svgElement = document.createElementNS(XMLNS_PATH, 'svg');
  
  svgElement.classList.add(...classSvg);
  svgElement.setAttribute('xmlns', XMLNS_PATH);
  
  const useElement = document.createElementNS(XMLNS_PATH, 'use');
  useElement.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href', href);

  svgElement.append(useElement);

  return svgElement;
}

export function createButtonWithSVG(parentClasses: string[], childClasses: string[], href: string, events: Record<string, (event: Event) => void>= {}):HTMLElement {
  const svgButton = document.createElement('button');
  svgButton.append(createSvgSpread(childClasses, href));
  svgButton.classList.add(...parentClasses);
  
  for (const [eventName, callback] of Object.entries(events)) {
    svgButton.addEventListener(eventName, callback);
  }

  return svgButton;
};
