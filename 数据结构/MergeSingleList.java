package LinkedList;

public class MergeSingleList {

	public static void main(String[] args) {
		//创建链表1
		Node node1Last = new Node(6);
		Node node1_3 = new Node(5,node1Last);
		Node node1_2 = new Node(3,node1_3);
		Node node1_1 = new Node(1,node1_2);
		//创建链表2
		Node node2Last = new Node(8);
		Node node2_3 = new Node(7,node2Last);
		Node node2_2 = new Node(4,node2_3);
		Node node2_1 = new Node(2,node2_2);
		
		Node mergeHead = merge(node1_1,node2_1);
		printList(mergeHead);
	}
	
	/**
	 * 合并两个有序链表
	 * head1为链表1的首节点
	 * head2为链表2的首节点
	 * return返回合并后链表的首节点
	 * */
	public static Node merge(Node head1, Node head2) {
		//处理head1和head2都为null的情况
		if(head1 == null && head2 == null){
			return null;
		}
		if(head1 == null) {
			return head2;
		}
		if(head2 == null) {
			return head1;
		}
		//定义headNode和lastNode分别作为合并后的链表的头节点和尾节点
		Node headNode = null;
		Node lastNode = null;
		//获取head1和head2中数据值较小的节点，并设置为合并后的首节点和尾节点
		if(head1.data > head2.data) {
			headNode = head2;
			lastNode = head2;
			//更新head2 的值，往后移动
			head2 = head2.next;
		}else {
			headNode = head1;
			lastNode = head1;
			head1 = head1.next;
		}
		//定义一个循环，依次获得链表1和链表2中较小的值
		while(head1 != null && head2 != null) {
			if(head1.data > head2.data) {
				lastNode.next = head2;//将较小的值插入到合并后的链表中
				lastNode = head2;//更新合并后的链表的尾节点将head2设置为当前的尾节点
				//更新head2 的值，往后移动
				head2 = head2.next;
			}else {
				lastNode.next = head1;
				lastNode = head1;
				head1 = head1.next;
			}
			//循环执行完毕，如果某个链表的首节点不是null，将链表的首节点及其剩余节点添加到合并链表的尾节点
			if(head1 == null) {//head2可能不为null
				lastNode.next = head2;
			}else {
				lastNode.next = head1;
			}
		}
		//返回合并后链表的首节点		
		return headNode;
	}
	
	public static void printList(Node node) {
		//先判断链表是否为空
		if(node.next == null) {
			System.out.println("链表为空");
			return;
		}
		Node temp = node;
		while(temp != null) {
			System.out.println(temp.data);
			temp = temp.next;
		}
	}
	
	private static class Node{
		int data;
		private Node next;
		
		//初始化data
		public Node(int data) {
			this.data = data;
		}
		public Node(int data,Node next) {
			this.data = data;
			this.next = next;
		}
	}	
}
