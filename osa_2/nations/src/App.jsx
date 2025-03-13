import { useState, useEffect } from "react"
import axios from "axios"

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    console.log("Haetaan maiden tietoja...")
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        console.log(`Maatiedot vastaanotettu: ${response.data.length} maata`)
        setCountries(response.data)
      })
      .catch((error) => console.log("Virhe ladattaessa maiden tietoja:", error))
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
    console.log(`Haku päivitetty: ${event.target.value}`)
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  console.log("Suodatetut maat:", filteredCountries.map((c) => c.name.common))

  return (
    <div>
      <h2>Etsi maita</h2>
      <input value={search} onChange={handleSearch} placeholder="Kirjoita maan nimi" />

      {filteredCountries.length > 10 ? (
        <p>Liian monta osumaa, tarkenna hakua.</p>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : (
        <CountryList countries={filteredCountries} onSelect={setSelectedCountry} />
      )}
    </div>
  )
}

const CountryList = ({ countries, onSelect }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}{" "}
          <button onClick={() => {
            console.log(`Valittu maa: ${country.name.common}`)
            onSelect(country)
          }}>Näytä</button>
        </li>
      ))}
    </ul>
  )
}

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (!API_KEY) {
      console.log("API-avain puuttuu! Tarkista ympäristömuuttujat.")
      return
    }

    console.log(`Haetaan säätietoja: ${country.capital} (${country.latlng[0]}, ${country.latlng[1]})`)

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${API_KEY}&units=metric`
        )
        console.log("Säätiedot vastaanotettu:", response.data)
        setWeather(response.data)
      } catch (error) {
        console.error("Säätietojen lataus epäonnistui:", error)
      }
    }

    fetchWeather()
  }, [country])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p><strong>Pääkaupunki:</strong> {country.capital}</p>
      <h3>Kielet:</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={`Maan ${country.name.common} lippu`} width="200px" />

      {weather ? (
        <div>
          <h3>Sää {country.capital}:ssa</h3>
          <p><strong>Lämpötila:</strong> {weather.main.temp}°C</p>
          <p><strong>Tuuli:</strong> {weather.wind.speed} m/s</p>
          {weather.weather && weather.weather[0] && (
            <>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>{weather.weather[0].description}</p>
            </>
          )}
        </div>
      ) : (
        <p>Ladataan säätietoja...</p>
      )}
    </div>
  )
}

export default App
