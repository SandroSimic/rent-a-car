/* eslint-disable react/prop-types */
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const Map = ({ allCars }) => {
  const customIcon = new Icon({
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/fb/Map_pin_icon_green.svg",
    iconSize: [30, 30],
  });

  return (
    <div className="map">
      <MapContainer center={[48.8456, 2.3522]} zoom={13}>
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />

        {allCars &&
          allCars.map((car) =>
            car?.lat && car?.lng ? (
              <Marker
                key={car._id}
                position={[car?.lat, car?.lng]}
                icon={customIcon}
              >
                <Popup>
                  <div className="popup">
                    <div className="popup__image">
                      <img src={car?.image} alt="Car" />
                    </div>
                    <div className="popup__text">
                      <h3>{car?.name}</h3>
                      <div className="popup__price">
                        <div className="popup__price__info">
                          <span>${car?.price}</span>
                          <p>{car?.owner && car?.owner.username}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ) : null
          )}
      </MapContainer>
    </div>
  );
};

export default Map;
