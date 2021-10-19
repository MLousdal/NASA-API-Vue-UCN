export const body = document.querySelector("body");

export function applyTheme() {
  const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  
  if(userPrefersDark){
    body.classList.add("theme-dark");
  }
  
  if(userPrefersLight){
    body.classList.add("theme-light");
  }
  
}