import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X } from 'lucide-react';

export const Card = ({ cat, index, isFront, onSwipe }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    // Opacity transforms for icons
    const likeOpacity = useTransform(x, [20, 100], [0, 0.6]); // Reduced max opacity
    const nopeOpacity = useTransform(x, [-20, -100], [0, 0.6]); // Reduced max opacity

    const handleDragEnd = (event, info) => {
        const threshold = 100;
        if (info.offset.x > threshold) {
            onSwipe('right');
        } else if (info.offset.x < -threshold) {
            onSwipe('left');
        }
    };

    return (
        <motion.div
            style={{
                x: isFront ? x : 0,
                rotate: isFront ? rotate : 0,
                opacity: isFront ? opacity : 1 - index * 0.1,
                scale: 1 - index * 0.05,
                zIndex: 100 - index,
                position: 'absolute',
                width: '320px',
                height: '480px',
                borderRadius: '20px',
                background: 'white',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: isFront ? 'grab' : 'default',
                top: index * 10, // Stack effect offset
            }}
            drag={isFront ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: 'grabbing' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1 - index * 0.05, opacity: 1 - index * 0.1 }}
            exit={{ x: x.get() < 0 ? -500 : 500, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <img
                src={cat.url}
                alt="Cat"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none',
                }}
            />

            {/* Visual Feedback Overlay */}
            {isFront && (
                <>
                    <motion.div
                        style={{
                            opacity: likeOpacity,
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            zIndex: 10,
                            transform: 'rotate(-15deg)'
                        }}
                    >
                        <div style={{ background: 'white', borderRadius: '50%', padding: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                            <Heart size={48} fill="#4ecdc4" color="#4ecdc4" />
                        </div>
                    </motion.div>

                    <motion.div
                        style={{
                            opacity: nopeOpacity,
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            zIndex: 10,
                            transform: 'rotate(15deg)'
                        }}
                    >
                        <div style={{ background: 'white', borderRadius: '50%', padding: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                            <X size={48} color="#ff6b6b" strokeWidth={4} />
                        </div>
                    </motion.div>

                    <div style={{
                        position: 'absolute',
                        bottom: '30px',
                        left: 0,
                        width: '100%',
                        textAlign: 'center',
                        color: 'white',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        pointerEvents: 'none'
                    }}>
                    </div>
                </>
            )}
        </motion.div>
    );
};
