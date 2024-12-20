export default function VenueTypeCard({
  Icon,
  title,
  percentage,
  width,
  isStrong,
}) {
  const gradientClass = isStrong
    ? "bg-gradient-to-r from-green-400 to-green-600"
    : "bg-gradient-to-r from-yellow-400 to-pink-500";

  return (
    <div className="flex items-center gap-4 p-4 mb-2 bg-white rounded-lg shadow-md">
      <div className="text-2xl text-gray-600">
        <Icon />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-800">{title}</div>
        <div className="flex items-center mt-2">
          <div
            className={`h-2 rounded-full ${gradientClass} ${width}`}
          ></div>
          <div className="ml-3 text-sm text-gray-600">{percentage}% Occupancy</div>
        </div>
      </div>
    </div>
  );
}
