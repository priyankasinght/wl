import React, { useState } from 'react';
import moment from 'moment';
import CommitActivity from './CommitActivity';
import './RepoListItems.css';

const RepoListItem = ({ repo }) => {
  const [showCommitActivity, setShowCommitActivity] = useState(false);

  const handleShowCommitActivity = () => {
    setShowCommitActivity(true);
  };

  const handleCloseCommitActivity = () => {
    setShowCommitActivity(false);
  };

  return (
    <div className="repo-card">
      <img src={repo.owner.avatar_url} alt={repo.owner.login} className="repo-avatar" />
      <div className="repo-info">
        <h3 className="repo-name">{repo.name}</h3>
        <p className="repo-description">{repo.description}</p>
        <div className="repo-stats">
          <span className="repo-stars">{repo.stargazers_count} stars</span>
          <span className="repo-issues">{repo.open_issues_count} issues</span>
          <span>Submitted {moment(repo.created_at).fromNow()} by {repo.owner.login}</span>
        </div>
      </div>
      <button onClick={handleShowCommitActivity}>View commits</button>
      {showCommitActivity && (
        <CommitActivity
          repoName={repo.name}
          ownerName={repo.owner.login}
          onClose={handleCloseCommitActivity}
        />
      )}
    </div>
  );
};

export default RepoListItem;
