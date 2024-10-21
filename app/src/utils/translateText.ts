const bulgarianToLatinMap: { [key: string]: string } = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'sht',
  ъ: 'a',
  ь: 'y',
  ю: 'yu',
  я: 'ya'
};

export const translateTextForSpeedyQuery = (text: string) => {
  const translatedText = text
    .split('')
    .map((char) =>
      bulgarianToLatinMap[char as keyof typeof bulgarianToLatinMap]
        ? bulgarianToLatinMap[char as keyof typeof bulgarianToLatinMap]
        : char
    )
    .join('');

  if (translatedText.endsWith('ya')) {
    return translatedText.slice(0, -2) + 'a';
  }

  return translatedText;
};
