import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

type ImageNodeData = {
  label: string;
  image?: string;
};

const handleStyle = {
  width: 10,
  height: 10,
  background: '#777',
};

export function ImageNode({ data }: NodeProps<Node<ImageNodeData>>) {
  return (
    <div
      style={{
        padding: '10px',
        borderRadius: '8px',
        background: '#fff',
        border: '1px solid #ddd',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        minWidth: '100px',
        position: 'relative',
      }}
    >
      <Handle type="target" position={Position.Top} id="t-in" style={handleStyle} />
      <Handle type="source" position={Position.Top} id="t-out" style={handleStyle} />

      <Handle type="target" position={Position.Right} id="r-in" style={handleStyle} />
      <Handle type="source" position={Position.Right} id="r-out" style={handleStyle} />

      <Handle type="target" position={Position.Bottom} id="b-in" style={handleStyle} />
      <Handle type="source" position={Position.Bottom} id="b-out" style={handleStyle} />

      <Handle type="target" position={Position.Left} id="l-in" style={handleStyle} />
      <Handle type="source" position={Position.Left} id="l-out" style={handleStyle} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {data.image && (
          <img
            src={data.image}
            alt="icon"
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '4px',
              marginBottom: '8px',
            }}
          />
        )}
        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{data.label}</div>
      </div>
    </div>
  );
}
