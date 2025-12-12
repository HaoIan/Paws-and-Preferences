import React from 'react';
import { motion } from 'framer-motion';
import { Cat, RefreshCw } from 'lucide-react';

export const Summary = ({ likedCats, onRestart }) => {
    return (
        <motion.div
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
                width: '90%',
                maxWidth: '600px',
                maxHeight: '85vh',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'auto',
                boxShadow: 'var(--shadow-strong)',
                background: 'rgba(255, 255, 255, 0.85)'
            }}
        >
            <div style={{ background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)', padding: '16px', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 8px 16px rgba(255, 107, 107, 0.3)' }}>
                <Cat color="white" size={40} />
            </div>

            <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>All done!</h2>
            <p style={{ marginBottom: '2rem', opacity: 0.7, fontSize: '1.1rem' }}>
                You liked <strong style={{ color: 'var(--color-secondary)' }}>{likedCats.length}</strong> out of 10 cats ({likedCats.length / 10 * 100}%)
            </p>

            {likedCats.length > 0 ? (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                        gap: '12px',
                        width: '100%',
                        marginBottom: '2.5rem'
                    }}>
                        {likedCats.map(cat => (
                            <motion.img
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                key={cat.id}
                                src={cat.url}
                                alt="Liked Cat"
                                style={{
                                    width: '100%',
                                    aspectRatio: '1',
                                    objectFit: 'cover',
                                    borderRadius: '16px',
                                    boxShadow: 'var(--shadow-soft)'
                                }}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div style={{ margin: '2rem 0', opacity: 0.5, textAlign: 'center' }}>
                    <p>No cats liked? Try again!</p>
                </div>
            )}

            <button
                onClick={onRestart}
                style={{
                    background: 'var(--color-primary)',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: 'var(--shadow-strong)'
                }}
            >
                <RefreshCw size={20} />
                Find more cats
            </button>
        </motion.div>
    );
};
