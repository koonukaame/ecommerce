export const toggleClassesOnRedirect = function (isLogined: boolean = true, page: string = 'main'): void {
  const bodyElement = document.body;

  bodyElement.classList.toggle('is-logined', isLogined);
  bodyElement.classList.toggle('mainpage', page === 'main');
};
