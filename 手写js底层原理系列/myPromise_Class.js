//1.自定义整体结构
/**
 * 定义一个Promise函数模块
 * 使用es5中的立即执行函数来定义
 */
(function (window) {
  class Promise {
    constructor(excutor) {
      const PENDING = "pending";
      const FULFILLED = "fulfilled";
      const REJECTED = "rejected";
      var self = this;
      //储备一些promise对象的相关属性
      self.status = PENDING; //初始化一个状态
      self.data = null; //给promise准备一盒可以用来存放数据的属性
      self.callbacks = []; //每个元素的结构为{onResolved(){},onRejected(){}}
      function resolve(value) {
        //如果 当前状态不是pending直接结束
        if (self.status !== PENDING) {
          return;
        }
        //执行resolve首先将状态改为fulfilled，
        self.status = FULFILLED;
        //数据保存
        self.data = value;
        //如果有待执行的回调函数，立即执行异步回调函数
        if (self.callbacks.length > 0) {
          setTimeout(() => {
            //将所有成功的回调放到事件队列里面去异步执行
            self.callbacks.forEach((callbacksObj) => {
              callbacksObj.onResolved(value);
            });
          }, 0);
        }
      }
      function reject(reason) {
        //如果 当前状态不是pending直接结束
        if (self.status !== PENDING) {
          return;
        }
        //执行reject首先将状态改为rejected，
        self.status = REJECTED;
        //数据保存
        self.data = value;
        //如果有待执行的回调函数，立即执行异步回调函数
        if (self.callbacks.length > 0) {
          setTimeout(() => {
            //将所有成功的回调放到事件队列里面去异步执行
            self.callbacks.forEach((callbacksObj) => {
              callbacksObj.onRejected(reason);
            });
          }, 0);
        }
      }
      try {
        //立即同步执行执行器函数
        excutor(resolve, reject);
      } catch (error) {
        //如果promise抛出异常，将状态变为rejected
        reject(error);
      }
    }
    //因为then，catch, resolve,reject,all,race
    //所有的对象都可以使用所以要在Promise对象的原型对象上定义这些函数
    /**
     * onResolved:成功的回调函数
     * onRejected:失败的回调函数
     */
    then(onResolved, onRejected) {
      onResolved =
        typeof onResolved === "function" ? onResolved : (value) => value;
      //指定默认的失败回调，并实现异常穿透
      onRejected =
        typeof onRejected === "function"
          ? onRejected
          : (reason) => {
              throw reason;
            };
      //调用回调函数，根据执行的结果改变return的promise状态
      function handler(callback) {
        /**
         * 如果抛出异常，return的promise就会失败
         * 失败的原因reason就是error
         */
        try {
          const result = callback(self.data);
          //判断函数的返回值是否是Promise的实例对象
          if (result instanceof Promise) {
            //如果回调函数返回的是promise对象，return的promise结果就是当前的这个promise结果
            result.then(
              (value) => {
                resolve(value);
              },
              (reason) => {
                reject(reason);
              }
            );
          } else {
            /**
             * 如果回调函数返回的不是promise，
             * return的promise就会成功，
             * value就是函数的返回值
             */
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      }
      //then 需要return一个心扉promise
      var self = this;
      //返回一个信的promise对象
      return new Promise((resolve, reject) => {
        //假设当前状态还是 pending状态的时候将回调函数保存起来
        if (self.status === PENDING) {
          self.callbacks.push(
            {
              onResolved(value) {
                handler(onResolved);
              },
              onResolved(reason) {
                handler(onRejected);
              },
            },
            0
          );
        } else if (self.status === FULFILLED) {
          setTimeout(() => {
            handler(onResolved);
          }, 0);
        } else {
          setTimeout(() => {
            handler(onRejected);
          }, 0);
        }
      });
    }
    catch(onRejected) {
      return this.then(undefined, onRejected);
    }
    static resolve(value) {
      //返回一个成功或者失败的promise
      return new Promise((resolve, reject) => {
        //value 是promise
        if (value instanceof Promise) {
          value.then(resolve, reject); //value是一个promise，通过.then活的结果，成功的结果调用resolve，失败则调用reject
        } else {
          resolve(value);
        }
      });
    }
    static reject(reason) {
      //返回一个失败的promise
      return new Promise((resolve, reject) => {
        reject(reason);
      });
    }
    //参数promises是一个数组里面是一些promise对象
    static all(promises) {
      const values = new Array(promises.length); //用来保存所有数据成功的数组,并指定value的长度
      //用计数器来保存成功的次数
      let count = 0;
      return new Promise((resolve, reject) => {
        //遍历promises获取每个promise的结果
        promises.forEach((p, index) => {
          Promise.resolve(p).then(
            (value) => {
              count++;
              //p成功将成功的value保存到values
              values[index] = value;
              //如果全部成功，将return的promise状态改为成功
              if (count === promises.length) {
                resolve(values);
              }
            },
            (reason) => {
              //只要有一个失败了，return的promise就失败
              reject(reason);
            }
          );
        });
      });
    }
    static race(promises) {
      return new Promise((resolve, reject) => {
        promises.forEach((p, index) => {
          Promise.resolve(p).then(
            (value) => {
              //一旦有一个成功了，即改为成功的状态
              resolve(value);
            },
            (reason) => {
              reject(reason);
            }
          );
        });
      });
    }
    static resolveDelay(value, time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          //value 是promise
          if (value instanceof Promise) {
            value.then(resolve, reject); //value是一个promise，通过.then活的结果，成功的结果调用resolve，失败则调用reject
          } else {
            resolve(value);
          }
        }, time);
      });
    }
    static rejectDelay(reason, time) {
      return new Promsie((resolve, reject) => {
        setTimeout(() => {
          reject(reason);
        });
      }, time);
    }
  }

  window.Promise = Promise; //向外暴露一个接口
})(window);
