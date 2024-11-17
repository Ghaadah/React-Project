import React from "react";
import { backgroundColors } from "../Uitls/chartColors";
import useFetchData from "../Hooks/GetAPI"; // Import the custom hook
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const DatPage = ({ title }) => {
  const url = "https://cs464p564-frontend-api.vercel.app/api/countries";

  // Call the custom hook and pass the URL to fetch the data from the API
  const { data: countries, isLoaded, error } = useFetchData(url);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const languageCounts = countries
    //flatMap- flatten the languages arrays into single array
    .flatMap((item) => item.official_languages)
    //reduce - count each language by incrementing its count in an object(languageCounts, where each key is a language, and the value is its count.)
    .reduce((acc, language) => {
      acc[language] = (acc[language] || 0) + 1;
      return acc;
    }, {});

  const labels = Object.keys(languageCounts);
  console.log(labels);

  const dataValues = Object.values(languageCounts);
  console.log(dataValues);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors.slice(0, labels.length),
        borderWidth: 1,
      },
    ],
  };
  return (
    <section className="container m-2">
      <h2>South America Spoken Languages Chart</h2>
      <div style={styles.chartContainer}>
        <Doughnut data={data} />
      </div>
    </section>
  );
};
const styles = {
  chartContainer: {
    maxWidth: "80%",
    width: "100%",
    height: "100%",
    margin: "20px auto",
  },
};
export default DatPage;
