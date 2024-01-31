export const excludeHeader = (
  path: string,
  pathsArray: string[] = ['products']
) => {
  return !pathsArray.some((excludedPath) => path.includes(excludedPath));
};
