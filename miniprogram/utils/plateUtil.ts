export const FilterHtml = (htmlStr: String) => {
    return htmlStr.replace(/\s/g, '')
            .replace(/&nbsp;/g, '')
            .replace(/<br \/>/g, '')
            .replace(/\n/g, '');
}

export const ParserPlateHtml = (htmlStr: String) =>{
    let _data = FilterHtml(htmlStr);

    let brandReg = /(?<=<i>品牌<\/i>).*?(?=<\/li>)/g;
    let localReg = /(?<=<i>所在地<\/i>).*?(?=<\/li>)/g;
    let colorReg = /(?<=<i>车身颜色<\/i>).*?(?=<\/li>)/g;
    let sexReg = /(?<=<i>车主性别<\/i>).*?(?=<\/li>)/g;

    let brand = _data.match(brandReg);
    let local = _data.match(localReg);
    let color = _data.match(colorReg);
    let sex = _data.match(sexReg);

    return {
        brand: brand ? brand[0] : '未知',
        local: local ? local[0] : '未知',
        color: color ? color[0] : '未知',
        sex: sex ? sex[0] : '未知',
    };
}