const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
async function getProphetData(url) {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.prophets);
    displayProphets(data.prophets); // note that you reference the prophets array of the JSON data object, not just the object
}

getProphetData(url);

const displayProphets = (prophets) => {
    const cards = document.querySelector('#cards');
    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let fullName = document.createElement('h1'); // fill in the blank
        let birth = document.createElement('p');
        let portrait = document.createElement('img');

        // Build the h2 content out to show the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`; // fill in the blank
        birth.textContent = `${prophet.birthdate}`;
        // Build the image portrait by setting all the relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.mname} ${prophet.lastname}`); // fill in the blank
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Append the section(card) with the created elements
        card.appendChild(fullName); //fill in the blank
        card.appendChild(birth);
        card.appendChild(portrait);


        cards.appendChild(card);
    }); // end of arrow function and forEach loop
}