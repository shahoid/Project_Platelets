// Initialize map
function initMap() {
    map = L.map('map').setView([20.5937, 78.9629], 5); // Center India as default
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('searchCity');
  
    // Initialize map if find-donor page is open
    if (document.getElementById('map')) {
      initMap();
    }
  });
  
  // Fetch and display donors with map
  async function findDonors() {
    const city = document.getElementById('searchCity').value.trim();
    const donorList = document.getElementById('donorList');
    donorList.innerHTML = ''; // Clear previous results
  
    if (city === '') {
      donorList.innerHTML = '<p>Please select or enter a city.</p>';
      return;
    }
  
    try {
      // Fetch donor data by city
      const res = await fetch(`http://localhost:5000/api/donors?city=${encodeURIComponent(city)}`);
      const data = await res.json();
  
      if (!Array.isArray(data) || data.length === 0) {
        donorList.innerHTML = '<p>No donors found in this city.</p>';
        return;
      }
  
      // Reset map view and remove previous markers
      if (map) {
        map.setView([20.5937, 78.9629], 5);  // Reset to default view
        for (let i in map._layers) {
          if (map._layers[i]._icon) map.removeLayer(map._layers[i]);
        }
      }
  
      // Fetch the city coordinates from the backend
      const cityCoordinates = await getCityCoordinates(city);
      
      if (cityCoordinates) {
        // Center the map to the city's coordinates
        map.setView([cityCoordinates.lat, cityCoordinates.lng], 13);
  
        // Add a marker for the city center
        L.marker([cityCoordinates.lat, cityCoordinates.lng])
          .addTo(map)
          .bindPopup(`<b>${city}</b><br>City center`);
      }
  
      // Add donor markers to the map
      data.forEach(donor => {
        const donorCard = `
          <div class="donor-item">
            <h3>${donor.name}</h3>
            <p><strong>Blood Group:</strong> ${donor.bloodGroup}</p>
            <p><strong>Contact:</strong> ${donor.contact}</p>
            <p><strong>Age:</strong> ${donor.age}</p>
            <p><strong>City:</strong> ${donor.city}</p>
          </div>
        `;
        donorList.innerHTML += donorCard;
  
        // Add marker for each donor if coordinates are available
        if (map && donor.location && donor.location.lat && donor.location.lng) {
          const lat = donor.location.lat;
          const lng = donor.location.lng;
          
          // Add a marker on the map at the donor's location
          L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`<b>${donor.name}</b><br>Blood: ${donor.bloodGroup}<br>${donor.city}`);
        }
      });
    } catch (err) {
      donorList.innerHTML = '<p>Error fetching donors.</p>';
      console.error('Error:', err);
    }
  }
  
  // Function to get latitude and longitude from the city name using Nominatim API
  async function getCityCoordinates(city) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json&addressdetails=1`);
    const data = await response.json();
    if (data && data.length > 0) {
      return { lat: data[0].lat, lng: data[0].lon };
    }
    return null;
  }
  