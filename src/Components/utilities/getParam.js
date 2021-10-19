export default (parameterName, url) => {
  const urlParams = new URLSearchParams(url);
  return urlParams.get(parameterName);
};