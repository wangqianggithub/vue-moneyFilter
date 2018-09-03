//金钱格式全局过滤器,vue自2.0版本起，已经没有内置currency过滤器了
//currency，￥/$
//decimals，保留几位小数
Vue.filter('money', function(value, currency, decimals) {
    var regNum = /\d/;      //判断是否为非数字类型字符串，如：？
    if(regNum.test(value)){
        const digitsRE = /(\d{3})(?=\d)/g;
        value = parseFloat(value);
        if (!isFinite(value) || (!value && value !== 0)) return '';
        currency = currency != null ? currency : '$';
        decimals = decimals != null ? decimals : 2;
        var stringified = Math.abs(value).toFixed(decimals);
        var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
        var i = _int.length % 3;
        var head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) : '';
        var _float = decimals ? stringified.slice(-1 - decimals) : '';
        var sign = value < 0 ? '-' : '';
        return sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
    }else{
        return currency+value;    //非数字类型字符串返回：如，￥？
    }
});


使用：
<p>{{ num | money('￥',2)}}</p>
