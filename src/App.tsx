import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback } from 'react';
import { ImageNode } from './components/ImageNode';

const nodeTypes = {
  'image-node': ImageNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'image-node',
    position: { x: 100, y: 100 },
    data: {
      label: '主人公',
      image: 'https://placehold.co/100x100/pink/white?text=Top',
    },
  },
  {
    id: '2',
    type: 'image-node',
    position: { x: 400, y: 100 },
    data: {
      label: 'ヒロイン',
      image: 'https://placehold.co/100x100/skyblue/white?text=Bottom',
    },
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', label: '巨大感情', animated: true }];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const addNode = () => {
    const newNode = {
      id: Date.now().toString(),
      type: 'image-node',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: '新キャラ',
        image: 'https://placehold.co/100x100/gray/white?text=New',
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onConnect = useCallback(
    (params: Connection) => {
      const label = window.prompt('関係性を入力してください');
      if (label === null) return;
      setEdges((eds) => addEdge({ ...params, label, animated: true }, eds));
    },
    [setEdges]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button onClick={addNode} style={{ position: 'absolute', zIndex: 10, margin: 10 }}>
        キャラ追加
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
