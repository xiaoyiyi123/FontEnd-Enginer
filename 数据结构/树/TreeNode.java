package Tree;

public class TreeNode {

	int data;//每个节点的数据域
	TreeNode leftNode;//左子节点
	TreeNode rightNode;//右子节点
	
	public TreeNode() {}
	public TreeNode(int data) {
		this.data = data;
	}
	/**
	 * @return the data
	 */
	public int getData() {
		return data;
	}
	/**
	 * @param data the data to set
	 */
	public void setData(int data) {
		this.data = data;
	}
	/**
	 * @return the leftNode
	 */
	public TreeNode getLeftNode() {
		return leftNode;
	}
	/**
	 * @param leftNode the leftNode to set
	 */
	public void setLeftNode(TreeNode leftNode) {
		this.leftNode = leftNode;
	}
	/**
	 * @return the rightNode
	 */
	public TreeNode getRightNode() {
		return rightNode;
	}
	/**
	 * @param rightNode the rightNode to set
	 */
	public void setRightNode(TreeNode rightNode) {
		this.rightNode = rightNode;
	}
	@Override
	public String toString() {
		return "TreeNode [data=" + data + "]";
	}

	
	
}
