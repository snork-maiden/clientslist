"use strict";

const companiesList = document.querySelector(".companies-list");
const preloader = document.querySelector(".loading-ring");

preloader.classList.add("loading-ring--active");
fetch("https://jsonplaceholder.typicode.com/users")
  .then((blob) => blob.json())
  .then((users) => {
    preloader.classList.remove("loading-ring--active");
    for (let user of users) {
      createCompanyItem(user);
    }

    const contactPersonButtons = companiesList.querySelectorAll(
      ".company__contact-person"
    );
    contactPersonButtons.forEach((button) =>
      button.addEventListener("click", () => {
        button.classList.toggle("company__contact-person--open");
      })
    );
  })
  .catch(() => {
    preloader.classList.remove("loading-ring--active");
    const errorMessage = document.querySelector('.fetch-error');
    errorMessage.classList.add('fetch-error--active');
  });

/**
 * Add to companiesList <li> with info about one company
 * @param {Object} user
 * @param {Object} user.company
 * @param {string} user.company.name
 * @param {string} user.company.catchPhrase
 * @param {Object} user.address
 * @param {string} user.address.city
 * @param {string} user.address.street
 * @param {string} user.address.suite
 * @param {string} user.name
 * @param {string} user.username
 * @param {string} user.email
 * @param {string} user.phone
 * @param {string} user.website
 */

function createCompanyItem(user) {
  const companyItem = document.createElement("li");
  companyItem.classList.add("companies-list__item");
  companyItem.innerHTML = `
    <article class="company">
            <h2 class="company__name">${user.company.name}</h2>
            <p class="company__catch-phrase">
            ${user.company.catchPhrase}
            </p>
          <button class="company__contact-person">Contact person</button>
          <div class="user">
            <h3 class="user__name">${user.name}</h3>
            <p class="user__username">@${user.username}</p>
            <h4 class="user__contacts-title">Contacts:</h4>
            <ul class="contacts">
              <li class="contacts__item">
                <a class="contacts__link" href="mailto:${user.email}"
                  >${user.email}</a
                >
              </li>
              <li class="contacts__item">
                <a class="contacts__link" href="tel:${formatPhone(user.phone)}"
                  >${user.phone}</a
                >
              </li>
  
              <li class="contacts__item">
                <a class="contacts__link" href="https://${user.website}"
                  >${user.website}</a
                >
              </li>
              <li class="contacts__item">${user.address.city}, ${
    user.address.street
  }, ${user.address.suite}</li>
            </ul>
          </div>
        </article>
    `;
  companiesList.appendChild(companyItem);
}

/**
 * format phone for tel href
 * @param {string} phoneNumber
 * @returns {string}
 */
function formatPhone(phoneNumber) {
  phoneNumber = phoneNumber.split(" ")[0];
  return "+" + phoneNumber.replace(/[^0-9]/g, "");
}

// {
//     "id": 1,
//     "name": "Leanne Graham",
//     "username": "Bret",
//     "email": "Sincere@april.biz",
//     "address": {
//       "street": "Kulas Light",
//       "suite": "Apt. 556",
//       "city": "Gwenborough",
//       "zipcode": "92998-3874",
//       "geo": {
//         "lat": "-37.3159",
//         "lng": "81.1496"
//       }
//     },
//     "phone": "1-770-736-8031 x56442",
//     "website": "hildegard.org",
//     "company": {
//       "name": "Romaguera-Crona",
//       "catchPhrase": "Multi-layered client-server neural-net",
//       "bs": "harness real-time e-markets"
//     }
//   }
