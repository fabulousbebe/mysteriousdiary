export function calculateDailyFortune(
  birth: string,
  date: string,
  goal: string
) {
  const hash = (str: string) =>
    str
      .split('')
      .reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const base = hash(birth + date + goal);
  const score = (base % 61) + 40;

  const yiList = ['祭祀', '沐浴', '祈福', '纳财', '出行', '安床', '结缘'];
  const jiList = ['动土', '破财', '争执', '远行', '饮酒', '穿红', '夜行'];
  const yi = yiList[base % yiList.length];
  const ji = jiList[base % jiList.length];

  const quotes = [
    '顺其自然，万事皆有定数。',
    '无为而治，心静则明。',
    '知足不辱，知止不殆。',
    '大道至简，返璞归真。',
    '清静无为，福自来。',
    '持中守正，安然无忧。',
    '善行无辙迹，福至心灵。'
  ];
  const quote = quotes[base % quotes.length];

  const wuxing = ['金', '木', '水', '火', '土'];
  const wuxingIndex = base % 5;
  const taboo = [
    '今日金旺，不宜佩戴金属饰品。',
    '今日木旺，忌种植、砍伐。',
    '今日水旺，慎防情绪波动。',
    '今日火旺，不宜穿红。',
    '今日土旺，忌搬家动土。'
  ][wuxingIndex];

  let analysis = '';
  if (score > 85) analysis = '今日鸿运当头，诸事顺遂。';
  else if (score > 70) analysis = '运势平稳，适合稳步前行。';
  else if (score > 55) analysis = '小有波折，宜静不宜动。';
  else analysis = '需多加谨慎，勿强求。';

  const dailyWisdom = [
    '心如止水，方能映照万物；心若清风，自能拂去尘埃。无欲则刚，心静则清，道法自然，人生自在。',
    '凡事皆有定数，却也无定数；命中注定，却也可改变。无问天命，只问己心，水随方圆，心随境转。',
    '一花一世界，一叶一菩提。大道至简，守其本真，返璞归真，方知大道。',
    '百年光阴弹指过，千年往事一梦来。人生如棋局，落子无悔，把握当下，笑看红尘。',
    '无极生太极，太极生两仪，阴阳相生相克，循环往复，顺应天时，天人合一，万事顺遂。',
    '云卷云舒，花开花落，随缘不变，不变随缘。生命的智慧在于舍得，得亦欢喜，失亦安然。',
    '吉凶祸福，皆由心生。积善之家，必有余庆。心怀光明，自有光明；心向阳光，无惧黑暗。'
  ][base % 7];

  return {
    score,
    yi,
    ji,
    quote,
    taboo,
    analysis,
    dailyWisdom
  };
}
