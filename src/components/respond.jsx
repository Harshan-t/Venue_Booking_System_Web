import React, { useState, useEffect } from "react";

function Modal({ selectedQuery, closeModal, onSubmitResponse }) {
  const [status, setStatus] = useState(selectedQuery?.Status || "Unresolved");

  useEffect(() => {
    if (selectedQuery) {
      setStatus(selectedQuery.Status);
    }
  }, [selectedQuery]);

  const handleSubmit = async () => {
    if (status === "Unresolved") {
      const updatedStatus = "Resolved";

      try {
        await onSubmitResponse(updatedStatus, selectedQuery.id);
        closeModal();
      } catch (error) {
        alert("Error updating status, please try again.");
      }
    } else {
      alert("This query is already resolved.");
    }
  };

  if (!selectedQuery) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold">Feedback Details</h2>
        <p><strong>Name:</strong> {selectedQuery.name}</p>
        <p><strong>Email:</strong> {selectedQuery.email}</p>
        <p><strong>Venue Name:</strong> {selectedQuery.venuename}</p>
        <p><strong>Subject:</strong> {selectedQuery.subject}</p>
        <p><strong>Comments:</strong> {selectedQuery.comments}</p>

        <div className="mt-4 flex justify-between">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Status to Resolved
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;