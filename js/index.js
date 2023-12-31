// To get the location given in the input box & define all the create elements
var city;
var txt=document.getElementById('txt');
var btn=document.getElementById('btn');
var main=document.getElementById('main');
var div=document.createElement('div');
var p=document.createElement('p');
var h2=document.createElement('h2');
var h6=document.createElement('h6');
var img=document.createElement('img');


btn.addEventListener("click",()=>{
    city=txt.value;
    // Convert city name into latitude & longitude
    // Using GEOCODING API

    var geocodingapi="https://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=ccde0925f653acf2dead8f26655b8dca";
    fetch(geocodingapi).then((response)=>{
        return response.json();
    }).then((latlon)=>{
        console.log(latlon);
        h2.innerHTML="";
        p.innerHTML="";
        h2.id='name';
        h2.innerHTML=latlon[0].name;
        // number.toFixed(number)
        p.innerHTML+="<b>Latitude: </b>"+(latlon[0].lat).toFixed(4);
        p.innerHTML+="<br><b>Longitude: </b>"+(latlon[0].lon).toFixed(4);
        main.appendChild(h2);
        main.appendChild(p);
        latlondata(latlon);
    }).catch((err)=>{
        alert(err+"\n\nEnter location name correctly");
        window.location.reload();
    })

    // To get weather data

    var url;
    function latlondata(data)
    {
        // to give the latitude and longitude for the given location
        url="https://api.openweathermap.org/data/2.5/weather?lat="+data[0].lat+"&lon="+data[0].lon+"&appid=ccde0925f653acf2dead8f26655b8dca&units=metric";
        fetch(url)
        .then((response)=>{
            // you need to return this data otherwise undifined data will be displayed on output
            if(response.ok)
            {
                return response.json();
            }
            else
            {
                console.log(response);
            }
            })
        .then((data)=>{
            displaydata(data);
            console.log(data);})
        .catch((err)=>{console.log(err);})
    }

    // to display the fetched data into thr document

    function displaydata(info)
    {
        div.innerHTML="";
        h6.innerHTML="";
        div.id="card";
        img.src="http://openweathermap.org/img/w/"+info.weather[0].icon+".png";
        div.appendChild(img);
        h6.innerHTML+=info.weather[0].description;
        h6.style.display="inline";
        div.appendChild(h6);
        div.innerHTML+="<br><h1 style='display:inline' id='temp'><b>"+Math.floor(info.main.temp)+"°C</b></h1>";
        div.innerHTML+="<br><i>Feels like </i>"+Math.floor(info.main.feels_like)+"°C<br>";
        div.innerHTML+="<br><b>Maximum Temperature: </b>"+Math.floor(info.main.temp_max)+"°C";
        div.innerHTML+="<br><b>Minimum Temperature: </b>"+Math.floor(info.main.temp_min)+"°C";
        div.innerHTML+="<br><b>Humidity: </b>"+info.main.humidity+"%";
        div.innerHTML+="<br><b>Wind Speed: </b>"+info.wind.speed+"m/s";
        div.innerHTML+="<br><b>Timezone: </b>"+(info.timezone)/3600+" UTC <br>";
        main.style.display="block";
        main.appendChild(div);
    }
    txt.value='';
});