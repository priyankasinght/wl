import React, { useEffect, useState } from 'react';
import RepoList from './components/RepoList';
import github from './services/github';
import './App.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [timeframe, setTimeframe] = useState('1 month');

  useEffect(() => {
    const timeframeMap = {
      '1 week': 'weekly',
      '2 weeks': 'weekly',
      '1 month': 'monthly',
    };
    const timeframeParam = timeframeMap[timeframe];
    github.getRepositories(timeframeParam).then((data) => {
      setRepositories(data);
    });
  }, [timeframe]);

  return (
    <div className="App">
      <h1 className='heading'>Most Starred Github Repositories</h1>
      <RepoList repositories={repositories} setTimeframe={setTimeframe} />
    </div>
  );
}

export default App;
