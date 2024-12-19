import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function AddVenue1() {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [projector, setProjector] = useState("");
  const [ac, setAc] = useState("");
  const [micAndSpeaker, setMicAndSpeaker] = useState("");

  const navigate = useNavigate();

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("name", name);
    formData.append("type", type);
    formData.append("location", location);
    formData.append("capacity", capacity);
    formData.append("projector", projector);
    formData.append("ac", ac);
    formData.append("micAndSpeaker", micAndSpeaker);

    try {
      const response = await fetch("/api/venues", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        navigate("/addvenue2", { state: { venueData: result } });
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="dashboard flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex flex-col p-8 w-full lg:w-4/5">
        <h2 className="text-4xl font-bold text-gray-700 mb-8">Add Venue</h2>
        <div className="p-10 bg-white border border-gray-200 rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="Uploaded"
                className="w-40 h-40 object-cover rounded-full shadow-lg border-4 border-blue-300 mb-6"
              />
            ) : (
              <button className="bg-blue-100 rounded-full p-8 mb-6 hover:bg-blue-200 transition-all duration-300">
                <FaCamera className="text-blue-600 text-4xl" />
              </button>
            )}
            <label className="text-blue-600 font-semibold cursor-pointer hover:text-blue-500 transition-colors duration-200">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-600 font-medium mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter venue name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100 focus:bg-white focus:border-blue-400 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100 focus:bg-white focus:border-blue-400 transition-all duration-200"
                >
                  <option>--</option>
                  <option>Seminar Hall</option>
                  <option>Conference Room</option>
                  <option>Auditorium</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100 focus:bg-white focus:border-blue-400 transition-all duration-200"
                >
                  <option>--</option>
                  <option>Sunflower Block</option>
                  <option>Daisy Block</option>
                  <option>Rosewood Block</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2">Capacity</label>
                <input
                  type="number"
                  placeholder="Enter capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100 focus:bg-white focus:border-blue-400 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2">Projector</label>
                <select
                  value={projector}
                  onChange={(e) => setProjector(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100 focus:bg-white focus:border-blue-400 transition-all duration-200"
                >
                  <option>--</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2">AC</label>
                <select
                  value={ac}
                  onChange={(e) => setAc(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100 focus:bg-white focus:border-blue-400 transition-all duration-200"
                >
                  <option>--</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2">MIC and Speaker</label>
                <select
                  value={micAndSpeaker}
                  onChange={(e) => setMicAndSpeaker(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100 focus:bg-white focus:border-blue-400 transition-all duration-200"
                >
                  <option>--</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-10 space-x-4">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-400 transition-all duration-200"
                onClick={() => navigate("/venue")}
              >
                Back
              </button>
              <Link
                to="/addvenue2"
                state={{
                  photo, // Send the actual file object
                  name,
                  type,
                  location,
                  capacity,
                  projector,
                  ac,
                  micAndSpeaker,
                }}
              >
                <button className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 shadow-lg transition-all duration-200">
                  Next
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddVenue1;
