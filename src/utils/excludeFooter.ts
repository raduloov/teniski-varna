export const excludeFooter = (
  path: string,
  pathsArray: string[] = ['admin-panel']
) => {
  return !pathsArray.some((excludedPath) => path.includes(excludedPath));
};
