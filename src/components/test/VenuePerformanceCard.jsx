  import chartSrc from "../../assets/chartSrc.png"
  export default function VenuePerformanceCard({ title, value }) {
    return (
      <div className="flex flex-col px-4 py-5 bg-white rounded-2xl border-gray-100 border-solid border-[0.924px]">
        <div className="gap-2 text-sm font-medium tracking-normal text-black text-opacity-70">
          {title}
        </div>
        <div className="self-start mt-7 text-2xl font-bold text-black">
          {value}
        </div>
        <img
          loading="lazy"
          src={chartSrc}
          className="object-contain mt-3.5 aspect-[4.1] w-[127px]"
          alt={`${title} chart`}
        />
      </div>
    );
  }
