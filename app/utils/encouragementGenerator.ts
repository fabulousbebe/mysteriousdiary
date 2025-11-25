export function generateEncouragement(content: string): string {
  const encouragements = [
    "道路虽长，但你每一步都在接近真理。继续前行，光明就在前方。",
    "你的修行之路上充满智慧的火花。让这些火花照亮你的未来吧。",
    "心中有道，脚下有路。你的坚持是通向大道的阶梯。",
    "天地虽大，不及你心中的宇宙。继续探索，你会发现无限可能。",
    "每一次思考都是向道靠近。你的努力正在塑造一个更好的自己。",
    "道法自然，随心而行。你的修行正契合天道，继续保持。",
    "静水流深，你的沉思正如一泓清泉，滋润心田。",
    "日月轮转，你的进步如四季更迭，生生不息。",
    "上善若水，你的柔韧与坚持正如水之品性。继续保持这份美德。",
    "太极生两仪，你的思考正在开创新的境界。保持这份创造力。"
  ];

  // 简单的情感分析
  const positiveWords = ['快乐', '幸福', '成功', '进步', '希望', '感恩'];
  const negativeWords = ['困难', '失败', '悲伤', '迷茫', '压力', '困惑'];

  let score = 0;
  positiveWords.forEach(word => {
    if (content.includes(word)) score += 1;
  });
  negativeWords.forEach(word => {
    if (content.includes(word)) score -= 1;
  });

  // 根据情感分数选择鼓励语
  let encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];

  if (score > 0) {
    encouragement += " 你的积极心态是最宝贵的财富，它将引领你走向更高远的境界。";
  } else if (score < 0) {
    encouragement += " 记住，道中有阴阳，起起落落都是修行的一部分。保持坚韧，终会柳暗花明。";
  }

  return encouragement;
}