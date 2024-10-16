const latinToBulgarianMap = {
  a: 'а',
  b: 'б',
  v: 'в',
  g: 'г',
  d: 'д',
  e: 'е',
  zh: 'ж',
  z: 'з',
  i: 'и',
  y: 'й',
  k: 'к',
  l: 'л',
  m: 'м',
  n: 'н',
  o: 'о',
  p: 'п',
  r: 'р',
  s: 'с',
  t: 'т',
  u: 'у',
  f: 'ф',
  h: 'х',
  ts: 'ц',
  ch: 'ч',
  sh: 'ш',
  sht: 'щ',
  yu: 'ю',
  ya: 'я'
};

export const translateTextForSpeedyQuery = (text: string) => {
  const keys = Object.keys(latinToBulgarianMap).sort(
    (a, b) => b.length - a.length
  );

  let translatedText = text;

  keys.forEach((key) => {
    const regex = new RegExp(key, 'g');
    // @ts-ignore
    translatedText = translatedText.replace(regex, latinToBulgarianMap[key]);
  });

  if (translatedText.endsWith('иа')) {
    return translatedText.slice(0, -1) + 'я';
  }

  return translatedText;
};
