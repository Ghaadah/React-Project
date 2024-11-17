import React from 'react';
import { backgroundColors } from '../Uitls/chartColors';
import useFetchData from '../Hooks/GetAPI'; // Import the custom hook
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const Russ = ({ title }) => {
  const url = 'https://cs464p564-frontend-api.vercel.app/api/countries';

  // Call the custom hook and pass the URL to fetch the data from the API
  const { data: counteries, isLoaded, error } = useFetchData(url);
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  //save the needed data
  const countryNames = counteries.map((item) => item.name);
  const population = counteries.map((item) => item.population);

  console.log(countryNames);
  console.log(population);

  const data = {
    labels: countryNames,
    datasets: [
      {
        data: population,
        backgroundColor: backgroundColors, // Bar color
        borderColor: 'rgba(66, 165, 245, 1)', // Border color
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        color: 'black',
        align: 'top',
        
      },
    },
    legend: {
      display: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'South America Countries',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Population',
        },
        max: 200000000,
      },
    },
  };

  return (
    <section className="container">
      <h1>{title}</h1>
      <div style={styles.chartContainer}>
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

const styles = {
  chartContainer: {
    maxWidth: '80%',
    width: '100%',
    height: '100%',
    margin: '20px auto',
  },
};
export default Russ;
