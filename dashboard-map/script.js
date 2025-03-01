// Initialize the map
const map = L.map('map').setView([20, 0], 2); // Centered around the world

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Predefined locations (city name, latitude, longitude)
const locations = [
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    { name: "Paris", lat: 48.8566, lon: 2.3522 }
];

// Track selection counts
const selectionCounts = {};

// Add markers to the map
locations.forEach(location => {
    const marker = L.marker([location.lat, location.lon]).addTo(map);
    marker.bindPopup(`<b>${location.name}</b>`);

    // Handle marker click event
    marker.on('click', () => {
        document.getElementById('location-name').textContent = location.name;
        document.getElementById('coordinates').textContent = `${location.lat}, ${location.lon}`;

        // Update selection count
        selectionCounts[location.name] = (selectionCounts[location.name] || 0) + 1;
        updateMostSelected();
    });
});

// Update total markers count
document.getElementById('total-markers').textContent = locations.length;

// Function to determine the most selected location
function updateMostSelected() {
    let mostSelected = Object.keys(selectionCounts).reduce((a, b) => selectionCounts[a] > selectionCounts[b] ? a : b, "N/A");
    document.getElementById('most-selected').textContent = mostSelected;
}
