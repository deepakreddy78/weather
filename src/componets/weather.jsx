import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import './style.css'
import sear from '../assets/search.png'
import cloud from '../assets/cloud.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'
import clear from '../assets/clear.png'
import drizzle from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import snow from '../assets/wind.png'


const Weather=()=>{
 
    const [weatherData,setWeatherData]=useState(false);
    const inputRef=useRef();
    const iconImg={
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow
    }

    const search = async (city) =>{
        if(city == ""){
            alert('Enter the city name');
            return;
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cb5e9a060cfe2732650a5697560abcf4&units=metric`;
            const response= await fetch(url);
            const data=await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            
            const icon = iconImg[data.weather[0].icon] || clear
             setWeatherData({
                humidity:data.main.humidity,
                wind:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icons:icon
            })
           
        }
        catch(err){

        }
    }
useEffect(()=>{
    search("london");
},[])

    return(
        <>
        <div className='card'>
            <div className='search-bar'>
                <input ref={inputRef} type='text' placeholder='search'/>
                <img src={sear} onClick={()=>{search(inputRef.current.value)}} alt='search'/>
            </div>
            {
                weatherData ? <>            <div className='icon'>
                <img src={weatherData.icons} />
              </div>
              <div className='weather-tem' >
                    <p className='temp'>{weatherData.temperature}&#176;C</p>
                    <p className='place'>{weatherData.location}</p>
              </div>
              <div className='condition'>
                 <div className='col'>
                  <img src={humidity} alt="humidity"/>
                  <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                    </div>
                 </div>
                 <div className='col'>
                 <img src={wind} alt="wind"/>
                 <div>
                    <p>{weatherData.wind}Km/h</p>
                    <span>wind Speed</span>
                    </div>
                 </div>
              </div></> : <></>
            }

        </div>
        </>
    )
}

export default Weather