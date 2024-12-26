import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import { FaSearch } from "react-icons/fa";
import Modal from "../components/respond";

function Queries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [feedback, setFeedback] = useState([]);

  const fetchFeedback = () => {
    axios
      .get("http://localhost:8000/query")
      .then((response) => {
        if (response.data && response.data.HELP) {
          setFeedback(response.data.HELP);
        } else {
          console.error("Invalid response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching feedback data:", error);
      });
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const filteredFeedbacks = feedback.filter((item) => {
    return (
      item.Status === "Unresolved" &&
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.venuename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.comments.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleRowClick = (item) => {
    setSelectedQuery(item);
  };

  const closeModal = () => {
    setSelectedQuery(null);
  };

  const handleSubmitResponse = async (status, queryId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/query/${queryId}/status`,
        { status: "Resolved" }
      );

      if (response.status === 200) {
        setFeedback((prevFeedback) =>
          prevFeedback.map((item) =>
            item.id === queryId ? { ...item, Status: "Resolved" } : item
          )
        );

        alert("Status updated to Resolved!");
      } else {
        console.error("Failed to update status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again later.");
    }
  };

  return (
    <div className="dashboard flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col p-4 w-full lg:w-4/5">
        <h2 className="text-3xl font-bold text-gray-700 mb-8">Feedback Queries</h2>

        <div className="flex justify-start p-4">
          <div className="bg-white flex items-center w-[300px] max-w-md shadow-sm border-2 rounded-2xl shadow-sm px-4 py-1">
            <FaSearch className="text-gray-400 mr-3 text-xl" size={19} />
            <input
              type="text"
              placeholder="Search Feedback..."
              className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 w-full border-none p-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Venue Name</th>
                <th scope="col" className="px-6 py-3">Subject</th>
                <th scope="col" className="px-6 py-3">Comments</th>
                <th scope="col" className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.length ?
                filteredFeedbacks.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(item)}
                  >
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.venuename}</td>
                    <td className="px-6 py-4">{item.subject}</td>
                    <td className="px-6 py-4">{item.comments}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 ${item.Status === "Unresolved"
                            ? "inline-flex items-center justify-center bg-[#fcd7d4] text-sm font-medium text-[#ef3826] px-2 py-1 w-[100px] rounded-lg"
                            : item.Status === "Resolved"
                              ? "inline-flex items-center justify-center bg-[#ccf0eb] text-sm text-[#00b69b] font-medium px-2 py-1 w-[90px] rounded-lg"
                              : "bg-gray-500"
                          }`}
                      >
                        {item.Status}
                      </span>
                    </td>
                  </tr>
                )):(<tr><td colSpan="6" className="px-6 py-4 text-center text-gray-500">No Queries, All Good.</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {selectedQuery && (
        <Modal
          selectedQuery={selectedQuery}
          closeModal={closeModal}
          onSubmitResponse={handleSubmitResponse}
        />
      )}
    </div>
  );
}

export default Queries;