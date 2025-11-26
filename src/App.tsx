import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { toPng } from 'html-to-image';
import { useCallback, useRef } from 'react';
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

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: '巨大感情',
    animated: true,
    labelBgStyle: { fill: '#ffffff', fillOpacity: 1 },
    labelBgPadding: [2, 4],
    labelBgBorderRadius: 4,
    style: { stroke: '#555555', strokeWidth: 2 },
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const ref = useRef<HTMLDivElement>(null);

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
      setEdges((eds) => {
        const newEdges = addEdge(params, eds);
        return newEdges.map((edge) => {
          if (edge.source === params.source && edge.target === params.target) {
            return {
              ...edge,
              label,
              animated: true,
              labelBgStyle: { fill: '#ffffff', fillOpacity: 1 },
              labelBgPadding: [2, 4],
              labelBgBorderRadius: 4,
              style: { stroke: '#555555', strokeWidth: 2 },
            };
          }
          return edge;
        });
      });
    },
    [setEdges]
  );

  const onDownload = useCallback(() => {
    if (ref.current === null) return;

    toPng(ref.current, {
      cacheBust: true,
      backgroundColor: '#ffffff',
      fontEmbedCSS: '',
      filter: (node) => {
        if (node.tagName === 'BUTTON') {
          return false;
        }
        return true;
      },
    })
      .then((dataURL) => {
        const link = document.createElement('a');
        link.download = 'lily-flow.png';
        link.href = dataURL;
        link.click();
      })
      .catch((err) => {
        console.error('保存に失敗しました', err);
      });
  }, [ref]);

  return (
    <div style={{ width: '100vw', height: '100vh' }} ref={ref}>
      <button onClick={addNode} style={{ position: 'absolute', zIndex: 10, margin: 10 }}>
        キャラ追加
      </button>
      <button
        onClick={onDownload}
        style={{ position: 'absolute', zIndex: 10, top: 10, right: 10, margin: 10 }}
      >
        画像保存
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
