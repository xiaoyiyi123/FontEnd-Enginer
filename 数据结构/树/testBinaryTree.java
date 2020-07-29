package Tree;
//将一个数组转化为二叉树
public class testBinaryTree {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int a[] = {3,1,0,2,7,5,8,9};
		BinaryTreeC bt = new BinaryTreeC();
		
		//遍历数组
		for(int i = 0; i < a.length; i++) {
			int data = a[i];
			//调用bt类的add方法添加数据
			bt.add(data);
		}
		
		System.out.println(bt.getNodeFun(3));
		System.out.println(bt.getNodeFun(10));
		
		bt.orderPrint(bt.getNodeFun(3));
	}

}
