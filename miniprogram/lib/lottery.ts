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