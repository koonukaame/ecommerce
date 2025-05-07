export const toggleClassesOnRedirect = function (isLogined: boolean = true, page: string = 'main'): void {
  const bodyElement = document.querySelector('body');
  
  if(bodyElement === null) {
    return;
  }

  if (isLogined) {
    bodyElement.classList.add('is-logined');
  } else {
    bodyElement.classList.remove('is-logined');
  }

  if (page === 'main') {
    bodyElement.classList.add('mainpage');
    if (!bodyElement.classList.contains('background')) {
      bodyElement.classList.add('background');
    }
  } else {
    bodyElement.classList.remove('mainpage');
    if (bodyElement.classList.contains('background')) {
      bodyElement.classList.remove('background');
    }
  }
}