const axios = require('axios');

// Function to get coordinates for an address
module.exports.getAddressCoordinate = async (address) => {
    const apikey = process.env.GOOGLE_MAPS_API; // Ensure this environment variable is set
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat, // Corrected property name
                lng: location.lng,
            };
        } else {
            throw new Error(`Unable to fetch coordinates. API Response: ${response.data.status}`);
        }
    } catch (error) {
        console.error(`Error fetching coordinates for address "${address}":`, error.message);
        throw error;
    }
};

// Function to get distance and time between origin and destination
module.exports.getDistanceTime = async (origin, destination) => {
    const apiKey = process.env.GOOGLE_MAPS_API; // Ensure this environment variable is set
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];

            if (element.status === 'OK') {
                return {
                    success: true,
                    distance: element.distance.text,
                    duration: element.duration.text,
                };
            } else {
                throw new Error(`Unable to fetch distance data. Element status: ${element.status}`);
            }
        } else {
            throw new Error(`API responded with status: ${response.data.status}`);
        }
    } catch (error) {
        console.error(`Error fetching distance and time: ${error.message}`);
        throw error;
    }
};


module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error("query is required");
    }
    
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};
