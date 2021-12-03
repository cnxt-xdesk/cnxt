const emojiUrl = (emojiDomain, standardDomain) => {
  const wl = window.location;
  let useEmojiDomain = /^((?!chrome).)*safari/i.test(navigator.userAgent);
  if (navigator.userAgent.indexOf('CriOS') > -1) {
    useEmojiDomain = false;
  }
  const currentUrl = wl.protocol + '//' + wl.hostname;
  let outputUrl = useEmojiDomain ? emojiDomain : standardDomain;
  if (currentUrl === outputUrl) {
    return;
  }
  if (wl.port) {
    outputUrl += ':' + wl.port;
  }
  outputUrl += wl.pathname;
  outputUrl += wl.search;
  window.location = outputUrl;
};
export default emojiUrl