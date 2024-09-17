export const excludeFooter = (
  path: string,
  pathsArray: string[] = ['admin-panel', 'products']
) => {
  return !pathsArray.some((excludedPath) => path.includes(excludedPath));
};
