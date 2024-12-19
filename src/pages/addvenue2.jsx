
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

function Addvenue2() {
  const location = useLocation();
  const venueDataFromLocation = location.state || {}; 
  const [venueData, setVenueData] = useState(venueDataFromLocation); 
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (venueDataFromLocation && venueDataFromLocation.photo) {
      setPhoto(venueDataFromLocation.photo);
    }
  }, [venueDataFromLocation]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
    const formData = new FormData();
    formData.append("name", venueData.name || "");
    formData.append("type", venueData.type || "");
    formData.append("location", venueData.location || "");
    formData.append("capacity", venueData.capacity || "");
    formData.append("projector", venueData.projector === "Yes" ? "Yes" : "No");
    formData.append("ac", venueData.ac === "Yes" ? "Yes" : "No");
    formData.append("micAndSpeaker", venueData.micAndSpeaker === "Yes" ? "Yes" : "No");
  
    if (venueData.photo) {
      formData.append("photo", venueData.photo);
    }
  
    try {
      const response = await axios.post("http://localhost:8000/venues/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 201) {
        alert("Venue added successfully!");
  
        setVenueData({
          ...venueData,
          photo: response.data.photo,
        });
  
        navigate("/venue");
      }
    } catch (error) {
      console.error("Error adding venue:", error);
      alert("Failed to add venue. Please try again.");
    }
  };
  

  return (
    <div className="dashboard flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex flex-col p-8 w-full lg:w-4/5">
        <h2 className="text-3xl font-bold text-gray-700 mb-8">Add Venue</h2>
        <div className="p-10 bg-white border border-gray-200 rounded-3xl shadow-2xl">
          {photo && (
            <div className="flex justify-center mb-8">
              <img
                src={typeof photo === "string" ? `http://localhost:8000/venues/${photo}` : URL.createObjectURL(photo)} // Handle both URL and file objects
                alt="Uploaded"
                className="w-full h-56 object-cover rounded-xl shadow-lg border-4 border-blue-300"
              />
            </div>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-gray-600 font-medium">Name:</h3>
              <p className="text-lg text-gray-800">{venueData.name || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-gray-600 font-medium">Type:</h3>
              <p className="text-lg text-gray-800">{venueData.type || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-gray-600 font-medium">Location:</h3>
              <p className="text-lg text-gray-800">{venueData.location || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-gray-600 font-medium">Capacity:</h3>
              <p className="text-lg text-gray-800">{venueData.capacity || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-gray-600 font-medium">Projector:</h3>
              <p className="text-lg text-gray-800">{venueData.projector ? "Yes" : "No"}</p>
            </div>
            <div>
              <h3 className="text-gray-600 font-medium">AC:</h3>
              <p className="text-lg text-gray-800">{venueData.ac ? "Yes" : "No"}</p>
            </div>
            <div>
              <h3 className="text-gray-600 font-medium">MIC and Speaker:</h3>
              <p className="text-lg text-gray-800">{venueData.micAndSpeaker ? "Yes" : "No"}</p>
            </div>
          </div>



          <div className="flex justify-end mt-10 space-x-4">
            <Link to="/addvenue1">
              <button className="bg-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-400 transition-all duration-200">
                Back
              </button>
            </Link>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 shadow-lg transition-all duration-200"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addvenue2;
