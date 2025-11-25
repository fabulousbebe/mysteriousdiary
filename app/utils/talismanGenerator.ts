export function generateTalismanPath(goal: string) {
  const paths: Record<string, string> = {
    '求财': `
      M30,20 
      L50,20 L70,30 L90,15 L110,35 L130,20 L150,25
      M50,40 L90,40 L130,40 L170,40
      M30,60 Q60,20 90,60 Q120,20 150,60
      M40,80 L100,80 M130,80 L170,80
      M60,100 Q90,60 120,100
    `,
    '求姻缘': `
      M30,30 Q70,90 110,30 Q150,90 190,30
      M50,20 L150,20
      M90,10 L90,90
      M110,10 L110,90
      M50,50 L150,50
      M50,70 Q100,40 150,70
    `,
    '保平安': `
      M40,40 L160,40
      M100,20 L100,80
      M40,60 L160,60
      M60,30 Q100,70 140,30
      M60,70 Q100,30 140,70
      M50,50 L150,50
    `,
    '学业': `
      M50,20 L150,20
      M50,40 L150,40
      M50,60 L150,60
      M50,80 L150,80
      M70,20 L70,80
      M130,20 L130,80
      M80,30 Q100,50 120,30
      M80,70 Q100,50 120,70
    `,
    '事业': `
      M40,20 L160,20
      M40,40 L160,40
      M40,60 L160,60
      M40,80 L160,80
      M60,20 L60,80
      M100,20 L100,80
      M140,20 L140,80
      M60,30 Q100,10 140,30
      M60,50 Q100,70 140,50
    `,
  };
  
  // 对于自定义目标，创建一个独特的组合符咒
  const customPath = `
    M40,20 L160,20
    M40,80 L160,80
    M50,30 Q100,90 150,30
    M50,70 Q100,10 150,70
    M100,20 L100,80
    M60,50 L140,50
    M70,35 Q100,65 130,35
  `;
  
  // 返回匹配的符咒路径，或自定义符咒路径
  return paths[goal] || customPath;
}

export function getDeity(goal: string) {
  const deities: Record<string, { name: string; icon: string }> = {
    '求财': { name: '财神', icon: '/icons/caishen.svg' },
    '求姻缘': { name: '月老', icon: '/icons/yuelao.svg' },
    '保平安': { name: '太上老君', icon: '/icons/laojun.svg' },
    '学业': { name: '文昌帝君', icon: '/icons/wenchang.svg' },
    '事业': { name: '关圣帝君', icon: '/icons/guandi.svg' }
  };
  // 对于自定义目标或未知目标，返回通用神像
  return deities[goal] || { name: '太乙真人', icon: '/icons/taiyi.svg' };
}
