import { useState, useEffect } from 'react';
import { Post } from '../types';
import { MOCK_POSTS } from '../constants';

const API_BASE = '/api';

// Check if we're in production (API available) or development (use mock data)
const isApiAvailable = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE}/posts`, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
};

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [useApi, setUseApi] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);

            // First check if API is available
            const apiAvailable = await isApiAvailable();
            setUseApi(apiAvailable);

            if (apiAvailable) {
                try {
                    const response = await fetch(`${API_BASE}/posts`);
                    const result = await response.json();

                    if (result.success) {
                        setPosts(result.data);
                    } else {
                        setError(result.error);
                        // Fallback to mock data
                        setPosts(MOCK_POSTS);
                    }
                } catch (err: any) {
                    setError(err.message);
                    setPosts(MOCK_POSTS);
                }
            } else {
                // Use mock data in development
                setPosts(MOCK_POSTS);
            }

            setLoading(false);
        };

        fetchPosts();
    }, []);

    const refetch = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/posts`);
            const result = await response.json();
            if (result.success) {
                setPosts(result.data);
            }
        } catch (err) {
            // Keep existing data
        }
        setLoading(false);
    };

    return { posts, loading, error, useApi, refetch };
};

export const usePost = (slug: string) => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);

            const apiAvailable = await isApiAvailable();

            if (apiAvailable) {
                try {
                    const response = await fetch(`${API_BASE}/posts/${slug}`);
                    const result = await response.json();

                    if (result.success) {
                        setPost(result.data);
                    } else {
                        // Fallback to mock data
                        const mockPost = MOCK_POSTS.find(p => p.slug === slug) || null;
                        setPost(mockPost);
                    }
                } catch (err: any) {
                    setError(err.message);
                    const mockPost = MOCK_POSTS.find(p => p.slug === slug) || null;
                    setPost(mockPost);
                }
            } else {
                // Use mock data in development
                const mockPost = MOCK_POSTS.find(p => p.slug === slug) || null;
                setPost(mockPost);
            }

            setLoading(false);
        };

        if (slug) {
            fetchPost();
        }
    }, [slug]);

    return { post, loading, error };
};
