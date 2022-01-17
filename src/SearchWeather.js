import React, {useState, useEffect} from "react";
import bootstrap from "bootstrap";
import "./App.css";

const SearchWeather = () => {
    const [search, setSearch] = useState("london");
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    let componentMounted = true;

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=f88dab81707f44cdbda02861ac7da111`);
            if(componentMounted){
                setData(await response.json());
                console.log(data);
            }
            return () => {
                componentMounted = false;
            }
        }
       fetchWeather();
    }, [search]);

    // Dynamic Emoji
    let emoji = null;
    if(typeof data.main != "undefined"){
        if(data.weather[0].main == "Clouds"){
            emoji = "fa-cloud"
        }else if(data.weather[0].main == "Thunderstorm"){
            emoji = "fa-bolt"
        }else if(data.weather[0].main == "Drizzle"){
            emoji = "fa-cloud-rain"
        }else if(data.weather[0].main == "Rain"){
            emoji = "fa-cloud-showers-heavy"
        }else if(data.weather[0].main == "Snow"){
            emoji = "fa-snowflake"
        }else {
            emoji = "fa-smog"
        }
    }else {
        return(
            <div className="not-found">
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="prompt">
                    <h1><b>404</b></h1>
                    <h3>Data Not Found</h3>
                    <hr className="hr-black" />
                    <p>Please search the city name with English language only :)</p>
                    <p><b>Refresh</b> the page to come back to homepage</p>
                </div>
            </div>
        )
    }

    //Temp Converter 
    let temp = (data.main.temp - 273.15).toFixed(2);
    let temp_min = (data.main.temp_min - 273.15).toFixed(2);
    let temp_max = (data.main.temp_max - 273.15).toFixed(2);
    let feels_like = (data.main.feels_like - 273.15).toFixed(2);

    //Date 
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", {month:'long'});
    let day = d.toLocaleString("default", {weekday:'long'});

    //Time
    let time = d.toLocaleString([],{
        hour : "2-digit",
        minute : "2-digit",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(input);
    }

  return (
    <div className="main" >
        <h1 className="main-title"> WeatherSearch </h1>
      <div className="container">
        <div className="row-main">
          <div className="card-main text-light">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-4 w-75 mx-auto">
                <input
                  type="search"
                  placeholder="Enter City Name"
                  className="form-control"
                  aria-label="Enter City"
                  aria-aria-describedby="basic-addon2"
                  name="search"
                  value={input}
                  onChange={(e)=>setInput(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  class="input-group-text input-button"
                  id="basic-addon2"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
            <hr className="hr-black" />
            <div className="content-main">
                <h3 className="city-name"> {data.name}, {data.sys.country}</h3>
                <br />
                <h5 className="date-time">{day}, {date} {month} {year} <br /> {time}</h5>
                <br />
                <i className={ `fas ${emoji} fa-4x` }></i> 
                <h3 className="temp"><b>{temp} &deg;C</b></h3>
                <br />
                <h4 className="name-weather">{data.weather[0].main}</h4>
                <br />
                <p className="temp-hi-low"> Min <span className="text-primary">{temp_min}</span> &deg;C | Max <span className="text-danger">{temp_max}</span> &deg;C </p>
                <p className="temp-hi-low">  Feels like <u>{feels_like} &deg;</u></p>
                <p className="temp-hi-low">Humidity : {data.main.humidity}% | Pressure : {data.main.pressure} mBar</p>
                <hr className="hr-black" /> 
            </div>
          </div>
        </div>
      </div>
      <footer className='footer'>
                <p>Copyright &copy; Arifian Saputra, 2021.</p>
      </footer>
    </div>
  );
};

export default SearchWeather;
