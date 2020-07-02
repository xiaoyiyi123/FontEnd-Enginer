// 相关概念
// 稳定：如果a原本在b前面，而a=b，排序之后a仍然在b的前面。
// 不稳定：如果a原本在b的前面，而a=b，排序之后 a 可能会出现在 b 的后面。
// 时间复杂度：对排序数据的总的操作次数。反映当n变化时，操作次数呈现什么规律。
// 空间复杂度：是指算法在计算机内执行时所需存储空间的度量，它也是数据规模n的函数。 

//1.冒泡算法
//冒泡排序的平均时间复杂度为 O(n²) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(1) ，是稳定排序。
//冒泡排序的基本思想是，对相邻的元素进行两两比较，顺序相反则进行交换，这样，每一趟会将最小或最大的元素“浮”到顶端， 最终达到完全有序。
function bubbleSort(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return;
    let lastIndex = arr.length - 1;
    while (lastIndex > 0) { // 当最后一个交换的元素为第一个时，说明后面全部排序完毕
        let flag = true, k = lastIndex;
        for (let j = 0; j < k; j++) {
            if (arr[j] > arr[j + 1]) {
                flag = false;
                lastIndex = j; // 设置最后一次交换元素的位置
                //console.log(lastIndex);
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
            
        }
        //console.log(lastIndex);
      	if (flag) break;
    }
    return arr;
}
console.log(bubbleSort([2,1,4,3,5,0]));

//2.选择排序
// 它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，
// 然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
// 算法描述
// n个记录的直接选择排序可经过n-1趟直接选择排序得到有序结果。具体算法描述如下：
// 初始状态：无序区为R[1..n]，有序区为空；
// 第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。
// 该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
// n-1趟结束，数组有序化了
function selectSort(arr){
    let len = arr.length;
    if(!Array.isArray(arr) || len<=1){
        return;//如果不是数组或者数组只有一个元素则直接返回不用排序了
    }
    for(let i=0; i<len-1;i++){// 外层循环设置最小值索引为当前索引
        let minIndex = i;
        for(let j=i+1; j<len; j++){// 在后面的未排序的数组中找到最小值索引
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        //交换最小元素到当前位置
        [arr[i],arr[minIndex]] = [arr[minIndex],arr[i]];
    }
    return arr;
}
console.log(selectSort([2,1,4,3,5,0]));
// 选择排序不管初始序列是否有序，时间复杂度都为 O(n²)。
// 选择排序的平均时间复杂度为 O(n²) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(1) ，不是稳定排序。

//3.插入排序
//先准备一个空数组，从需要排序的数组中随便取出一个值插入到这个新数组中去
//继续从需要排序的数组中取数往新数组中插，每次插入钱与当前新数组中的已有数据相比较
//如果新牌A比新数组中某张B牌大则插入到B后面，否则往前比
//如果已经是第一张牌，则直接放上去即可
function insertSort(arr){
    let res = [];
    res.push(arr[0]);
    for(let i = 1; i < arr.length; i++){//原来需要排序的数组
        for(let j = res.length; j>=0;j--){//新数组当中的数据
            if(arr[i] > res[j]){
                res.splice(j+1,0,arr[i]);
                break;
            }if(j===0){
                res.unshift(arr[i]);
            }
        }
    }
    return res;
}
console.log(insertSort([2,1,4,3,5,0]));
//插入排序平均时间复杂度为 O(n²) ，最坏时间复杂度为 O(n²) ，最好时间复杂度O(n),空间复杂度为 O(1) ，是稳定排序

//4.快速排序
//快速排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(logn) ，不是稳定排序。
function quick(arr){

    if(arr.length<=1) return arr;
    let middleIndex = Math.floor(arr.length/2);
    let middleItem = arr.splice(middleIndex,1)[0];
    var left = [];
    var right = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] < middleItem){
            left.push(arr[i]);
          
        }else{
            right.push(arr[i]);
        }
    }
    var result = quick(left).concat(middleItem,quick(right));
    return result;
}
let arr = [2,1,4,3,5,0];
console.log(quick(arr));

//5.希尔排序
//希尔排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(n^s) ，空间复杂度为 O(1) ，不是稳定排序。
function shellSort(arr){
    let len = arr.length;
    if(!Array.isArray(arr) || len<=1) return;
    for(var gap = Math.floor(len/2);gap>0;gap=Math.floor(gap/2)){//希尔排序的增量序列
        //对每个分组使用插入排序，但是把原始的插入排序的1改为gap
        for(var i = gap; i< len; i++){
            var j = i,
                current = arr[i];
            while(j-gap>=0 && current < arr[j-gap]){
                arr[j] = arr[j-gap];
                j = j - gap;
            }
            arr[j] = current;
        }
    }
    return arr;
}
console.log(shellSort([2,1,4,3,5,0]));

//6.归并排序
//首先把长度为n的数组分成两个长度为n/2的子数组
//对这两个子数组分别采用归并排序
//将两个排序好的子数组合并为最终的排序数列
//归并排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(nlogn) ，空间复杂度为 O(n) ，是稳定排序。
function mergeSort(arr){
    var len = arr.length;
    if(len<2){
        return arr;
    }
    var middleIndex = Math.floor(len/2),
        left = arr.slice(0,middleIndex),
        right = arr.slice(middleIndex);
    return merge(mergeSort(left),mergeSort(right));
}
function merge(left,right){

    var result = [];
    while(left.length>0 && right.length>0){
        if(left[0]<=right[0]){
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }
    }
    while(left.length){
        result.push(left.shift);
    }while(right.shift){
        result.push(right.shift);
    }

    return result;
}
console.log(mergeSort([2,1,4,3,5,0]));

//堆排序
// 将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
// 将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
// 由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。

//堆排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(nlogn) ，空间复杂度为 O(1) ，不是稳定排序。
var len;    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
 
function buildMaxHeap(arr) {   // 建立大顶堆
    len = arr.length;
    for (var i = Math.floor(len/2); i >= 0; i--) {
        heapify(arr, i);
    }
}
 
function heapify(arr, i) {     // 堆调整
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;
 
    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }
 
    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }
 
    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
}
 
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
 
function heapSort(arr) {
    buildMaxHeap(arr);
 
    for (var i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    return arr;
}
