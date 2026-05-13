export const fetchGitHubUser = async (username : string) => {
   const res = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`);
      
    if(!res.ok) throw new Error('User Not Found');

    const data = await res.json();
    console.log(data);
    return data;
}

export const searchGitHubUser = async (query : string) => {
   const res = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`);
      
    if(!res.ok) throw new Error('User Not Found');

    const data = await res.json();
    return data.items;
}

export const checkIfFollowingUser = async (username:string) => {
  const res = await fetch(`/api/github/user/following/${username}`, {
    headers: { Accept: 'application/vnd.github+json' }
  });

  if(res.status === 204) {
    return true;
  } else if(res.status === 404) {
    return false;
  } else {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData.message || 'Failed to check follow status');
  }
}

export const followGitHubUser = async (username:string) => {
  const res = await fetch(`/api/github/user/following/${username}`, {
    method: 'PUT',
    headers: { Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' }
  });

  if(!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to follow user');
  }

  return true
}

export const unfollowGitHubUser = async (username:string) => {
  const res = await fetch(`/api/github/user/following/${username}`, {
    method: 'DELETE',
    headers: { Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' }
  });

  if(!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to unfollow user');
  }

  return true
}