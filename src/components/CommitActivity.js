import React from 'react';
import { Line } from 'react-chartjs-2';

const CommitActivity = ({ repo, handleCloseCommitActivity }) => {
// function to format data for chart
const formatChartData = (data) => {
const labels = data.map((week) => week.week_start);
const commits = data.map((week) => week.total);
const contributors = Object.keys(data[0].days).map((day) => {
return {
label: day,
data: data.map((week) => week.days[day]),
fill: false,
borderColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16), // generate random color
};
});
return { labels, commits, contributors };
};

// generate chart data
const chartData = formatChartData(repo.commitActivity);

const chartOptions = {
scales: {
xAxes: [{
ticks: {
callback: (label, index, labels) => {
const startDate = new Date(label);
const endDate = new Date(startDate.getTime() + (7 * 24 * 60 * 60 * 1000));
return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
},
},
}],
yAxes: [{
ticks: {
beginAtZero: true,
},
}],
},
};

return (
<div className="modal">
<div className="modal-content">
<button className="close" onClick={handleCloseCommitActivity}>
<span aria-hidden="true">×</span>
</button>
<h2>Commit Activity for {repo.name}</h2>
<Line data={{ labels: chartData.labels, datasets: [
{ label: 'Commits', data: chartData.commits },
...chartData.contributors,
],
}} options={chartOptions} />
</div>
</div>
);
};

export default CommitActivity;
