const BASE_URL = 'https://cataas.com';

export const fetchCats = async (limit = 10, skip = 0) => {
  try {
    const response = await fetch(`${BASE_URL}/api/cats?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cats');
    }
    const data = await response.json();
    // Transform data to ensure we have full URLs
    return data.map(cat => ({
      id: cat.id,
      url: `${BASE_URL}/cat/${cat.id}`,
      tags: cat.tags
    }));
  } catch (error) {
    console.error('Error fetching cats:', error);
    return [];
  }
};
