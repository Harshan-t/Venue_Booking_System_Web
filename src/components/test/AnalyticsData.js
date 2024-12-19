import { FaChurch, FaBuilding, FaGlassCheers, FaHome, FaBriefcase, FaTree } from "react-icons/fa";

export const bookingStats = [
  {
    title: "Active Venues",
    value: "427",
    subValue: "/580",
  },
  {
    title: "Bookings Made",
    value: "3,298",
  },
  {
    title: "Avg. Booking Value",
    value: "$2,534",
  },
];

export const performanceStats = [
  {
    title: "Booking Rate",
    value: "64%",
    chartSrc: "/charts/booking-rate.svg",
  },
  {
    title: "Revenue Growth",
    value: "86%",
    chartSrc: "/charts/revenue-growth.svg",
  },
  {
    title: "Customer Growth",
    value: "+34%",
    chartSrc: "/charts/customer-growth.svg",
  },
];

export const strongestVenues = [
  {
    Icon: FaChurch,
    title: "Wedding Venues",
    percentage: 95,
    width: "w-[172px]",
  },
  {
    Icon: FaBuilding,
    title: "Conference Centers",
    percentage: 92,
    width: "w-[172px]",
  },
  {
    Icon: FaGlassCheers,
    title: "MS conference hall",
    percentage: 89,
    width: "w-[141px]",
  },
];

export const weakestVenues = [
  {
    Icon: FaHome,
    title: "Small Venues (<100)",
    percentage: 74,
    width: "w-[166px]",
  },
  {
    Icon: FaBriefcase,
    title: "Corporate Meeting Rooms",
    percentage: 52,
    width: "w-[166px]",
  },
  {
    Icon: FaTree,
    title: "Outdoor Venues",
    percentage: 36,
    width: "w-[136px]",
  },
];
