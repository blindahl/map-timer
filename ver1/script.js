const mapTimers = document.getElementById('map-timers');

const maps = [
    { name: 'Dam', thumbnail: 'https://static.wikia.nocookie.net/arcraiders_gamepedia/images/9/95/Dam_Battleground.png/revision/latest/scale-to-width-down/1000?cb=20240628171202' },
    { name: 'Buried City', thumbnail: 'https://static.wikia.nocookie.net/arcraiders_gamepedia/images/1/18/Buried_City.png/revision/latest/scale-to-width-down/1000?cb=20240628171126' },
    { name: 'Spaceport', thumbnail: 'https://static.wikia.nocookie.net/arcraiders_gamepedia/images/a/a0/Acerra_Spaceport.png/revision/latest/scale-to-width-down/1000?cb=20240628171142' },
    { name: 'Blue Gate', thumbnail: 'https://static.wikia.nocookie.net/arcraiders_gamepedia/images/c/cb/The_Blue_Gate.png/revision/latest/scale-to-width-down/1000?cb=20240628171109' },
];

const hourlyConditions = {
    0: { name: 'Electromagnetic Storm', icon: 'https://cdn-icons-png.flaticon.com/512/1779/1779927.png' },
    1: { name: 'Harvester', icon: 'https://cdn-icons-png.flaticon.com/512/3524/3524659.png' },
    2: { name: 'Husk Graveyard', icon: 'https://cdn-icons-png.flaticon.com/512/183/183616.png' },
    3: null,
    4: { name: 'Night Raid', icon: 'https://cdn-icons-png.flaticon.com/512/3687/3687424.png' },
    5: null,
    6: { name: 'Harvester', icon: 'https://cdn-icons-png.flaticon.com/512/3524/3524659.png' },
    7: null,
    8: { name: 'Electromagnetic Storm', icon: 'https://cdn-icons-png.flaticon.com/512/1779/1779927.png' },
    9: { name: 'Harvester', icon: 'https://cdn-icons-png.flaticon.com/512/3524/3524659.png' },
    10: { name: 'Lush Blooms', icon: 'https://cdn-icons-png.flaticon.com/512/189/189102.png' },
    11: null,
    12: { name: 'Night Raid', icon: 'https://cdn-icons-png.flaticon.com/512/3687/3687424.png' },
    13: { name: 'Harvester', icon: 'https://cdn-icons-png.flaticon.com/512/3524/3524659.png' },
    14: { name: 'Probe Heist', icon: 'https://cdn-icons-png.flaticon.com/512/3089/3089928.png' },
    15: null,
    16: { name: 'Electromagnetic Storm', icon: 'https://cdn-icons-png.flaticon.com/512/1779/1779927.png' },
    17: null,
    18: { name: 'Harvester', icon: 'https://cdn-icons-png.flaticon.com/512/3524/3524659.png' },
    19: null,
    20: { name: 'Night Raid', icon: 'https://cdn-icons-png.flaticon.com/512/3687/3687424.png' },
    21: { name: 'Harvester', icon: 'https://cdn-icons-png.flaticon.com/512/3524/3524659.png' },
    22: { name: 'Hidden Caches', icon: 'https://cdn-icons-png.flaticon.com/512/126/126496.png' },
    23: null,
};

function getMapState() {
    const now = new Date();
    const utcHour = now.getUTCHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    const timeUntilNextHour = (60 - minute - 1) * 60 + (60 - second);
    const nextHour = (utcHour + 1) % 24;

    const currentCondition = hourlyConditions[utcHour];
    const nextCondition = hourlyConditions[nextHour];

    return {
        currentCondition,
        nextCondition,
        timeUntilNextHour
    };
}

function updateTimers() {
    const { currentCondition, nextCondition, timeUntilNextHour } = getMapState();

    mapTimers.innerHTML = '';

    const minutes = Math.floor(timeUntilNextHour / 60);
    const seconds = timeUntilNextHour % 60;

    maps.forEach(map => {
        const mapElement = document.createElement('div');
        mapElement.classList.add('map');

        const thumbnailElement = document.createElement('img');
        thumbnailElement.classList.add('map-thumbnail');
        thumbnailElement.src = map.thumbnail;

        const nameElement = document.createElement('div');
        nameElement.classList.add('map-name');
        nameElement.textContent = map.name;

        const stateElement = document.createElement('div');
        stateElement.classList.add('map-state');

        let currentStateHTML = 'Current: Clear';
        if (currentCondition) {
            currentStateHTML = `Current: ${currentCondition.name} <img src="${currentCondition.icon}" class="status-icon">`;
        }

        let nextStateHTML = 'Next: Clear';
        if (nextCondition) {
            nextStateHTML = `Next: ${nextCondition.name} <img src="${nextCondition.icon}" class="status-icon">`;
        }

        stateElement.innerHTML = `
            ${currentStateHTML}<br>
            ${nextStateHTML}<br>
            Time until next: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
        `;

        mapElement.appendChild(thumbnailElement);
        mapElement.appendChild(nameElement);
        mapElement.appendChild(stateElement);
        mapTimers.appendChild(mapElement);
    });
}

updateTimers();
setInterval(updateTimers, 1000);