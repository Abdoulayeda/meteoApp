/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 25/03/2022 - 13:12:27
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/03/2022
    * - Author          : aliou
    * - Modification    : 
**/
import React,{ useState } from 'react';

import './App.css';

const api ={
  key: "7956bff043f8127ca137f07a70643cf2",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
 const [query, setQuery]= useState('');
 const [weather, setWeather] = useState({});

 const search = evt => {
   if(evt.key === "Enter"){
     fetch(api.base+'weather?q='+query+'&units=metric&APPID='+api.key)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      //  console.log(result);  
      }); 
   }
 }

  function date(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Fev','Mars','Avr','Mai','Juin','Jul','Aout','Sep','Oct','Nov','Dec'];
    let days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var day = days[a.getDay()]
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = day+' '+date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  
  //console.log(timeConverter(1648463314+7200));
  
  function jn(lever,actu,coucher){
    if(lever<actu && actu<coucher){
      return 'Jour'
    } else{
      return 'Nuit'
    }
    
  }

  return (
    <div className="app">
       <main>
         <div className="search-box">
           <input
            type="text"
            className="search-bar"
            placeholder="search..."
            onChange={e=>setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
           />
         </div>
           {(typeof weather.main != "undefined") ? ( 
             <div>
              <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country }</div>
              <div className="date">{date(parseInt(weather.dt) + weather.timezone )}
             
                
               <h3>Il fait {jn(weather.sys.sunrise, weather.dt, weather.sys.sunset)}</h3>
                <h3>Long: {Math.round(weather.coord.lon)}  lat: {Math.round(weather.coord.lat)}</h3>
              </div>
            </div>
          
           <div className="weather-box">
             
             <div className="temp">
               {Math.round(weather.main.temp)}°c
             </div>
            
           </div>
             </div>
           ) : (
             <div className="location-box">
               <div className="location">
                 <h3>Ville introuvable</h3>
               </div>

             
             
             </div>)}

        
       </main>
    </div>
  );
}

export default App;
