import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { FaSearch, FaPen, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import VenueModal from "../components/venueview";
import { MdFilterList } from "react-icons/md";

function Venue() {
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [filters, setFilters] = useState({
    max_capacity: "",
    min_capacity: "",
    location: "",
    type: "",
    ac: false,
    projector: false,
    micAndSpeaker: false
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    capacity: "",
    location: "",
    type: "",
    ac: "",
    projector: "",
    micAndSpeaker: "",
  });

  const openModal = (product) => {
    setModalData(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const setVenueDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:8000/venues");
      if (response.data && Array.isArray(response.data.venues)) {
        setProducts(response.data.venues);
      } else {
        throw new Error("Invalid venue data");
      }
    } catch (error) {
      console.error("Error fetching venues:", error);
      setError("Failed to load venues. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    console.log("Deleting venue with ID:", id);

    axios.delete(`http://localhost:8000/venues/${id}`)
      .then((response) => {
        console.log("Venue deleted:", response.data);
        setProducts((prev) => prev.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting venue:", error.response?.data || error.message);
        setError("Failed to delete venue. Please try again later.");
      });
  };

  const handleEdit = (product) => {
    setEditData({
      id: product.id,
      name: product.name,
      capacity: product.capacity,
      location: product.location,
      type: product.type,
      ac: product.ac,
      projector: product.projector,
      micAndSpeaker: product.micAndSpeaker
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editData.name || !editData.capacity || !editData.location || !editData.type) {
      return setError("All fields are required.");
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/venues/${editData.id}`,
        {
          name: editData.name,
          capacity: editData.capacity,
          location: editData.location,
          type: editData.type,
          ac: editData.ac ? "Yes" : "No",
          projector: editData.projector ? "Yes" : "No",
          micAndSpeaker: editData.micAndSpeaker ? "Yes" : "No"
        }
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating venue:", error);
      setError("Failed to update venue. Please try again later.");
    }
  };

  useEffect(() => {
    setVenueDetails();
  }, [isEditModalOpen]);

  const filteredProducts = products.filter((venue) => {
    return (
      venue?.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.min_capacity ? venue.capacity >= filters.min_capacity : true) &&
      (filters.max_capacity ? venue.capacity <= filters.max_capacity : true) &&
      (filters.location ? venue.location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
      (filters.type ? venue.type.toLowerCase().includes(filters.type.toLowerCase()) : true) &&
      (filters.ac ? venue.ac : true) &&
      (filters.projector ? venue.projector : true) &&
      (filters.micAndSpeaker ? venue.micAndSpeaker : true)
    );
  });

  return (
    <div className="dashboard flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col p-4 w-full lg:w-4/5">
        <h2 className="text-3xl font-bold text-gray-700 mb-8">Venues</h2>

        <div className="flex justify-between items-center">
          <div className="flex justify-start p-4">
            <div>

              <div className="bg-white flex items-center w-full max-w-md border-2 rounded-2xl shadow-sm px-6 py-1">
                <FaSearch className="text-gray-400 mr-3 text-xl" />
                <input
                  type="text"
                  placeholder="Search Venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 w-full border-none text-lg"
                />
              </div>
            </div>
            <div
              className="flex items-center ml-4 shadow-sm border-2 rounded-2xl px-4 cursor-pointer py-1"
              onClick={() => setShowFilterPopup(true)}
            >
              <MdFilterList size="23px" className="mr-3 flex items-center" />
              Filter
            </div>
          </div>
          <Link to={"/addvenue1"}>
            <button className="flex items-center focus:outline-none text-white bg-[#27AE60] hover:bg-green-500 focus:ring-2 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              Add venue <span className="ml-2"><FaPlus /></span>
            </button>
          </Link>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {loading && <div className="text-center text-gray-700">Loading...</div>}

        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-900 uppercase bg-[#fcfdfd]">
              <tr>
                <th scope="col" className="p-4">Photo</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Capacity</th>
                <th scope="col" className="px-6 py-3">Location</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                    onClick={() => openModal(product)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="w-4 p-4">
                      {product.photo && (
                        <img
                          src={product.photo}
                          alt={product.name}
                          className="w-8 h-8 object-cover rounded-full"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.capacity}</td>
                    <td className="px-6 py-4">{product.location}</td>
                    <td className="px-6 py-4">{product.type}</td>
                    <td className="px-6 py-4 flex space-x-6">
                      <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(product);
                        }}
                      >
                        <FaPen />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(product.id);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No venues available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <VenueModal
        data={modalData}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {showFilterPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Filter Venues</h2>
            <div className="grid grid-cols-2 ">
              <div>
                <label htmlFor="">Minimum Capacity</label>
                <input
                  type="number"
                  placeholder="Minimum Capacity"
                  value={filters.min_capacity}
                  onChange={(e) => setFilters({ ...filters, min_capacity: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="">Maximum Capacity</label>
                <input
                  type="number"
                  placeholder="Maximum Capacity"
                  value={filters.max_capacity}
                  onChange={(e) => setFilters({ ...filters, max_capacity: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white text-gray-700"
                >
                  <option value="">All</option>
                  <option value="Sunflower Block">Sunflower Block</option>
                  <option value="Daisy Block">Daisy Block</option>
                  <option value="Rosewood Block">Rosewood Block</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white text-gray-700"
                >
                  <option value="">All</option>
                  <option value="Seminar Hall">Seminar Hall</option>
                  <option value="Conference Room">Conference Room</option>
                  <option value="Auditorium">Auditorium</option>
                </select>
              </div>
              <div className="flex items-center ml-2">
                <input
                  type="checkbox"
                  checked={filters.ac}
                  onChange={(e) => setFilters({ ...filters, ac: e.target.checked })}
                  className="mr-2 size-4"
                />
                <label>Air Conditioning</label>
              </div>
              <div className="flex items-center ml-2">
                <input
                  type="checkbox"
                  checked={filters.projector}
                  onChange={(e) => setFilters({ ...filters, projector: e.target.checked })}
                  className="mr-2 size-4"
                />
                <label>Projector</label>
              </div>
              <div className="flex items-center ml-2">
                <input
                  type="checkbox"
                  checked={filters.micAndSpeaker}
                  onChange={(e) => setFilters({ ...filters, micAndSpeaker: e.target.checked })}
                  className="mr-2 size-4"
                />
                <label>Mic & Speaker</label>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-green-200 rounded-lg text-green-600"
                onClick={() => setShowFilterPopup(false)}
              >
                OK
              </button>
              <button
                className="px-4 py-2 bg-red-200 rounded-lg text-red-600"
                onClick={() => {
                  setFilters({
                    max_capacity: "",
                    min_capacity: "",
                    location: "",
                    type: "",
                    ac: false,
                    projector: false,
                    micAndSpeaker: false,
                  });
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )
      }

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Venue</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={editData.capacity}
                  onChange={handleEditChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={editData.location}
                  onChange={handleEditChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="ml-2 flex justify-between w-[250px]" >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ac"
                    name="ac"
                    checked={editData.ac === 1}
                    onChange={(e) =>
                      handleEditChange({ target: { name: "ac", value: e.target.checked ? 1 : 0 } })
                    }
                    className="rounded-md size-[15px] mr-2 cursor-pointer"
                  />
                  <label htmlFor="ac" className="text-sm font-medium text-gray-700">AC</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="projector"
                    name="projector"
                    checked={editData.projector === 1}
                    onChange={(e) =>
                      handleEditChange({ target: { name: "projector", value: e.target.checked ? 1 : 0 } })
                    }
                    className="rounded-md size-[15px] mr-2 cursor-pointer"
                  />
                  <label htmlFor="projector" className="text-sm font-medium text-gray-700">Projector</label>
                </div>
              </div>
              <div className="flex items-center mt-4 ml-2">
                <input
                  type="checkbox"
                  id="micAndSpeaker"
                  name="micAndSpeaker"
                  checked={editData.micAndSpeaker === 1}
                  onChange={(e) =>
                    handleEditChange({ target: { name: "micAndSpeaker", value: e.target.checked ? 1 : 0 } })
                  }
                  className="rounded-md size-[15px] mr-2 cursor-pointer"
                />
                <label htmlFor="micAndSpeaker" className="text-sm font-medium text-gray-700">Mic & Speaker</label>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Venue;
