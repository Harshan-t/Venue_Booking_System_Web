import React from "react";

const StaffModal = ({ data, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">Staff Details</h3>
                   
                </div>
                <div className="space-y-3 text-gray-700">
                    <p><strong className="text-gray-900">Name:</strong> {data.name}</p>
                    <p><strong className="text-gray-900">Department:</strong> {data.department}</p>
                    <p><strong className="text-gray-900">Email:</strong> <a href={`mailto:${data.email}`} className="text-blue-500 hover:underline">{data.email}</a></p>
                    <p><strong className="text-gray-900">Contact:</strong> {data.contact}</p>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StaffModal;
