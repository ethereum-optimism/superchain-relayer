// src/utils/isMobile.ts
function isAndroid() {
  return typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);
}
function isSmallIOS() {
  return typeof navigator !== "undefined" && /iPhone|iPod/.test(navigator.userAgent);
}
function isLargeIOS() {
  return typeof navigator !== "undefined" && /iPad/.test(navigator.userAgent);
}
function isIOS() {
  return isSmallIOS() || isLargeIOS();
}

export {
  isAndroid,
  isIOS
};
