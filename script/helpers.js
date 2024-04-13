export const createListener = (tagName, event, callBack) => {
    const tag = document.querySelector(tagName);
    tag.addEventListener(event, callBack);
  
  }