const apiKey ="39de5722b7922c943672a96862251900";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const input = document.querySelector('input');
// console.log(input);
const search = document.querySelector("button");
const weather_space = document.querySelector('.ErrorMessage');



// Can click on the search button
search.addEventListener("click", () => {
    const city = input.value.trim();
    // console.log(`Entered city : ${city}`)
    input.value = "";
    checkWeather(city);
 
});

// Can hit enter on the input box 
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = input.value.trim();
        input.value = "";
        checkWeather(city);

    }
});

// Selected the elements to change (or insert data into)
let img_to_show= document.querySelector('.weather-icon');
let temp = document.querySelector('.temp');
let ciity = document.querySelector('.city')
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');


// Main function handling API request
const checkWeather=async (city)=>{
    try{    

            const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${city}`); // Added query params 
            if (!response.ok) throw new Error("City not found");
            let data = await response.json();
    
            let temperature = data.main.temp;
            let wind_speed = data.wind.speed;
            let img = data.weather[0].main.toLowerCase(); // So that the image path matches 
           
            img_to_show.src = `./images/${img}.png`;
            
            wind.innerHTML = `${wind_speed} km/h`;
            temp.innerHTML = `${temperature}°C `;

            
            let city_ = data.name;
            ciity.innerHTML = city_;
            humidity.innerHTML = `${data.main.humidity} %`;
            weather_space.innerHTML="";
            document.querySelector('.weather').style.display = 'block'; // Initially hide the contents
    }
    catch(error){
            // console.error(error);
            weather_space.innerHTML ="Please Enter a valid city 😭";
            document.querySelector('.weather').style.display = 'none'; // Hide the main weather contents
    }

        }

// data.main.temp : Temperature 
// data.wind.speed : Wind-Speed 
// data.weather[0].main : Clouds (Image to show)
// data.name
// data.main.humidity : humidity percentage 







