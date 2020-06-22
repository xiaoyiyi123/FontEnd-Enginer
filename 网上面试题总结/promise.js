//红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用Promse实现）

function red(){
    console.log("red");
}
function green(){
    console.log("green");
}
function yellow(){
    console.log("yellow");
}

var light = function(timmer,cb){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            cb();
            resolve();
        },timmer);
    });
};

var step = function(){
    Promise.resolve().then(function(){
        return light(3000,red);
    }).then(function(){
        return light(1000,green);
    }).then(function(){
        return light(2000,yellow);
    }).then(function(){
        step();
    });
};

step();
