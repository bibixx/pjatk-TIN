const lightSchemeIcon = document.querySelector('link#light-scheme-icon');
const darkSchemeIcon = document.querySelector('link#dark-scheme-icon');

const matcher = window.matchMedia('(prefers-color-scheme: dark)');

function onUpdate() {
  console.log(1);

  const prefersDarkScheme = matcher.matches;
  if (prefersDarkScheme) {
    lightSchemeIcon.remove();
    document.head.append(darkSchemeIcon);
    return;
  }

  document.head.append(lightSchemeIcon);
  darkSchemeIcon.remove();
}

matcher.addEventListener('change', onUpdate);
onUpdate();
