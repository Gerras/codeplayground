interface Node<T extends string | number> {
  left: Node<T> | null;
  right: Node<T> | null;
  nodeValue: T;
}

// Binary Search Tree class. So far just did the addNode. Still need to do delete and the tree-walks.
class RecursiveBinarySearchTree<T extends string | number> {
  private root: Node<T> | null = null;

  public get Root() {
    return this.root;
  }

  public addNode(parentNode: Node<T> | null, node: Node<T>): void {
    if (parentNode === null) {
      this.root = node;
      return;
    }
    if (node.nodeValue > parentNode.nodeValue) {
      if (parentNode.right === null) {
        parentNode.right = node;
        return;
      } else {
        return this.addNode(parentNode.right, node);
      }
    } else {
      if (parentNode.left === null) {
        parentNode.left = node;
        return;
      } else {
        return this.addNode(parentNode.left, node);
      }
    }
  }

  public add(value: T) {
    return this.addNode(this.root, {
      left: null,
      right: null,
      nodeValue: value,
    });
  }

  public addNodes(nodes: T[]) {
    nodes.forEach((value) => {
      this.add(value);
    });
  }
}

// Testing.
const tree = new RecursiveBinarySearchTree();
tree.addNodes([8, 10, 15, 12, 3, 6, 9, 4, 1]);

console.log(tree.Root);
