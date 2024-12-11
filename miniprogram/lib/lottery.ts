// 生成双色球数据
const generator = (length: number, max = 35) => {
    const result = [] as any;
    const fill = () => {
      let _max = Math.random() * max + 1
      let value: any = parseInt(_max.toString(), 10) || 1;
      value = value < 10 ? '0' + value : value;
      if (result.length >= length) {
        return;
      }
      if (!result.includes(value)) {
        result.push(value);
      }
      fill();
    };
    fill();
    return result;
};

// generatorSSQ
interface Iparams {
    frontSize?: number;
    endSize?: number;
    frontMax?: number;
    endMax?: number;
    total?: number;
}
// 默认是大乐透
/*  双色球{
        frontSize: 6,
        endSize: 1,
        frontMax: 33,
        endMax: 16,
      }
*/
export const generatorNums = (params:Iparams) => {
    const {
      frontSize = 5,
      endSize = 2,
      frontMax = 35,
      endMax = 12,
      total = 5,
    } = params;
    let list = [];

    for (var i = 0; i < total; i++) {
        const font = generator(frontSize, frontMax).sort((a: number, b: number) => a - b);
        const end = generator(endSize, endMax).sort((a:number, b:number) => a - b);
        list.push({
            font: font,
            end: end,
        });
    }
    return list;
};

// 复式投注
/**
 * 
 * 复式投注奖等计算算法https://blog.csdn.net/usercore/article/details/8552934
 *  选了m个红球，中了n个红球，选了k个篮球，中了j个篮球（m、n、k、j数值限制请参考上面玩法介绍）
      n个球全中的概率是从n个球中选出n个，从剩下的m-n个中选出6-n个， Cn n 有1种，result = C (m-n) (6-n)  得出结果相乘1*result
     n个球全中n-1个的概率是从n个球中选出n-1个，从剩下的m-n（因已经计算过全中的情况，所以要从没有猜中的球中选）个中选出6-(n-1)个， result1 = Cn (n-1) 有1种，result 2= C (m-n) (6-n-1)  得出结果相乘result1*result2
 * 
 * 
 */
const combination = (m: number, n: number) => {
    let k = 1;
    let j = 1;
    for (let i = n; i >= 1; i--) {
        k = k * m;
        j = j * n;
        m--;
        n--;
    }
    return k / j;
}

export const ssQCalculateAward = (
    red: number, 
    guessRed: number, 
    blue: number, 
    guessBlue: number
) =>{
    const RED = 6;
    const BLUE = 1;
    const MAX_BLUE = 16;
    const MAX_RED = 20;

    if (red > MAX_RED || red < RED || guessRed > RED 
        || guessRed < 0 || blue < BLUE || BLUE > MAX_BLUE 
        || guessBlue > BLUE || guessBlue < 0 
    ) {
        return;
    }

    let notGuessBlue = blue - guessBlue;

    for (let i = guessRed; i >= 0; i--) {
        if (red - guessRed + i < 6) {
            break;
        }
        let records = combination(guessRed, i) * combination(red - guessRed, RED - i);
        if (records * guessBlue != 0) {
            console.log(`红球中：${i} 个,篮球中:${guessBlue}个的注数是:${records * guessBlue}`);
        }
        if (records * notGuessBlue != 0) {
            console.log(`红球中：${i} 个,篮球中0个的注数是：${records * guessBlue}`);
        }
    }

}

// 复式组合算法
// 传入红球、篮球数组
// 红球数量 > 6 <= 20
// 蓝球数量 > 0
export const generateDoubleChromosphere = (
    redBalls: Array<number>[]|null,
    nRed: number, 
    blueBalls: Array<number>[] | null,
    mBlue: number
) => {
    const _redBalls = redBalls || Array.from({ length: 33 }, (_, i) => i + 1); // 红球 1-33
    const _blueBalls = blueBalls || Array.from({ length: 16 }, (_, i) => i + 1); // 蓝球 1-16

    // 获取红球的组合
    const redCombinations = combine(_redBalls, nRed);
    // 获取蓝球的组合
    const blueCombinations = combine(_blueBalls, mBlue);

    // 输出所有红球和蓝球的组合
    let result = [] as any;
    redCombinations.forEach((redCombination) => {
      blueCombinations.forEach((blueCombination) => {
        result.push({
          red: redCombination,
          blue: blueCombination,
        });
      });
    });

    return result;
  }

  // 组合生成算法（n个从m个中选，C(m, n)）
  function combine(arr: any, n: number) {
    const result = <Array<any>>[];
    const temp = <Array<any>>[];

    function backtrack(start: number) {
      if (temp.length === n) {
        result.push([...temp]);
        return;
      }

      for (let i = start; i < arr.length; i++) {
        temp.push(arr[i]);
        backtrack(i + 1);
        temp.pop();
      }
    }

    backtrack(0);
    return result;
  }