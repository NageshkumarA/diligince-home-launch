
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

export const EquipmentFleet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const equipmentData = [
    { id: 1, name: "AC-100 Crane", type: "Heavy Lift", capacity: "100T", status: "In Use", statusColor: "green" },
    { id: 2, name: "Forklift F-25", type: "Material Handling", capacity: "25T", status: "In Use", statusColor: "pink" },
    { id: 3, name: "Low-bed Trailer LB-40", type: "Transport", capacity: "40T", status: "In Use", statusColor: "pink" },
    { id: 4, name: "Heavy Truck HT-28", type: "Transport", capacity: "28T", status: "Maintenance", statusColor: "purple" },
    { id: 5, name: "Mobile Crane MC-50", type: "Heavy Lift", capacity: "50T", status: "Available", statusColor: "green" }
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "In Use": return "bg-[#eb2f96]/10 text-[#eb2f96]";
      case "Maintenance": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEquipment = equipmentData.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || equipment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Equipment Fleet</CardTitle>
        <Button className="bg-[#eb2f96] hover:bg-[#eb2f96]/90">
          Manage Equipment
        </Button>
      </CardHeader>
      <CardContent>
        {/* Search and Filter */}
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb2f96]"
          >
            <option value="all">All Status</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        {/* Equipment Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Equipment Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Capacity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.map((equipment) => (
                <tr key={equipment.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{equipment.name}</td>
                  <td className="py-3 px-4 text-gray-600">{equipment.type}</td>
                  <td className="py-3 px-4 text-gray-600">{equipment.capacity}</td>
                  <td className="py-3 px-4">
                    <Badge className={getStatusBadgeColor(equipment.status)}>
                      {equipment.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
