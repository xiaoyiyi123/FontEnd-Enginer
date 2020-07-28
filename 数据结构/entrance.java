package LinkedList;



//判断链表是否有环并且输出环的入口
public class entrance {

	public static void main(String[] args) {
		//创建链表
		Node last = new Node(66);
		Node fifth = new Node(55,last);
		Node fourth = new Node(44,fifth);
		Node third = new Node(33,fourth);
		Node second = new Node(22,third);
		Node first = new Node(11,second);
		
		fifth.setNext(fourth);
		
		Node entranceNode = findEntrance(first);
		System.out.println(entranceNode.data);
	}
	public static Node findEntrance(Node head) {
		if(head == null) {
			return head;
		}
		Node fast = head;
		Node slow = head;
		Node temp = null;
		
		while(fast != null && fast.next != null) {
			fast = fast.next.next;
			slow = slow.next;
			if(fast.equals(slow)) {
				System.out.println("0000000000");
				break;
			}
		}
		 if (fast == null || fast.next == null) {
	            return null;
	        }
		temp = head;
        while (temp != fast) {
        	System.out.println("11111111111111");
            temp = temp.next;
            fast = fast.next;
        }
       
		return temp;
	}
	
}
