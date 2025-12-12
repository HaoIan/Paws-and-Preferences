import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Card } from './Card';

export const CardStack = ({ cats, currentIndex, onSwipe }) => {
    // Show only the next few cards for performance and visual stack effect
    const visibleCats = cats.slice(currentIndex, currentIndex + 3);

    return (
        <div style={{ position: 'relative', width: '300px', height: '460px', display: 'flex', justifyContent: 'center' }}>
            <AnimatePresence>
                {visibleCats.map((cat, i) => (
                    <Card
                        key={cat.id}
                        cat={cat}
                        index={i}
                        isFront={i === 0}
                        onSwipe={onSwipe}
                    />
                ))}
            </AnimatePresence>
            {visibleCats.length === 0 && (
                <div className="glass-panel" style={{ width: '100%', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p>No more cats!</p>
                </div>
            )}
        </div>
    );
};
