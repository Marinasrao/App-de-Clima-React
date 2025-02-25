import { useState } from 'react'
import './WeatherApp.css'


export const WeatherApp = () => {

    const [city, setcity] = useState('')
    const [weatherDate, setweatherDate] = useState(null)

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const ApiKeys = 'my api key'
    const difKelvin = 273.15//Para convertir en grados celsius debemos restar los grados kelvin

    const fechWeatherDate = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${ApiKeys}&lang=es`)
            const data = await response.json()
            console.log(data)
            setweatherDate(data)
        } catch (error) {
            console.error('Se ha producido un error: ', error)
        }
    }


    function handleCityChange(event) {
        setcity(event.target.value)
    }



    const handleSubmit = (event) => {
        event.preventDefault()
        fechWeatherDate()

    }


    return (
        <div className="container">

            <h1>Aplicación de Clima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ingresa una Ciudad"
                    value={city}
                    onChange={handleCityChange}
                />
                <button type="submit">Buscar</button>
            </form>

            {weatherDate && weatherDate.sys && (
                <div>
                    <h2>{weatherDate.name}, {weatherDate.sys.country}</h2>
                    <p>La temperatura actual es :{Math.floor(weatherDate.main.temp - difKelvin)}°C</p>
                    <p>La Condición actual es :{weatherDate.weather[0].description}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherDate.weather[0].icon}@2x.png`}
                        alt={weatherDate.weather[0].description} />
                </div>
            )}

        </div>
    )
}
