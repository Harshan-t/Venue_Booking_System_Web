const RejectionReason = ({ rejectionReason, setRejectionReason }) => {
    return (
      <div>
        <label className="block text-sm font-medium text-red-600">Rejection Reason:</label>
   
        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 h-20 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    );
  };
  
  export default RejectionReason;
  