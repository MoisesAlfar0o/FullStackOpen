const Weather = ({ countryWeather }) => {
    if (!countryWeather) {
        return <p>Loading weather data...</p>
    }

    const { weather, name, main, wind } = countryWeather
    return (
        <div>
            <h1>Weather in {name}</h1>
            <p>Temperature {main.temp} Celsius</p>
            <img 
                src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} 
                alt={weather[0].description} 
            />
            <p>Wind {wind.speed} m/s</p>
        </div>
    )
}

export default Weather