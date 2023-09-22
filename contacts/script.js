async function apiFetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  
const getData = async () => {
const data = await apiFetch('http://localhost:3000/Contacts');
displayAllData(data);
};

function displayAllData(list) {
    let display = "";
    list.forEach(data => {
        display += displayContact(data);
    });
    let contactsDisplay = document.getElementById('contactList');
    contactsDisplay.innerHTML = display;
};

function displayContact(data) {
    let info = "<div class='contact'>";
    info += "<p>Contact Number: " + data['_id'] + "</p>";
    info += "<p>" + data['firstName'] + " " + data['lastName'] + "</p>";
    info += "<p>Email: " + data['email'] + "</p>";
    info += "<p>Favorite Color: " + data['favoriteColor'] + "</p>";
    info += "<p>Birthday: " + data['birthday'] + "</p>";
    info += "</div>";
    return info;
}

getData();