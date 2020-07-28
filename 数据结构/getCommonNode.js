/**
 * 获取两个相交链表的第一个共同节点
 */
class Node{
	constructor(data,next){
		this.data = data;
		this.next = next;
	}
	setNext(next){
		this.next = next;
	}
}
let lastNode = new Node(77,null);
let node6 = new Node(66,lastNode);
let node3 = new Node(33,node6);
let node2 = new Node(22,node3);
let head1 = new Node(11,node2);
let node5 = new Node(55,node6);
let head2 = new Node(44,node5);

function getCommonNode(head1,head2){
	var len1 = getLength(head1);
	var len2 = getLength(head2);
	//定义longNode指着指向长度较长的链表
	var longNode = len1 > len2 ? head1 : head2;
	//定义shortNode指着指向长度较短的链表
	var shortNode = len1 < len2 ? head1 : head2;
	//让long指针向后移动len1-len2次
	for(var i = 0; i < Math.abs(len1 - len2); i++){
		longNode = longNode.next;
	}
	while(longNode !== shortNode){
		longNode = longNode.next;
		shortNode = shortNode.next;
	}
	//longNode == shortNode时跳出循环得到相交的第一个节点
	return longNode;
}
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
console.log(getCommonNode(head1,head2));