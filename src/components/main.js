import { debounce } from "debounce";
import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import "pnotify/dist/PNotifyBrightTheme.css";
import templateSearchList from '../teamplates/searchList.hbs';
import templateMainPage from '../teamplates/mainPage.hbs';
const axios = require('axios').default;


const refs = {
  inputCountry: document.querySelector('.country'),
  page: document.querySelector('.main-page')
}

let search = "";

// PNotify.alert('Notice me, senpai!');

refs.inputCountry.addEventListener('input', 
debounce(function (e) {
    console.log(e.target.value);
    search = e.target.value
    if (search !== '') {
        axios
          .get(`https://restcountries.eu/rest/v2/name/${search}`)
          .then(function (response) {
            const data = response.data;
            const dataName = templateSearchList(data.map(element => element.name));
            const dataInfo = templateMainPage(data[0]);
            
            if (data.length > 10) {
                PNotify.alert('Make your search more specific')
            }
            if (data.length < 10 && data.length >= 2) {
                 refs.page.innerHTML = dataName;
            }
            if (data.length === 1) {
                 refs.page.innerHTML = dataInfo
            }

          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
      }
    }, 500),
  );