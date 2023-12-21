export async function fetchCityName(lat, lng) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDneYsrNSFngUt_GmuJL7g4v834V84F5Nw`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    }
  } catch (error) {
    console.error("Error fetching city name:", error);
  }
  return "";
}

export async function fetchCountryName(lat, lng) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDneYsrNSFngUt_GmuJL7g4v834V84F5Nw`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const addressComponents = data.results[0].address_components;
      const countryComponent = addressComponents.find((component) =>
        component.types.includes("country")
      );
      if (countryComponent) {
        return countryComponent.long_name;
      }
    }
  } catch (error) {
    console.error("Error fetching country name:", error);
  }
  return "";
}
