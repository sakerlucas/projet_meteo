let apiKey = "cd41863ddc56bdf925c2940fe129c9ac"
let city = ""
let options = `&units=metric&lang=fr`

let temp
let ressenti
let sunriseH_timestamp
let sunsetH_timestamp
let sunriseH
let sunriseM
let sunrise
let sunsetH
let sunsetM
let sunset


const recupIp = fetch(`http://ip-api.com/json/?fields=61439`
)
    .then(response => response.json())
    .then((results) => {
        return results
    })
    .catch(err => console.log(err))

const icon = (data) => {
    let conditions = ""

    switch (data) {
        case "couvert":
            conditions = "http://openweathermap.org/img/wn/04d.png"
            break;
        case "pluvieux":
            conditions = "http://openweathermap.org/img/wn/10d.png"
            break;
        case "ciel dégagé":
            conditions = "http://openweathermap.org/img/wn/01d.png"
            break;
        case "neigeux":
            conditions = "http://openweathermap.org/img/wn/13d.png"
            break;
        case "couvert":
            conditions = "http://openweathermap.org/img/wn/04d.png"
            break;
        case "orageux":
            conditions = "http://openweathermap.org/img/wn/11d.png"
            break;
        case "brumeux":
            conditions = "http://openweathermap.org/img/wn/50d.png"
            break;
        case "peu nuageux":
            conditions = "http://openweathermap.org/img/wn/02d.png"
            break;
        case "averse":
            conditions = "http://openweathermap.org/img/wn/09d.png"
            break;
        default:
            break;
    }
    return conditions
}

function verifQualAir(data) {
    let qualite = ""

    if (data <= 50) {
        qualite = "Bonne"
    } else if (data > 50 && data <= 100) {
        qualite = "Moyen"
    } else if (data > 100 && data <= 200) {
        qualite = "Dégradé"
    } else if (data > 200 && data <= 400) {
        qualite = "Mauvais"
    } else if (data > 400 && data <= 100) {
        qualite = "Très mauvais"
    }

    return qualite
}

function colorQualAir(data) {
    let color = ""

    if (data <= 50) {
        color = "text-green"
    } else if (data > 50 && data <= 100) {
        color = "text-yellow"
    } else if (data > 100 && data <= 200) {
        color = "text-orange"
    } else if (data > 200 && data <= 400) {
        color = "text-red"
    } else if (data > 400 && data <= 100) {
        color = "text-purple"
    }
    return color
}

function afficherDonness(data) {
    document.getElementById('titreVille').innerHTML += `
        <h2 class="text-center">${data.name}</h2>
    `

    document.getElementById('donneesMeteo').innerHTML += `
        <div>
            <div class="d-flex justify-content-center">
                <h1>${temp}</h1>°C
            </div>
            <div class="text-center">
                <small>${ressenti}°C</small>
            </div>
            <div class="d-flex flex-column align-items-center mt-3">
                <h5>Conditions :</h5>
                ${data.weather[0].description}
                <!-- <img src="${icon(data.weather[0].description)}" alt="temps" height="50" width="50"> -->
            </div>
        </div>
        <div class="d-flex justify-content-evenly mt-4">
            <div class="d-flex flex-column align-items-center">
                <img class="" src="icons8-sunrise-24.png" alt="sunrise" height="32" width="32">
                <!--<img class="mx-1" src="icons8-arrow-16.png" alt="arrow">-->
                ${sunrise}
            </div>
            <div class="d-flex flex-column align-items-center">
                <img class="" src="icons8-sunset-24.png" alt="sunset" height="32" width="32">       
                <!--<img class="mx-1" src="icons8-arrow-16.png" alt="arrow">-->
                ${sunset}
            </div>
        </div>
    `
}

function afficherQualAir(data, color) {
    document.getElementById('donneesAir').innerHTML += `
        <h4>Qualité de l'air</4>
        <p id="colorAir" class="mt-3 ${color}">${data}</p>
    `
}

const printDonneesCity = () => {
    recupIp.then((a) => {
        city = a.city
        lon = a.lon
        lat = a.lat
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city + options}&appid=${apiKey}`
        )
            .then(response => response.json())
            .then((results) => {
                temp = Math.round(results.main.temp)
                ressenti = Math.round(results.main.feels_like)
                sunriseH_timestamp = results.sys.sunrise
                sunrise = new Date(sunriseH_timestamp * 1000);
                sunriseH = "0" + sunrise.getHours()
                sunriseM = "0" + sunrise.getMinutes()
                sunrise = sunriseH.substr(-2) + ':' + sunriseM.substr(-2)
                sunsetH_timestamp = results.sys.sunset
                sunset = new Date(sunsetH_timestamp * 1000);
                sunsetH = "0" + sunset.getHours()
                sunsetM = "0" + sunset.getMinutes()
                sunset = sunsetH.substr(-2) + ':' + sunsetM.substr(-2)
                afficherDonness(results)
            })
            .catch(err => console.log(err))

        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
        )
            .then(response => response.json())
            .then((results) => {
                afficherQualAir(verifQualAir(results.list[0].components.no2), colorQualAir(results.list[0].components.no2))
            })
            .catch(err => console.log(err))
    })
}

function reload(){
    document.getElementById('btnReload').addEventListener('click', (evt) => {
        evt.preventDefault()
        window.location.reload()
    })
}

window.onload = () => {
    printDonneesCity()
    reload()
}