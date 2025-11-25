import { Background, Controls, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 100, y: 100 },
    data: { label: '主人公' },
  },
  {
    id: '2',
    position: { x: 400, y: 100 },
    data: { label: 'ヒロイン' },
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', label: '巨大感情', animated: true }];

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow defaultNodes={initialNodes} defaultEdges={initialEdges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
