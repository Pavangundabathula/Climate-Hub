import React, { useEffect,useState,useRef } from 'react'
import Search from '../assets/search.png';
import Loader from './Loader';
import SearchBar from './SearchBar';
import humidity from '../assets/humidity.svg';
import Wind from '../assets/wind.png';

const Weather = () => {
    const [weatherData,setWeatherData]=useState(false);
    const [searches,setSearches]=useState([]);
    const [current,setCurrent]=useState("");

    const inputRef=useRef();

    //Add function - used to add the recently searched location
    const add=(item)=>{
        let newarr=[...searches];
        if(searches.length==5){
            newarr.shift();
        }
        let isthere=true;
        newarr.map(ele=>{
            if(ele==item){
                isthere=false;
            }
        });
        if(isthere){
            newarr.push(item);
        }
        setSearches(newarr);
    }

    //Search function - helps to fetch data from OpenWeatheAPI
    const search=async (city)=>{
        if(city === ""){
            alert("Enter city name");
            return;
        }
        try {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={api_key}`;
            setWeatherData(false);
            const response=await fetch(url);
            const data=await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather[0].icon,
                description: data.weather[0].description,
            });
            setCurrent(data.name);
            add(inputRef.current.value);
        } catch (error) {
            setWeatherData(false);
            console.log("Error in search method", error);
        }
    }


    const hanldekeydown=(event)=>{
        if(event.key=='Enter'){
            search(inputRef.current.value)
        }
    }


    useEffect(() =>{
        search("delhi");
        setCurrent("delhi");
    },[])
  return (
    <div className='flex items-center justify-center mt-10'>
        <div className='bg-black border-2 border-gray-400 rounded-xl w-[500px] h-[530px] flex flex-col items-center p-4'>
            <div className='block'>
                <div className='h-fit mt-4 flex items-center'>
                    <input ref={inputRef} type='text' className='w-[290px] h-[40px] p-2 capitalize rounded-tl-lg rounded-bl-lg text-sm' placeholder='enter a city name' onKeyDown={hanldekeydown}/>
                    <div className='h-[40px] p-3 bg-white rounded-tr-lg rounded-br-lg flex items-center' onClick={()=>search(inputRef.current.value)}>
                        <img src={Search} className='h-4'/>
                    </div>
                    <div className='h-[40px] p-2 bg-white ml-5 rounded-lg'>
                        <button className='font-poppins' onClick={()=>search(current)}>Refresh</button>
                    </div>
                </div>
            </div>
            {weatherData ? <>
                <div className='block text-white mt-2 text-center'>
                    <div className='flex justify-center'>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} className='h-40'/>
                    </div>
                    <p className='text-lg capitalize'>{weatherData.description}</p>
                    <p className='text-6xl '>{weatherData.temperature}°C</p>
                    <p className='text-6xl mt-5 font-poppins'>{weatherData.location}</p>
                    <div className='bg-red-500 h-16 w-[500px] mt-[55px] border-2 border-t-0 border-gray-400 rounded-bl-xl rounded-br-xl flex justify-between'>
                        <div className='ml-3 flex'>
                            <div className='block mt-2 mr-1'>
                                <img src={humidity} className='h-12'/>
                            </div>
                            <div className='block'>
                                <p className='font-poppins'>Humidity</p>
                                <p className='text-3xl'>{weatherData.humidity}%</p>
                            </div>
                        </div>
                        <div className='mr-4 flex'>
                            <div className='block'>
                                <p className='font-poppins'>Wind Speed</p>
                                <p className='text-3xl'>{weatherData.windspeed}km/h</p>
                            </div>
                            <div className='block mt-[-2px]'>
                                <img src={Wind} className='h-20'/>
                            </div>
                        </div>
                    </div>
                </div>
            </>:<>
                <Loader/>
            </>}
        </div>
        <SearchBar items={searches}/>
    </div>
  )
}

export default Weather
