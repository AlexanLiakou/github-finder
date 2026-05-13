import { FaGithubAlt } from "react-icons/fa6";
import type {GitHubUser} from "../types/GitHubUser";

interface UserCardProps {
  user: GitHubUser
}

const UserCard = ({user} : UserCardProps) => {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.name} className="avatar"/>
      <h2>{user.name || user.login}</h2>
      <p className="bio">{user.bio}</p>
      <a className="profile-btn" href={user.html_url} target="_blank" rel="noopener noreferrer">
        <FaGithubAlt/> View Github Profile
      </a>
    </div>
  );
};

export default UserCard;