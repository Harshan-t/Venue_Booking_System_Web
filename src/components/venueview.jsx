import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const VenueModal = ({ data, isOpen, onClose }) => {
    if (!isOpen || !data) return null;

    const placeholderPhoto = "https://via.placeholder.com/150";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
            role="dialog"
            aria-modal="true"
            aria-labelledby="venue-modal-title"
        >
            <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg transform scale-95 transition-transform duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close"
                >
                    <AiOutlineClose size={24} />
                </button>

                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h3
                        id="venue-modal-title"
                        className="text-2xl font-bold text-gray-800"
                    >
                        Venue Details
                    </h3>
                </div>

                <div className="flex flex-col items-center mb-8">
                    <img
                        src={data?.photo ? data.photo : placeholderPhoto}
                        alt="Venue"
                        className="w-full h-60 object-cover shadow-lg border-4 border-blue-300 mb-6 rounded-lg"
                    />
                </div>

                <div className="space-y-4 text-gray-700">
                    <p>
                        <strong className="text-gray-900">Name:</strong> {data.name}
                    </p>
                    <p>
                        <strong className="text-gray-900">Capacity:</strong> {data.capacity}
                    </p>
                    <p>
                        <strong className="text-gray-900">Location:</strong> {data.location}
                    </p>
                    <p>
                        <strong className="text-gray-900">Projector:</strong> {data.projector ? "Yes" : "No"}
                    </p>
                    <p>
                        <strong className="text-gray-900">AC:</strong> {data.ac ? "Yes" : "No"}
                    </p>
                    <p>
                        <strong className="text-gray-900">Mic & Speaker:</strong> {data.micAndSpeaker ? "Yes" : "No"}
                    </p>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VenueModal;
