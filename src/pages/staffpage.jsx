
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { FaSearch } from "react-icons/fa";
import StaffModal from "../components/staffview";
import axios from "axios";

function Staffpage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);

    const setstaffdetails = () => {
        axios.get("http://localhost:8000/staffpage")
            .then(response => {
                console.log(response.data)
                if (response.data && response.data.staffdetails) {
                    setProducts(response.data.staffdetails);
                } else {
                    console.error("Invalid response format:", response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching staff details:", error);
            });
    };

    useEffect(() => {
        setstaffdetails();
    }, []);

    const filteredProducts = products.filter((product) => {
        return (
            (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (product.department && product.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (product.email && product.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (product.contact && product.contact.toString().includes(searchQuery)) // Ensure contact is treated
        );
    });

    const openModal = (product) => {
        setModalData(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    };

    return (
        <div className="dashboard flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex flex-col p-4 w-full lg:w-4/5">
                <h2 className="text-3xl font-bold text-gray-700 mb-8">Staff details</h2>

                <div className="flex justify-start p-4">
                    <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-sm px-3 py-1">
                        <FaSearch className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 w-full border-none"
                        />
                    </div>
                </div>

                <div className="shadow-md overflow-x-auto sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Staff Name</th>
                                <th scope="col" className="px-6 py-3">Department</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Contact</th>
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
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {product.id}
                                        </th>
                                        <td className="px-6 py-4">{product.name}</td>
                                        <td className="px-6 py-4">{product.department}</td>
                                        <td className="px-6 py-4">{product.email}</td>
                                        <td className="px-6 py-4">{product.contact}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        No staff available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <StaffModal data={modalData} isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default Staffpage;
