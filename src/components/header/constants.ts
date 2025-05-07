export const HEADER_CLASSES: {[key: string]: string[]} = {
  header: ["h-16", "grid", "gap-0", "px-2", "md:px-8", "grid-cols-3", "grid-flow-col", "md:grid-cols-[max-content_1fr_2fr_max-content_0.5fr]", "text-xl", "md:text-2xl"],
  leftMenu: ["text-left", "gap-7", "items-center", "hidden", "md:flex"],
  logo: ["logo", "font-sans", "pl-4", "xs:pl-10", "mx-auto", "md:text-6xl", "cursor-pointer", "text-4xl", "transition-[color]", "uppercase", "col-span-2"],
  menuItem: ["cursor-pointer", "text-black", "transition-[color]", "header-hovered", "uppercase"],
  rightMenu: ["flex", "items-center", "justify-start", "md:justify-center", "gap-2", "order-first", "md:order-none", "md:gap-4", "md:items-left", "whitespace-nowrap"],
  svgButtonBasket: ["cursor-pointer"],
  svgButtonPerson: ["cursor-pointer", "logined"],
  svgDiv: ["flex", "items-center", "justify-center", "gap-2", "md:gap-4"],
  svgPicture: ["w-12", "h-8", "bg-no-repeat", "bg-center", "transition-[fill]", "header-hovered", "md:h-9"],
};