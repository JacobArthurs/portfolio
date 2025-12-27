import { ChangeDetectorRef, Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-minimax',
  imports: [],
  templateUrl: './minimax.html',
  styleUrl: './minimax.scss',
})

export class MinimaxComponent {
  protected nodes: Node[] = [
    { id: 0, parent: undefined, type: 'max', state: 'idle', level: 0, position: 0 },
    { id: 1, parent: 0, type: 'min', state: 'idle', level: 1, position: 0 },
    { id: 2, parent: 0, type: 'min', state: 'idle', level: 1, position: 1 },
    { id: 3, parent: 1, type: 'max', state: 'idle', level: 2, position: 0 },
    { id: 4, parent: 1, type: 'max', state: 'idle', level: 2, position: 1 },
    { id: 5, parent: 2, type: 'max', state: 'idle', level: 2, position: 2 },
    { id: 6, parent: 2, type: 'max', state: 'idle', level: 2, position: 3 },
    { id: 7, parent: 3, type: 'min', state: 'idle', level: 3, position: 0 },
    { id: 8, parent: 3, type: 'min', state: 'idle', level: 3, position: 1 },
    { id: 9, parent: 4, type: 'min', state: 'idle', level: 3, position: 2 },
    { id: 10, parent: 4, type: 'min', state: 'idle', level: 3, position: 3 },
    { id: 11, parent: 5, type: 'min', state: 'idle', level: 3, position: 4 },
    { id: 12, parent: 5, type: 'min', state: 'idle', level: 3, position: 5 },
    { id: 13, parent: 6, type: 'min', state: 'idle', level: 3, position: 6 },
    { id: 14, parent: 6, type: 'min', state: 'idle', level: 3, position: 7 }
  ];
  private animationSequence: AnimationStep[] = [
    { nodeId: 0, state: 'exploring' },
    { nodeId: 1, state: 'exploring' },
    { nodeId: 3, state: 'exploring' },
    { nodeId: 7, state: 'exploring' },
    { nodeId: 7, state: 'idle' },
    { nodeId: 8, state: 'exploring' },
    { nodeId: 8, state: 'idle' },
    { nodeId: 3, state: 'idle' },
    { nodeId: 4, state: 'exploring' },
    { nodeId: 9, state: 'exploring' },
    { nodeId: 9, state: 'idle' },
    { nodeId: 10, state: 'pruned' },
    { nodeId: 4, state: 'idle' },
    { nodeId: 1, state: 'idle' },
    { nodeId: 2, state: 'exploring' },
    { nodeId: 5, state: 'exploring' },
    { nodeId: 11, state: 'exploring' },
    { nodeId: 11, state: 'idle' },
    { nodeId: 12, state: 'exploring' },
    { nodeId: 12, state: 'idle' },
    { nodeId: 5, state: 'idle' },
    { nodeId: 6, state: 'pruned' },
    { nodeId: 13, state: 'pruned' },
    { nodeId: 14, state: 'pruned' },
    { nodeId: 2, state: 'idle' },
    { nodeId: 0, state: 'optimal' },
    { nodeId: 1, state: 'optimal' },
    { nodeId: 3, state: 'optimal' },
    { nodeId: 8, state: 'optimal' }
  ];
  protected marginY: number = 32;
  protected nodeRadius: number = 0;
  protected edgeStroke: number = 0;
  protected componentWidth: number = 0;
  protected componentHeight: number = 0;
  protected nodePositions: Map<number, { x: number, y: number }> = new Map();

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.onResize();
    this.animateAlphaBetaPruning();
  }

  @HostListener('window:resize')
  onResize() {
    this.componentWidth = this.elementRef.nativeElement.offsetWidth;
    this.componentHeight = Math.min(this.elementRef.nativeElement.offsetHeight, this.componentWidth);

    this.nodeRadius = this.componentWidth / 50;
    this.edgeStroke = this.componentWidth / 300;
    this.calculateAllNodePositions();
  }

  getEdges(): Edge[] {
    return this.nodes
      .filter(node => node.parent !== undefined)
      .map(node => this.createEdge(node));
  }

  protected async animateAlphaBetaPruning(): Promise<void> {
    for (const step of this.animationSequence) {
      if (step.state !== 'pruned') {
        await new Promise(resolve => setTimeout(resolve, 750));
      }
      
      const node = this.nodes.find(n => n.id === step.nodeId);
      if (!node) continue;

      node.state = step.state;
      this.cdr.detectChanges();
    }

    await new Promise(resolve => setTimeout(resolve,30000));
    for (const node of this.nodes) {
      node.state = 'idle';
    }

    this.animateAlphaBetaPruning();
  }

  private calculateAllNodePositions(): void {
    this.nodePositions.clear();

    const maxLevel = Math.max(...this.nodes.map(n => n.level));

    const minX = this.nodeRadius;
    const maxX = this.componentWidth - this.nodeRadius;
    const minY = this.nodeRadius + this.marginY;
    const maxY = this.componentHeight - this.nodeRadius - this.marginY;

    const root = this.nodes.find(n => n.parent === undefined)!;
    this.positionNodeRecursive(root.id, minX, maxX);

    this.nodes.forEach(node => {
      const pos = this.nodePositions.get(node.id)!;
      const y = maxLevel === 0 
        ? this.componentHeight / 2 
        : minY + (node.level / maxLevel) * (maxY - minY);

      this.nodePositions.set(node.id, { x: pos.x, y });
    });
  }

  private positionNodeRecursive(nodeId: number, minX: number, maxX: number): void {
    const children = this.nodes
      .filter(n => n.parent === nodeId)
      .sort((a, b) => a.position - b.position);

    if (children.length === 0) {
      // Leaf node
      const x = (minX + maxX) / 2;
      this.nodePositions.set(nodeId, { x, y: 0 });
      
      return;
    }

    // Divide space equally among children
    const availableWidth = maxX - minX;
    const childSpace = availableWidth / children.length;

    children.forEach((child, index) => {
      const childLeft = minX + (index * childSpace);
      const childRight = childLeft + childSpace;

      this.positionNodeRecursive(child.id, childLeft, childRight);
    });

    // Position parent at center of children
    const childXPositions = children.map(c => this.nodePositions.get(c.id)!.x);

    const x = (Math.min(...childXPositions) + Math.max(...childXPositions)) / 2;

    this.nodePositions.set(nodeId, { x, y: 0 });
  }
  
  private createEdge(node: Node): Edge {
    const parentNode = this.nodes.find(n => n.id === node.parent)!;
    const parentPos = this.nodePositions.get(parentNode.id)!;
    const childPos = this.nodePositions.get(node.id)!;
    const isPrunedParentEdge = node.state === 'pruned' && parentNode.state !== 'pruned';
    
    return {
      parentX: parentPos.x,
      parentY: parentPos.y,
      childX: childPos.x,
      childY: childPos.y,
      edgePath: `M ${parentPos.x} ${parentPos.y} L ${childPos.x} ${childPos.y}`,
      state: node.state,
      isPrunedParentEdge: isPrunedParentEdge,
      ...this.getStrikethrough(parentPos, childPos, isPrunedParentEdge)
    };
  }
  
  private getStrikethrough(parent: {x: number, y: number}, child: {x: number, y: number}, pruned: boolean) {
    if (!pruned) {
      return { strikethroughX1: 0, strikethroughY1: 0, strikethroughX2: 0, strikethroughY2: 0 };
    }
  
    const midX = (parent.x + child.x) / 2;
    const midY = (parent.y + child.y) / 2;
    const dx = child.x - parent.x;
    const dy = child.y - parent.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const perpX = (-dy / length) * this.nodeRadius;
    const perpY = (dx / length) * this.nodeRadius;
  
    return {
      strikethroughX1: midX - perpX,
      strikethroughY1: midY - perpY,
      strikethroughX2: midX + perpX,
      strikethroughY2: midY + perpY
    };
  }
}

interface Node {
  id: number;
  parent?: number;
  type: 'min' | 'max';
  state: 'idle' | 'exploring' | 'pruned' | 'optimal';
  level: number;
  position: number;
}

interface Edge {
  parentX: number;
  parentY: number;
  childX: number;
  childY: number;
  edgePath: string;
  state: 'idle' | 'exploring' | 'pruned' | 'optimal';
  isPrunedParentEdge: boolean;
  strikethroughX1: number;
  strikethroughY1: number;
  strikethroughX2: number;
  strikethroughY2: number;
}

interface AnimationStep {
  nodeId: number;
  state: 'idle' | 'exploring' | 'pruned' | 'optimal';
}
