import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({ current, total }) => {
  const progress = Math.min((current / total) * 100, 100);

  return (
    <div style={{ width: '100%', maxWidth: '320px', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '500', opacity: 0.7 }}>
        <span>{current} of {total}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div style={{ width: '100%', height: '8px', background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #ff6b6b, #ff8e8e)', borderRadius: '10px' }}
        />
      </div>
    </div>
  );
};
