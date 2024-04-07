import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './WeatherApp.css'; 
import clouds from './assests/clouds.png';
import humidity from './assests/humidity.png';
import wind from './assests/wind.png';
import sunny from './assests/sunny.png';
import drizzle from './assests/drizzle.png'
import snowflake from './assests/snowflake.png'
import rain from './assests/rain.png'



const weatherIconMap = {
    "01d": sunny,
    "01n": sunny,
    "02d": clouds,
    "02n": clouds,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snowflake,
    "13n": snowflake
};


const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('');
    const[dummyCity, setDummyCity]= useState('')
    const [temp, setTemp] = useState('');
    const [country, setCountry] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [humidityValue, setHumidityValue] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const [icon, setIcon] = useState()

    
    const apiKey = '6edb4b308443e3bd6d906ed6d93764fa'; 

    const submitHandling = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            );
            if (!response.ok) {
                throw new Error(`Error fetching weather data: ${response.statusText}`);
            }
            const data = await response.json();
            setWeatherData(data);
            const weatherIcon = data.weather[0].icon;
            const icon = weatherIconMap[weatherIcon] || sunny;
            setIcon(icon);
            setTemp(Math.floor(data.main.temp -273.5));
            setDummyCity(data.name)
            setCountry(data.sys.country);
            setLatitude(data.coord.lat);
            setLongitude(data.coord.lon);
            setHumidityValue(data.main.humidity);
            setWindSpeed(data.wind.speed);

            setError(null);
        } catch (error) {
            console.error(error.message);
            setWeatherData(null);
            setError('Error fetching weather data. Please check the city name.');
        }
    };



    return (
        <div className='container'>
            <div className='search-container'>
                <input
                    type='text'
                    className='search-input'
                    placeholder='Search city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
             < FaSearch onClick={submitHandling} className='search-icon'/> 
            </div>
            <div className='weather-info'>
                {weatherData && (
                    <>
                        <div className='weather-icon'>
                            <img src={icon} alt='weather-icon' />
                        </div>
                        <div className='temp'>{temp}°C</div>
                        <div className='city'>{dummyCity}</div>
                        <div className='country'>{country}</div>
                        <div className='coordinates'>
                         <div>
                            <span className='lat'>Latitude</span><br></br>
                            <span className='span-Ex'>{latitude}</span>
                         </div>
                         <div>
                            <span className='lon'>Longitude</span><br></br>
                            <span className='span-Ex'>{longitude}</span>
                        </div>  
                        </div>
                        <div className='data-container'>
                        <div className='detail1'>
                            <img src={humidity} alt='humidity-icon' />
                            <div className='data'>
                                <span>{humidityValue}%</span>
                                <div className='text'>Humidity</div>
                            </div>
                        </div>
                        <div className='detail2' style={{ marginLeft: '180px' }}>
                            <img src={wind} alt='wind-icon'  />
                            <div className='data' >
                                <span>{windSpeed} m/s</span>
                                <div className='text'>Wind</div>
                            </div>
                        </div>
                        </div>
                    

                    </>
                )}
                {error && <div className='error-message'>{error}</div>}
            </div>
        </div>
    );
};

export default WeatherApp;
