import React from 'react';
import { Database, Cpu, Target, Layers } from 'lucide-react';

export default function ModelOverview({ modelInfo }) {
  return (
    <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
        System & Dataset Overview
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div style={{ padding: '1.25rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--interactive-cyan)', marginBottom: '0.5rem', fontWeight: 600 }}>
            <Database size={18} /> Dataset
          </div>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {modelInfo?.dataset || 'MNIST Benchmark'}
          </p>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>70,000 Grayscale Digits</span>
        </div>

        <div style={{ padding: '1.25rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--interactive-cyan)', marginBottom: '0.5rem', fontWeight: 600 }}>
            <Target size={18} /> Input Resolution
          </div>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {modelInfo?.input_size || '28x28 Grayscale'}
          </p>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>1 Channel Normalized Tensor</span>
        </div>

        <div style={{ padding: '1.25rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--interactive-cyan)', marginBottom: '0.5rem', fontWeight: 600 }}>
            <Layers size={18} /> Target Classes
          </div>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {modelInfo?.num_classes || 10} Digits (0 - 9)
          </p>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Softmax Categorical Output</span>
        </div>

        <div style={{ padding: '1.25rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--interactive-cyan)', marginBottom: '0.5rem', fontWeight: 600 }}>
            <Cpu size={18} /> Deep Learning Engine
          </div>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {modelInfo?.framework || 'PyTorch 2.0+'}
          </p>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{modelInfo?.device ? `Running on ${modelInfo.device.toUpperCase()}` : 'CPU/GPU Acceleration'}</span>
        </div>
      </div>
    </div>
  );
}
