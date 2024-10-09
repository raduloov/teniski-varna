export const excludeHeader = (
  path: string,
  pathsArray: string[] = ['products/', 'admin-panel']
) => {
  return !pathsArray.some((excludedPath) => path.includes(excludedPath));
};
