//延迟获取元素
const getD3 = function(callback){
    var i = 0,
        fun = () => {
            i ++;
            if(d3){
                clearInterval(timer);
                callback && callback();
            } else {
                if(i > 20){
                    clearInterval(timer);
                } else{
                    fun();
                }
            }
        },
        timer = setInterval(fun, 50);
}

module.exports = getD3