import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { FaSearch, FaPen, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import VenueModal from "../components/venueview";

function Venue() {
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

  const filteredProducts = products.filter((product) => {
    return (
      product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product?.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product?.type?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="dashboard flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col p-4 w-full lg:w-4/5">
        <h2 className="text-3xl font-bold text-gray-700 mb-8">Venue</h2>
        <div className="flex justify-between items-center">
          <div className="flex justify-start p-4">
            <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-sm px-10 py-1">
              <FaSearch className="text-gray-400 mr-3 text-xl" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 w-full border-none text-lg"
              />
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
              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={editData.type}
                  onChange={handleEditChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
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
