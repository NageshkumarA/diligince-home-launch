
import { FileText, Send, ShoppingCart, Package, Briefcase, Calendar, Star, TrendingUp, Users, Truck, Wrench } from "lucide-react";
import { StatItem } from "@/components/shared/dashboard/GenericDashboardStats";

export const productVendorStats: StatItem[] = [
  {
    title: "Product RFQs",
    value: "9",
    subtitle: "open requests",
    icon: FileText,
    color: "text-[#faad14]",
    bgColor: "bg-[#faad14]/10"
  },
  {
    title: "Quotations Sent",
    value: "6",
    subtitle: "awaiting response",
    icon: Send,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Active Orders",
    value: "4",
    subtitle: "in progress",
    icon: ShoppingCart,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Total Products",
    value: "84",
    subtitle: "in catalog",
    icon: Package,
    color: "text-[#722ed1]",
    bgColor: "bg-[#722ed1]/10"
  }
];

export const serviceVendorStats: StatItem[] = [
  {
    title: "Service RFQs",
    value: "7",
    subtitle: "open requests",
    icon: FileText,
    color: "text-[#fa8c16]",
    bgColor: "bg-[#fa8c16]/10"
  },
  {
    title: "Proposals Sent",
    value: "5",
    subtitle: "awaiting response",
    icon: Send,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Active Projects",
    value: "3",
    subtitle: "in progress",
    icon: Briefcase,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Team Availability",
    value: "7/12",
    subtitle: "engineers available",
    icon: Users,
    color: "text-[#722ed1]",
    bgColor: "bg-[#722ed1]/10"
  }
];

export const expertStats: StatItem[] = [
  {
    title: "Available Jobs",
    value: "8",
    subtitle: "matched to skills",
    icon: Briefcase,
    color: "text-[#722ed1]",
    bgColor: "bg-[#722ed1]/10"
  },
  {
    title: "Applied Jobs",
    value: "3",
    subtitle: "awaiting response",
    icon: Calendar,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Ongoing Projects",
    value: "2",
    subtitle: "in progress",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Average Rating",
    value: "4.9",
    subtitle: "★★★★★",
    icon: Star,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];

export const logisticsVendorStats: StatItem[] = [
  {
    title: "Transport Requests",
    value: "7",
    subtitle: "available jobs",
    icon: FileText,
    color: "text-[#eb2f96]",
    bgColor: "bg-[#eb2f96]/10"
  },
  {
    title: "Quotes Submitted",
    value: "5",
    subtitle: "awaiting approval",
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Active Deliveries",
    value: "3",
    subtitle: "in transit",
    icon: Truck,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Equipment Status",
    value: "12/15",
    subtitle: "vehicles available",
    icon: Wrench,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];
