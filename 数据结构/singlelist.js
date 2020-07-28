/**
 * 
 */
//首先创建一个节点对象用于存储每个节点的数据域和next域
class HeroNode{
	constructor(no,name,nickName){
		this.no = no;
		this.name = name;
		this.nickName = nickName;
		this.next = null;//指向下一个节点的指针
	}
	
}

let head = new HeroNode(0," ", " ");
//console.log(head);
//链表的长度将求链表长度的函数作为全局变量
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
//创建单链表
class singleList{
	constructor(head){
		this.head = head;
		
	}
	addNode(heroNode){
		//找到当前链表的最后一个节点，将当前节点的next指向新的节点
		var temp = head;
		while(true){
			if(temp.next === null){
				break;
			}
			//如果没有找到最后，将temp后移
			temp = temp.next;
		}
		//当退出while循环式，temp就指向了链表的最后
		//将最后这个节点的next指向新的节点
		temp.next = heroNode;
	}
	addByIndex(n,node){
		var temp = head;
		var index = 0;
		while(true){
			if(temp.next === null) {
				break;
			}else if(index === n-1){
				//这里为什么是n-1？因为需要将新的节点插入到第n个节点的位置，以为着新节点将取代第n个节点成为第n个节点
				//所以新节点的next域指向原本的第n个节点，所以当index等于n-1的时候将新节点插入
				console.log(index)
				node.next = temp.next;
				temp.next = node;
				break;
			}else{
				temp = temp.next;
				index++;
			}
		}
		
	}
	update(n,node){
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
				console.log(temp.name)
				temp.name = node.name;
				temp.no = node.no;
				return;
			}else{
				temp = temp.next;
				index++;
			}
		}
		
	}
	//删除第n个节点，要找到第n个节点前面的那个节点，然后将此时的temp.next指向temp.next.next这样就读不到第n个节点，因此就将它删除了
	deleteN(n){
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
	
	//反转单链表
	reverse(head) {
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
		var reverseHead = prevNode;//将反转后的链表输出reverseHead为反转后链表的头
		var temp = reverseHead;
		while(temp != null) {
			console.log(temp.name);
			temp = temp.next;
		}

	}
	
	//删除掉倒数第n个节点
	deleteLastN(n, head){
		var len = getLength(head);
		console.log(len)
		if(head.next === null || n > len){
			return;
		}
		var temp = head,
			index = 0;
		while(true){
			if(temp === null){
				console.log("此时为链表结尾跳出循环");
				break;
			}else if(index === len - n -1){
				temp.next = temp.next.next;
				break;
			}else{
				index++;
				temp = temp.next;
			}
		}
	}
	
	hasCircle(head){
		if(head === null){
			return false;
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
		return false;//当fast指针指向的值为null或者fast指针的下一个值为null跳出循环，单链表无环
	}

	display(){
	
		if(head.next === null){
			console.log('konglianbiao');
			return;
		}
		var temp = head;
		while(true){
			if(temp === null) break;
			console.log(`tempNo ${temp.no} tempName ${temp.name} tempNickname ${temp.nickName}`)
			temp = temp.next;
		}
}
}

let list = new singleList(head);
let heroNode = new HeroNode(1, 'LIU','liu');
let heroNode1 = new HeroNode(2, 'WANG','wang');
let heroNode2 = new HeroNode(3, 'ZHANG','zhang');
let heroNode3 = new HeroNode(4, 'LI','li');
let heroNode4 = new HeroNode(5, 'ZHU','zhu');
let heroNode5 = new HeroNode(6, 'ZHANG','zhang');
list.addNode(heroNode)
list.addNode(heroNode1)
list.addNode(heroNode2)
list.addNode(heroNode3)
list.addNode(heroNode4)
list.addByIndex(2,heroNode5)
list.display();
console.log("=================================")
//let heroNode6 = new HeroNode(7, 'ZHANG3','zhang3');
//list.update(3,heroNode6);
//list.display();
//console.log("=================================")
//list.deleteN(6);
//list.display();
//console.log("===========================");
//list.reverse(heroNode)
list.deleteLastN(2,heroNode);
list.display();
console.log(list.hasCircle(heroNode));
