import React from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import "./Map.css"
export default function Map({ center, countries }) {
    function MyComponent() {
        const map = useMap();
        map.setView(center, 4);
        return null;
    }
    function CircleOnMap(data) {
        return data.map(country => {
            return <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                color='#cc1034'
                fillColor='#cc1034'
                radius={Math.sqrt(country.cases)*100}>
                    <Popup>
                        <div className="flag"><img src = {country.countryInfo.flag} alt = "flag"/></div>
                        <div><strong>{country.country}</strong></div>
                        <div><strong>Cases:</strong> {country.cases}</div>
                        <div><strong>Recovered:</strong> {country.recovered}</div>
                        <div><strong>Deaths:</strong> {country.deaths}</div>
                    </Popup>
            </Circle>
        })
    }
    return (
        <div className="map" >
            <MapContainer center={center ? center : [34.80746, -40.4796]} zoom={3}>
                {center ? <MyComponent /> : null}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {countries[0]?CircleOnMap(countries):null}
            </MapContainer>
        </div>
    )
}
