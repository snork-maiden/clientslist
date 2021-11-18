"use strict";

const companiesList = document.querySelector(".companies-list");
const preloader = document.querySelector(".loading-ring");

preloader.classList.add("loading-ring--active");

const searchForm = document.querySelector(".search");
const searchInput = searchForm.querySelector(".search__input");

/**
 * Download and show all companies
 */
async function showCompanies() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  let users;
  try {
    const blob = await fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    });
    users = await blob.json();
  } catch (err) {
    preloader.classList.remove("loading-ring--active");

    if (err.name === "AbortError") {
      const error = document.querySelector(".timeout-error");
      error.classList.add("timeout-error--active");
      return;
    }

    clearTimeout(timeoutId);

    const errorMessage = document.querySelector(".fetch-error");
    errorMessage.classList.add("fetch-error--active");
    return;
  }

  clearTimeout(timeoutId);

  preloader.classList.remove("loading-ring--active");
  searchForm.classList.add("search--active");

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
}

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

function displayMatches() {
  let companies = companiesList.children;
  const query = this.value.toLowerCase();

  for (let company of companies) {
    company.hidden = false;

    const text = company.textContent.toLowerCase();
    if (!text.includes(query)) {
      company.hidden = true;
    }
  }
}

showCompanies();

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
