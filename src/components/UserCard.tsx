import { useQuery, useMutation } from "@tanstack/react-query";
import type {GitHubUser} from "../types/GitHubUser";
import { checkIfFollowingUser, followGitHubUser, unfollowGitHubUser } from "../api/github";
import { FaGithubAlt, FaUserMinus, FaUserPlus } from "react-icons/fa6";
import {toast} from 'sonner';

interface UserCardProps {
  user: GitHubUser
}

const UserCard = ({user} : UserCardProps) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {data:isFollowing, refetch} =useQuery({
    queryKey: ['folow-status', user.login],
    queryFn: () => checkIfFollowingUser(user.login),
    enabled: !!user.login
  });

  const followMutation = useMutation({
    mutationFn: () => followGitHubUser(user.login),
    onSuccess: () => {
      toast.success(`You are now following ${user.login}`);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

    const unfollowMutation = useMutation({
    mutationFn: () => unfollowGitHubUser(user.login),
    onSuccess: () => {
      toast.success(`You are no longer following ${user.login}`);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleFollow = () => {
    if (isFollowing) {
      unfollowMutation.mutate();
    } else {
        followMutation.mutate();
    }
  }

  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.name} className="avatar"/>
      <h2>{user.name || user.login}</h2>
      <p className="bio">{user.bio}</p>
      <div className="user-card-buttons">
        <button disabled= {followMutation.isPending || unfollowMutation.isPending} onClick={handleFollow} className={`follow-btn ${isFollowing ? 'following' : ''}`}>
          {isFollowing ? (
            <>
              <FaUserMinus className="follow-icon"/> Unfollow
            </>
          ): (
            <>
              <FaUserPlus className="follow-icon"/> Follow User
            </>
          )}
        </button>
        <a className="profile-btn" href={user.html_url} target="_blank" rel="noopener noreferrer">
          <FaGithubAlt/> View Github Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;