import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents,useMap } from 'react-leaflet';
import ViewListBar from '../ViewListBar/ViewListBar'
import SideBar from '../SideBar/SideBar';


const ZoomToLocationButton = () => {
    const map = useMap(); // Access the map instance
    const [error, setError] = useState(null);

    const handleFindMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    map.setView([latitude, longitude], 13); // Zoom level 13
                },
                (err) => {
                    setError(err.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div>
            <button
                style={{ zIndex: 10000 }}
                onClick={handleFindMyLocation}
                className='absolute top-[50%] right-0 bg-[#FF7F5C] px-5 py-2 cursor-pointer rounded-s-xl'
            >
                <i className="fa-solid fa-location-dot text-[#FFFFFF] text-2xl"></i>
            </button>
            {error && <p style={{ color: 'red', position: 'absolute', top: '10px', right: '10px' }}>{error}</p>}
        </div>
    );
};
const ClickableMap = ({ addLocation }) => {
    useMapEvents({
        click(e) {
            addLocation(e.latlng);
        },
    });
    return null;
};

export { ZoomToLocationButton, ClickableMap };


export default function Mapview() {

  const [position, setPosition] = useState([51.505, -0.09]);
    const [error, setError] = useState(null);
    const [locations, setLocations] = useState([]);
    const [currentNote, setCurrentNote] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [showInputSection, setShowInputSection] = useState(false);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setPosition([latitude, longitude]);
                    },
                    (error) => {
                        setError(error.message);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        };

        getLocation();
    }, []);

    const addLocation = (latlng) => {
        setCurrentNote('');
        setShowInputSection(true);
        setPosition([latlng.lat, latlng.lng]);
        setEditingIndex(null); // Reset editing index when adding a new location
    };

    const handleNoteChange = (e) => {
        setCurrentNote(e.target.value);
    };

    const handleSave = () => {
        if (currentNote.trim()) {
            if (editingIndex !== null) {
                // Update existing location
                const updatedLocations = locations.map((loc, index) =>
                    index === editingIndex ? { ...loc, note: currentNote } : loc
                );
                setLocations(updatedLocations);
            } else {
                // Add new location
                const newLocation = { position, note: currentNote };
                setLocations((prev) => [...prev, newLocation]);
            }
        }
        // Reset fields after trying to save
        setCurrentNote('');
        setShowInputSection(false);
        setEditingIndex(null); // Reset editing index
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setCurrentNote(locations[index].note);
        setShowInputSection(true);
        setPosition(locations[index].position);
    };

    const handleDelete = (index) => {
        const updatedLocations = locations.filter((_, i) => i !== index);
        setLocations(updatedLocations);
        // Reset fields after deleting
        setShowInputSection(false);
        setCurrentNote('');
        setEditingIndex(null);
    };

    const handleCancel = () => {
        setCurrentNote('');
        setShowInputSection(false);
    };
    
  return (
    <>
      <SideBar/>
      <div className='absolute top-0 right-0 h-full w-[95%]'>
        <ViewListBar/>
        <div className='h-[90%] -z-10 mt-[5%]'>
        {error && <p>{error}</p>}
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%', zIndex: 1 }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Marker position={position}>
                    <Popup>Your Location</Popup>
                </Marker> */}
                {locations.map((loc, index) => (
                    <Marker key={index} position={loc.position}>
                        <Popup>
                            <div >
                                <p>{loc.note}</p>
                                <button style={{ padding: '5px 10px', backgroundColor: '#FF7F5C', color: '#fff', border: 'none', borderRadius: '5px' , marginRight:'5px' }} onClick={() => handleEdit(index)}>Edit</button>
                                <button style={{ padding: '5px 10px', backgroundColor: '#c3c3c2', color: '#3D5161', border: 'none', borderRadius: '5px' }} onClick={() => handleDelete(index)}>Delete</button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
                <ZoomToLocationButton />
                <ClickableMap addLocation={addLocation} />
            </MapContainer>
            {showInputSection && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    zIndex: 2,
                }}>
                    <h2>{editingIndex !== null ? 'Edit Location' : 'Add New Location'}</h2>
                    <input
                        type="text"
                        value={currentNote}
                        onChange={handleNoteChange}
                        placeholder="Enter your note"
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <button onClick={handleCancel} style={{ padding: '10px 15px', backgroundColor: '#ccc', color: '#000', border: 'none', borderRadius: '5px' }}>
                            Cancel
                        </button>
                        <button onClick={handleSave} style={{ padding: '10px 15px', backgroundColor: '#FF7F5C', color: '#fff', border: 'none', borderRadius: '5px' }}>
                            {editingIndex !== null ? 'Update' : 'Save'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
    </>
  )
}