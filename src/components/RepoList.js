import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import RepoListItem from './RepoListItem';
import './RepoList.css';

const RepoList = () => {
    const [repos, setRepos] = useState([]);
    const [timeFrame, setTimeFrame] = useState('1 month');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getDate = useCallback(() => {
        const today = new Date();
        if (timeFrame === '1 week') {
            return new Date(today.setDate(today.getDate() - 7)).toISOString().slice(0, 10);
        }
        if (timeFrame === '2 weeks') {
            return new Date(today.setDate(today.getDate() - 14)).toISOString().slice(0, 10);
        }
        return new Date(today.setDate(today.getDate() - 30)).toISOString().slice(0, 10);
    }, [timeFrame]);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.github.com/search/repositories?q=created:>${getDate()}&sort=stars&order=desc&page=${page}`)
            .then((response) => {
                setRepos([...repos, ...response.data.items]);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [timeFrame, page, getDate, repos]);

    const handleTimeFrameChange = (event) => {
        setTimeFrame(event.target.value);
        setRepos([]);
        setPage(1);
    };

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    return (
        <div className="repo-list">
            <h2>Most starred Github repositories created in the last {timeFrame}</h2>
            <select className='repo-list-select' value={timeFrame} onChange={handleTimeFrameChange}>
                <option value="1 week">Last 1 week</option>
                <option value="2 weeks">Last 2 weeks</option>
                <option value="1 month">Last 1 month</option>
            </select>
            <div className="repo-items">
                {repos.map((repo) => (
                    <RepoListItem key={repo.id} repo={repo} />
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {!loading && (
                <button className='loading' onClick={handleLoadMore}>Load more</button>
            )}
        </div>
    );
};

export default RepoList;


