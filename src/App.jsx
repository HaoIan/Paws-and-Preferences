import React, { useState, useEffect } from 'react';
import { fetchCats } from './services/api';
import { CardStack } from './components/CardStack';
import { Summary } from './components/Summary';
import { ProgressBar } from './components/ProgressBar';
import { Heart, X, Loader2, Cat } from 'lucide-react';

function App() {
	const [cats, setCats] = useState([]);
	const [likedCats, setLikedCats] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [gameState, setGameState] = useState('loading'); // loading, playing, summary
	const [skip, setSkip] = useState(0);

	useEffect(() => {
		loadCats(0);
	}, []);

	const loadCats = async (offset = 0) => {
		setLoading(true);
		const newCats = await fetchCats(10, offset);
		setCats(newCats);
		setLoading(false);
		setGameState('playing');
		setCurrentIndex(0);
		setLikedCats([]);
	};

	const handleSwipe = (direction) => {
		const currentCat = cats[currentIndex];
		if (direction === 'right') {
			setLikedCats(prev => [...prev, currentCat]);
		}

		// Move to next card
		const nextIndex = currentIndex + 1;
		if (nextIndex >= cats.length) {
			setGameState('summary');
		} else {
			setCurrentIndex(nextIndex);
		}
	};

	const handleRestart = () => {
		const newSkip = skip + 10;
		setSkip(newSkip);
		loadCats(newSkip);
	};

	if (loading) {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
				<Loader2 className="animate-spin" size={48} color="var(--primary)" />
				<p>Herding cats...</p>
			</div>
		);
	}

	return (
		<div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
			{gameState === 'summary' ? (
				<Summary likedCats={likedCats} onRestart={handleRestart} />
			) : (
				<>
					<header style={{ marginBottom: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<div style={{ background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)', padding: '10px', borderRadius: '50%', marginBottom: '0.5rem', boxShadow: '0 8px 16px rgba(255, 107, 107, 0.3)' }}>
							<Cat color="white" size={28} />
						</div>
						<h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-text)', marginBottom: '0.2rem' }}>
							Paws & Preferences
						</h1>
						<p style={{ opacity: 0.6, fontSize: '0.85rem' }}>Find your favourite kitty</p>
					</header>

					<ProgressBar current={currentIndex + 1} total={cats.length} />

					<CardStack
						cats={cats}
						currentIndex={currentIndex}
						onSwipe={handleSwipe}
					/>

					<div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', zIndex: 10, width: '100%' }}>
						<button
							onClick={() => handleSwipe('left')}
							style={{
								width: '64px',
								height: '64px',
								borderRadius: '50%',
								background: 'white',
								color: '#ff6b6b',
								boxShadow: '0 10px 25px rgba(255, 107, 107, 0.2)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
							aria-label="Dislike"
						>
							<X size={28} strokeWidth={3} />
						</button>
						<button
							style={{
								width: '48px',
								height: '48px',
								borderRadius: '50%',
								background: 'white',
								color: '#cbd5e1',
								border: 'none',
								boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								cursor: 'pointer'
							}}
							aria-label="Restart"
							onClick={() => loadCats(skip)}
						>
							<Loader2 size={20} />
						</button>
						<button
							onClick={() => handleSwipe('right')}
							style={{
								width: '64px',
								height: '64px',
								borderRadius: '50%',
								background: 'linear-gradient(135deg, #4ecdc4, #26a69a)',
								color: 'white',
								boxShadow: '0 10px 25px rgba(78, 205, 196, 0.4)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
							aria-label="Like"
						>
							<Heart size={28} fill="white" strokeWidth={3} />
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default App;
