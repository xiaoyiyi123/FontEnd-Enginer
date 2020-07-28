package LinkedList;

public class SingleLinkedListDemo {
	public static void main(String[] args) {
		//测试
		//先创建节点
		HeroNode heroNode1 = new HeroNode(1,"宋江","及时雨");
		HeroNode heroNode2 = new HeroNode(2,"卢俊义","玉麒麟");
		HeroNode heroNode3 = new HeroNode(3,"无用","智多星");
		HeroNode heroNode4 = new HeroNode(4,"林冲","豹子头");
		HeroNode heroNode5 = new HeroNode(5,"林冲1","豹子头1");
		//加入
		SingleLinkedList singleLinkedList = new SingleLinkedList();
		singleLinkedList.add(heroNode1);
		singleLinkedList.add(heroNode2);
		singleLinkedList.add(heroNode3);
		singleLinkedList.add(heroNode4);
		singleLinkedList.addByIndex(2,heroNode5);
		singleLinkedList.printList(heroNode1);
		
		System.out.println("==========================");
//		HeroNode heroNode6 = new HeroNode(6,"林","豹");
//		singleLinkedList.update(3, heroNode6);
//		singleLinkedList.list();
//		System.out.println("==========================");
//		singleLinkedList.deleteN(5);
//		singleLinkedList.list();
//		System.out.println("==========================");
//		HeroNode reverseHead = singleLinkedList.reverse(heroNode1);
//		singleLinkedList.printList(reverseHead);
//		System.out.println("==========================");
		singleLinkedList.deleteLastN(3,heroNode1);
		singleLinkedList.list();
		
		int lastK = singleLinkedList.kthToLast(heroNode1, 2);
		System.out.println(lastK);
		
		boolean flag = singleLinkedList.hasCircle(heroNode1);
		System.out.println(flag);
		
		boolean flag1 = singleLinkedList.hasCircle(heroNode1);
		System.out.println(flag1);
	}

	
}

//定义singleLikedList
class SingleLinkedList{
	//先初始化一个头节点,不存放具体数据
	private HeroNode head = new HeroNode(0, "","");
	//找到当前链表的最后一个节点，将当前节点的next指向新的节点
	public void add(HeroNode heroNode) {
		//因为头节点不能动，使用辅助变量temp使其执向头节点
		HeroNode temp = head;
		//System.out.println(head.next);
		//System.out.println(temp.next);
		while(true) {
			if(temp.next == null) {
				//System.out.println(temp.next);
				break;
			}
			//如果没有找到最后，将temp后移
			temp = temp.next;
			//System.out.println(temp.next);
		}
		//当退出while循环式，temp就指向了链表的最后
		//将最后这个节点的next指向新的节点
		temp.next = heroNode;
		System.out.println("下一个节点"+temp.next);
	}
	//指定位置添加一个新节点
	public void addByIndex(int n, HeroNode heroNode) {
		HeroNode temp = head;
		int index = 0;
		boolean flag = true;
		while(true) {
			if(temp.next == null) {
				return;
			}if(index == n-1) {
				//这里为什么是n-1？因为需要将新的节点插入到第n个节点的位置，以为着新节点将取代第n个节点成为第n个节点
				//所以新节点的next域指向原本的第n个节点，所以当index等于n-1的时候将新节点插入
				heroNode.next = temp.next;
				temp.next = heroNode;
				break;
			}else {
				temp = temp.next;
				index++;
			}
			
		}
	}
	//修改第n个节点的信息
	public void update(int n, HeroNode heroNode) {
		if(head.next == null) {
			System.out.println("链表为空");
		}
		HeroNode temp = head;
		int index = 0;
		while(true) {
			if(temp== null) {//到达链表最后，已经遍历完这个链表
				System.out.println("meizhaozhao");
				return;
			}if(index == n) {
				temp.name = heroNode.name;
				break;
			}else {
				temp = temp.next;
				index++;
			}
			
		}
	}
	public void deleteN(int n) {
		if(head.next == null) {
			System.out.println("链表为空");
			return;
		}
		HeroNode temp = head;
		int index = 0;
		while(true) {
			if(temp== null) {//到达链表最后，已经遍历完这个链表
				System.out.println("meizhaozhao");
				return;
			}else if(index == n-1) {
				temp.next = temp.next.next;
				break;
			}else {
				temp = temp.next;
				index++;
			}
			
		}
	}
	
