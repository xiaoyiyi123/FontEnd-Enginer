/**
 * 节点类
 */
class Node{
	constructor(data,next){
		this.data = data;
		this.next = next;
	}
}
let node1_last = new Node(6,null);
let node1_3 = new Node(5,node1_last);
let node1_2 = new Node(3,node1_3);
let node1_1 = new Node(1,node1_2);

let node2_last = new Node(8,null);
let node2_3 = new Node(7,node2_last);
let node2_2 = new Node(4,node2_3);
let node2_1 = new Node(2,node2_2);

//console.log(node1_1);
//console.log(node2_1);

function merge(head1, head2){
	if(head1 === null && head2 === null){
		//console.log('头节点全都为空')
		return null;
	}if(head1 === null){
		//console.log('head1头节点全都为空')
		return head2;
	}if(head2 === null){
		//console.log('head2头节点全都为空')
		return head1;
	}
		//合并后链表的头节点和尾节点
		var headNode = null,
			lastNode = null;
		//head1,head2同时不为空
		if(head1.data > head2.data){
			//console.log('head1.data > head2.data')
			headNode = head2;
			lastNode = head2;
			head2 = head2.next;
		}else{
			//console.log('head1.data < head2.data')
			headNode = head1;
			lastNode = head1;
			head1 = head1.next;
		}
		//设置一个循环每次取出两个链表中较小的值，插入到合并后链表的尾部，并设置合并后链表的尾节点
		//循环条件是两个链表的头节点均不为空
		while(head1 !== null && head2 !== null){
			//console.log(head1.data)
			if(head1.data > head2.data){
				//console.log('head1.data > head2.data')
				lastNode.next = head2;
				lastNode = head2;
				head2 = head2.next;
			}else{
				//console.log('head1.data < head2.data')
				lastNode.next = head1;
				lastNode = head1;
				head1 = head1.next;
				//console.log(head1)
			}
		}
		//跳出while循环
		if(head1 === null){
			//如果链表1的头节点为空，则直接将链表2的头节点及其后面的节点插入到合并后的链表中
			//console.log('head1 === null')
			lastNode.next = head2;
		}else{
			//console.log('head2 === null')
			lastNode.next = head1;
		}
	return headNode;
}
function display(head){
	if(head === null){
		return;
	}
	var temp = head;
	while(true){
		//console.log(temp)
		if(temp === null) break;
		console.log(temp.data);
		temp = temp.next;
	}
}
//display(node2_1);
var mergeHead = merge(node1_1,node2_1);
display(mergeHead);

