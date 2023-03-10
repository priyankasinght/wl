import axios from 'axios';

const BASE_URL = 'https://api.github.com';

const getRepositories = async (timeframe) => {
  const url = `${BASE_URL}/search/repositories?q=created:>${timeframe}&sort=stars&order=desc`;
  const response = await axios.get(url);
  return response.data.items;
};

const getWeeklyStats = async (owner, repo, additionsOrDeletions) => {
  const url = `${BASE_URL}/repos/${owner}/${repo}/stats/code_frequency`;
  const response = await axios.get(url);

  const stats = {
    weekStartDates: [],
    totalChanges: [],
    weeklyChanges: {},
  };

  response.data.forEach((week) => {
    const weekStartDate = new Date(week[0] * 1000).toLocaleDateString();
    stats.weekStartDates.push(weekStartDate);

    const totalChanges = week[1] + week[2];
    stats.totalChanges.push(totalChanges);

    if (!stats.weeklyChanges[weekStartDate]) {
      stats.weeklyChanges[weekStartDate] = [];
    }
    const weeklyChange = additionsOrDeletions === 'additions' ? week[1] : week[2];
    stats.weeklyChanges[weekStartDate].push(weeklyChange);
  });

  return stats;
};

export default {
  getRepositories,
  getWeeklyStats,
};
