//延迟获取元素
const getElement = function(id,callback){
    var i = 0,
        fun = () => {
            var $id = document.getElementById(id);
            i ++;
            if($id){
                clearInterval(timer);
                callback && callback($id);
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

module.exports = getElement