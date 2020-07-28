package LinkedList;
//两个相交链表的第一个交点
public class interact {
	public static void main(String[] args) {
		Node lastNode = new Node(77);
		Node node6 = new Node(66,lastNode);
		Node node3 = new Node(33,node6);
		Node node2 = new Node(22,node3);
		Node head1 = new Node(11,node2);
		Node node5 = new Node(55,node6);
		Node head2 = new Node(44,node5);
		
		Node commonNode = getFirstCommonNode(head1,head2);
		System.out.println(commonNode.data);
	}
	
	public static Node getFirstCommonNode(Node head1,Node head2) {
		//1.处理head1或head2为null
		if(head1 == null || head2 == null) {
			return null;
		}
		//获得以head1为首节点的链表长度
		int len1 = getLength(head1);
		//获得以head2为首节点的链表长度
		int len2 = getLength(head2);
		//定义longNode指针用于指向长度较长单链表的首节点
		Node longNode = len1 > len2 ? head1 : head2;
		Node shortNode = len1 < len2 ? head1 : head2;
		//让longNode指针往后移动len1-len2次
		for(int i = 0; i < Math.abs(len1 - len2); i++) {
			longNode = longNode.getNext();
		}
		while(longNode != shortNode) {
			longNode = longNode.getNext();
			shortNode = shortNode.getNext();
		}//longNode == shortNode时跳出循环得到相交的第一个节点
		return longNode;
	}
	
	public static int getLength(Node head) {
		int len = 0;
		Node temp = head;
		while(temp != null) {
			temp = temp.next;
			len++;
		}
		return len;
	}
}
