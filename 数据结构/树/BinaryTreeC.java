package Tree;
//二叉树类
public class BinaryTreeC {
//根节点属性
	private TreeNode root;
	
	public BinaryTreeC() {}
	public BinaryTreeC(int data) {
		//根据data值创建节点对象
		TreeNode node = new TreeNode(data);
		//设置跟节点属性
		this.root = node;
	}

	/**
	 * @return the root
	 */
	public TreeNode getRoot() {
		return root;
	}

	/**
	 * @param root the root to set
	 */
	public void setRoot(TreeNode root) {
		this.root = root;
	}
	//添加元素的方法
	public void add(int data) {
		//根据data创建节点对象
		TreeNode tn = new TreeNode(data);
		if(root == null) {//没有根节点
			root = tn;//初始化跟节点
		}else {
			TreeNode temp = root;
			while(true) {
				if(data < temp.getData()) {
					if(temp.getLeftNode() == null) {
						temp.setLeftNode(tn);//当前节点没有左节点直接将传入的值放到左节点
						break;
					}
					//temp节点有左节点
					temp = temp.getLeftNode();//将temp节点往下一个左节点移动
					
				}else if(data > temp.getData()) {
					if(temp.getRightNode() == null) {
						temp.setRightNode(tn);//当前节点没有右节点直接将传入的值放到左节点
						break;
					}
					//temp节点有左节点
					temp = temp.getRightNode();//将temp节点往下一个右节点移动
				}else {//数据重复不需要添加
					break;
				}
				
			}
		}
	}
	
	//根据节点内容获得节点对象
	public TreeNode getNodeFun(int data) {
		TreeNode temp = root;
		while(true) {
			if(data == temp.getData()) {
				return temp;//跳出循环的条件，temp节点即为需要查找的节点
			}else if(data > temp.getData()) {
				//需要找的节点在根节点的右边
				temp = temp.getRightNode();//将当前节点往下移动一个右节点
			}else {
				temp = temp.getLeftNode();
			}
			
			//判断temp是否为null
			if(temp == null) {
				return null;//找到最后了 temp为叶节点，没找到需要找的值，直接返回null
			}
		}
	}
	
	//遍历二叉树
	public void orderPrint(TreeNode node) {
		if(node == null) return;
		//遍历左节点
		orderPrint(node.getLeftNode());
		//输出node对象的内容
		System.out.println(node.getData());
		//遍历右节点
		orderPrint(node.getRightNode());
	}
}
