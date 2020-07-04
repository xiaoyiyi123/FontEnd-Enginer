//定义：闭包是指有权访问另一个函数作用域中的变量的函数。最常见的创建方式在一个函数内部创建另一个函数。
//闭包的作用：1.可以读取函数内部的变量。2.让这些变量的值始终保持在内存中。
function f1(){
    //f1中的变量n一直保存在内存中，并没有在f1调用之后被自动清除
    //f1是f2的父函数，f1返回一个函数f2
    var n = 999;
    nAdd = function(){ //nAdd是一个全局变量同时也是匿名函数，也是一个闭包
       n+=1; 
    }
    function f2(){
        console.log(n);
    }
    return f2;
}
var result = f1();//f1返回一个函数f2，并将f2赋值给全局变量result
//这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，
//不会在调用结束后，被垃圾回收机制（garbage collection）回收。
result();//999
nAdd();
result();//1000
// 使用闭包的注意点
// 1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
// 2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

var name = "This Window";
var object={
    name: "My Object",
    getNameFunc: function(){
        return function(){
            return this.name;
        };
    },
    getName: function(){
        return this.name;
    }
};
console.log(object.getNameFunc()());//This Window
console.log(object.getName());//My Object

var name = "This Window";
var obj = {
    name: "My Object",
    getNameFunc1: function(){
        var that = this;
        return function(){
            return that.name;
        }
    }
}
console.log(obj.getNameFunc1()());//My Object