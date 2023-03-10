import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ data, showAdditions }) => {
  const chartData = {
    labels: data.map((week) => new Date(week[0] * 1000).toLocaleDateString()),
    datasets: [
      {
        label: showAdditions ? 'Additions' : 'Deletions',
        data: data.map((week) => (showAdditions ? week[1] : week[2])),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Week Starting',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const timestamp = context.raw.x;
            const count = context.raw.y;
            const label = showAdditions ? 'Additions: ' : 'Deletions: ';
            return [`${label}${count}`, new Date(timestamp * 1000).toLocaleDateString()];
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Chart;
