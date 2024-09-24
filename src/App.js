import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const key = "9c3005ee8ff7f7e30f48606417f9ab43";
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(null);

  useEffect(() => {
    async function getApi() {
      if (search) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}&units=metric`
          );
          setCity(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    }
    getApi();
  }, [search]);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/red.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div>
        <input
          type="text"
          placeholder=" Şehir ismi giriniz ..."
          className="input"
          onChange={(e) => setSearch(e.target.value)}
        />

        {city && (
          <div>
            <h2>{city.name}</h2>
            <p>Sıcaklık: {city.main.temp} °C</p>
            <p>Hava Durumu: {city.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
