/**
 * 
 */
//创建单链表并向单链表尾部添加数据
function NodeInfo(no,name){
	this.no = no;
	this.name = name;
	this.next = null;
}
var head =  new NodeInfo(0, " ");
function SingleList(){
	this.addNode = addNode;
	this.addByIndex = addByIndex;
	this.update = update;
	this.deleteN = deleteN;
	this.reverse = reverse;
	this.deleteLastN = deleteLastN;
	this.hasCircle = hasCircle;
	this.display = display;
}

function addNode(node){//添加新节点
	var temp = head;
	//console.log(temp)
	while(true){
		if(temp.next === null){
			break;
		}
		temp = temp.next;	
	}
	temp.next = node;
}
function addByIndex(n,node){
	var temp = head;
	var index = 0;
	while(true){
		if(temp.next === null) {
			break;
		}else if(index === n-1){
			//这里为什么是n-1？因为需要将新的节点插入到第n个节点的位置，以为着新节点将取代第n个节点成为第n个节点
			//所以新节点的next域指向原本的第n个节点，所以当index等于n-1的时候将新节点插入
			//console.log(index)
			node.next = temp.next;
			temp.next = node;
			break;
		}else{
			temp = temp.next;
			index++;
		}
	}
}
function update(n,node){
	if(head.next === null){
		return;//链表为空直接返回
	}
	var temp = head;
	var index = 0;
	while(true){
		if(temp === null) {
			console.log("链表不为空，但是直到整个链表遍历完还是没有找到要查找的值");
			return;
		}else if(index === n){
			//console.log(temp.name)
			temp.name = node.name;
			return;
		}else{
			temp = temp.next;
			index++;
		}
	}
	
}
//删除第n个节点，要找到第n个节点前面的那个节点，然后将此时的temp.next指向temp.next.next这样就读不到第n个节点，因此就将它删除了
function deleteN(n){
	if(head.next === null){
		return;//链表为空直接返回
	}
	var temp = head;
	var index = 0;
	while(true){
		if(temp === null){
			console.log("链表不为空，但是直到整个链表遍历完还是没有找到要查找的值");
			break;
		}else if(index === n-1){
			//console.log(index)
			temp.next = temp.next.next;
			break;
		}else{
			temp = temp.next;
			index++;
		}
	}
}

//返回倒数第n个节点
function kToLast(head, k){
	if(head === null){
		return -1;
	}
	var temp = head,
		len =0;
	while(temp !== null){
		len++;
		temp = temp.next;
	}
	for(var i = 0; i < len - k; i++){
		head = head.next;
	}
	return head;
}

function reverse(head) {
	var prevNode = null,
		nextNode = null;
	if(head.next == null || head.next.next == null) {
		console.log("链表为空或着只有一个节点");
		return;
	}while(head!=null) {
		nextNode = head.next;
		head.next = prevNode;
		prevNode = head;
		head = nextNode;
	}
	var reverseHead = prevNode;//将反转后的链表输出
	var temp = reverseHead;
	while(temp != null) {
		console.log(temp.name);
		temp = temp.next;
	}
}
//删除倒数第n个节点
var removeNthFromEnd = function(head, n) {
    var temp = new ListNode(-1);
    temp.next = head;
    var  fast = temp,
        slow = temp;
    while(n--){//先让fast往前移动n次
        fast = fast.next;
    }
    while(fast !== null && fast.next !== null){
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;

    return temp.next;
};
//链表的长度
function getLength(head){
	var listLen = 0;
	if(head.next === 0){
		return;
	}
	var temp = head;
	while(temp !== null){
		listLen++;
		temp = temp.next;
	}
	return listLen;
}

//判断是否有环
function hasCircle(head){
	if(head === null){
		return false;//链表为空
	}
	var fast = head,
		slow = head;
	while(fast !== null && fast.next !== null){
		fast = fast.next.next;
		slow = slow.next;
		if(fast === slow){
			return true
		}
	}
	return false;
}

function display(){//显示链表信息
	
	if(head.next === null){
		console.log('konglianbiao');
		return;
	}
	var temp = head;
	while(true){
		if(temp === null) break;
		console.log(`tempNo ${temp.no} tempName ${temp.name}`)
		temp = temp.next;
	}
}
var node1 = new NodeInfo(1, " Wang");
var node2 = new NodeInfo(2,"Liu")
var node3 = new NodeInfo(3,"Wu")
var node4 = new NodeInfo(4,"MA")
var node5 = new NodeInfo(5,"LLLLLLLLLL")
var singleList = new SingleList();
singleList.addNode(node1);
singleList.addNode(node2);
singleList.addNode(node3);
singleList.addNode(node4);
singleList.addByIndex(2,node5);
singleList.display();
console.log("===========================")
//singleList.update(1, node5);
//singleList.display();
//console.log("===========================")
//singleList.deleteN(1);
//singleList.display();
//console.log("===========================")
//singleList.reverse(node1);
singleList.deleteLastN(2,node1);
singleList.display();
console.log("===========================")
console.log(singleList.hasCircle(node1));

