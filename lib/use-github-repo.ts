import { useState, useEffect } from 'react';

// Types
export interface GitHubRepoData {
  stargazers_count: number;
  forks_count: number;
}

export interface UseGitHubRepoReturn {
  data: GitHubRepoData | null;
  loading: boolean;
  error: string | null;
}

// Constants
const GITHUB_REPO_URL = 'https://github.com/KubeRocketCI/kuberocketai';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Custom hook for fetching GitHub repository data
export const useGitHubRepo = (repoUrl: string = GITHUB_REPO_URL): UseGitHubRepoReturn => {
  const [data, setData] = useState<GitHubRepoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepoData = async (): Promise<void> => {
      const cacheKey = `github-repo-${repoUrl}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      const cacheTime = sessionStorage.getItem(`${cacheKey}-time`);

      // Check if we have valid cached data (less than 10 minutes old)
      if (cachedData && cacheTime) {
        const age = Date.now() - parseInt(cacheTime, 10);
        if (age < CACHE_DURATION) {
          setData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
      }

      try {
        const repoPath = repoUrl.replace('https://github.com/', '');
        const response = await fetch(`https://api.github.com/repos/${repoPath}`);

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const repoData = await response.json();
        const result: GitHubRepoData = {
          stargazers_count: repoData.stargazers_count,
          forks_count: repoData.forks_count,
        };

        // Cache the result
        sessionStorage.setItem(cacheKey, JSON.stringify(result));
        sessionStorage.setItem(`${cacheKey}-time`, Date.now().toString());

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repository data');
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [repoUrl]);

  return { data, loading, error };
};

// Helper functions
export const formatStarCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export const GITHUB_REPO_URL_EXPORT = GITHUB_REPO_URL;