	//反转单链表
	public static HeroNode reverse(HeroNode head) {
		HeroNode prevNode = null;
		HeroNode nextNode = null;
		if(head.next == null || head.next.next == null) {
			System.out.println("链表为空或着只有一个节点");
			return head;
		}while(head!=null) {
			nextNode = head.next;
			head.next = prevNode;
			prevNode = head;
			head = nextNode;
		}
		return prevNode;//反转后链表的头节点
	}
	//删除掉倒数第n个节点
	public void deleteLastN(int n, HeroNode head ) {
		int len = getLength(head);//整个链表的长度
		
		if(head.next == null || n > len) {
			System.out.println("链表为空");
			return;
		}
		HeroNode temp = head;
		int index = 0;
		while(true) {
			if(temp== null) {//到达链表最后，已经遍历完这个链表
				System.out.println("meizhaozhao");
				return;
			}else if(index == len - n -1) {
				temp.next = temp.next.next;
				break;
			}else {
				temp = temp.next;
				index++;
			}		
		}
	}
	
	//返回倒数第n个节点
	public int kthToLast(HeroNode head, int k) {
		if(head == null) return -1;
		int index = 0;
		HeroNode temp = head;
		while(temp != null) {
			index++;
			temp = temp.next;
		}
		for(int i = 0; i < index - k; i++) {
			head = head.next;
		}
		return head.no;
	}
	
	
	//判断单链表是否有环
	public static boolean hasCircle(HeroNode head) {
		
		if(head == null) {
			return false;
		}
		//设置快慢指针让快指针每次往下走两个节点，慢指针每次往下走一个节点
		HeroNode fast = head;
		HeroNode slow = head;
		while(fast != null && fast.next != null) {
			fast = fast.next.next;
			slow = slow.next;
			if(fast == slow) {
				return true;
			}
		}
		return false;
	}
	public static int getLength(HeroNode head) {
		int listLen = 0;
		if(head.next == null) {
			System.out.println("链表为空");
			return listLen;
		}
		HeroNode temp = head;
		while(temp != null) {
			listLen++;
			temp = temp.next;
		}
		return listLen;
	}
	public void printList(HeroNode node) {
		//先判断链表是否为空
		if(head.next == null) {
			System.out.println("链表为空");
			return;
		}
		HeroNode temp = node;
		while(temp != null) {
			System.out.println(temp.name);
			temp = temp.next;
		}
	}
	
	
	
	//显示链表通过一个辅助变量来遍历链表
	public void list() {
		//先判断链表是否为空
		if(head.next == null) {
			System.out.println("链表为空");
			return;
		}
		//通过一个辅助变量来遍历链表
		HeroNode temp = head.next;
		while(true) {
			//先判断链表是否为空
			if(temp == null) {
				break;
			}
			//输出节点的信息
			System.out.println(temp);
			//将temp后移
			temp = temp.next;
		}
	}
}

//定义HeroNode，每个HeroNode对象就是一个节点
class HeroNode{
	public int no;
	public String name;
	public String nickName;
	public HeroNode next; //指向下一个节点 next是一个HeroNode这个类的一个实例对象
	
	
	//构造器（创建对象调用，初始化对象的变量）
	public HeroNode(int no, String name, String nickName) {
		this.no = no;
		this.name = name;
		this.nickName = nickName;		
	}

	@Override
	public String toString() {
		return "HeroNode [no=" + no + ", name=" + name + ", nickName=" + nickName + "]";
	}
	
}

