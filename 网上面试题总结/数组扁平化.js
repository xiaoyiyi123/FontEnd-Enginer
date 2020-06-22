//数组去重并拍平
//输入[1,[2,3],[[4],[4,5]]]output[1,2,3,4,5]
var arr = [1,[2,3],[[4],[4,5]]];
function flatten(arr){
    var result  = [];
    for(var i = 0, len = arr.length; i < len; i++){
        if(Array.isArray(arr[i])){
            result= result.concat(flatten(arr[i]))
        }else{
            result.push(arr[i])
        }
    }
    return  result;
}
var arrProcess = Array.from(new Set(flatten(arr)));

console.log(arrProcess);
//数组去重并拍平并升序
var arr1 = [1,[4,5],[2,3],[[4,5],[4],[4,5]]];
function flatten1(arr){
    return arr.reduce(function(prev,next){
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    },[]);
}
//去重
var uniq = Array.from(new Set(flatten1(arr1)))
//console.log(uniq);
//排序
var re = uniq.sort(function(a,b){
    return a-b;
});
console.log(re);
