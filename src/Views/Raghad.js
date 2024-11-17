import React from 'react';
import useFetchData from '../Hooks/GetAPI'; // Import the custom hook
import { Card, Col, Row, Spinner } from 'react-bootstrap'; //style the card

const Raghad = ({ title}) => {
  const url = 'https://cs464p564-frontend-api.vercel.app/api/countries';

  // Call the custom hook and pass the URL
  const { data: countries, isLoaded, error } = useFetchData(url);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="contanier">
      <h2 className ="text-center m-4">{title}</h2>
      {!isLoaded && (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <span>Loading...</span>
        </div>
      )}
      {isLoaded && countries.length === 0 && <div>No countries found.</div>}
      
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {countries.map((item, index) => {
          return (
            <Col key={index}>
              <Card className="-d flex" style={{ height: '300px'}}>
                <Card.Body className="text-center">
                  <Card.Title> {item.name}</Card.Title>
                  <Card.Img  height="150px"  border = "1px" src={item.flag_png} alt={item.flag_alt} />
                  <Card.Text className="m-2">
                    {<p>Population: ${item.population}</p>}
                    {<p>gdp_billions: ${item.gdp_billions}</p>}
                    {/* {<p>Spoken Language\s : 
                    {item.official_languages && item.official_languages.length >0 ? item.official_languages.join(', '): "Not available" } */}
                   {/* </p>} */}
                    </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </main>
  );
};

export default Raghad;
