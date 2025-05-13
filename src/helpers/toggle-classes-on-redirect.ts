export const toggleClassesOnRedirect = function (isLogined = true, page = 'main'): void {
  const bodyElement = document.body;

  bodyElement.classList.toggle('is-logined', isLogined);
  bodyElement.classList.toggle('mainpage', page === 'main');
};
