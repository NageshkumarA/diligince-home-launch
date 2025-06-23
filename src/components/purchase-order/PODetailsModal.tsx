
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface POData {
  id: string;
  title: string;
  vendor: string;
  status: string;
  progress: number;
  orderValue: number;
  startDate: string;
  endDate: string;
  description: string;
}

interface PODetailsModalProps {
  poData: POData;
  trigger?: React.ReactNode;
}

export const PODetailsModal = ({ poData, trigger }: PODetailsModalProps) => {
  const [open, setOpen] = React.useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const defaultTrigger = (
    <Button variant="ghost" size="sm">
      <Eye className="h-4 w-4" />
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Purchase Order Details
            <Badge className={getStatusColor(poData.status)}>
              {poData.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">PO Number</label>
                  <p className="font-medium">{poData.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Vendor</label>
                  <p className="font-medium">{poData.vendor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Project Title</label>
                  <p className="font-medium">{poData.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Order Value</label>
                  <p className="font-medium">${poData.orderValue.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Start Date</label>
                  <p>{poData.startDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">End Date</label>
                  <p>{poData.endDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion</span>
                  <span>{poData.progress}%</span>
                </div>
                <Progress value={poData.progress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{poData.description}</p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to={`/work-completion-payment/${poData.id}`}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Full Details
                </Link>
              </Button>
              <Button asChild>
                <Link to="/create-purchase-order">
                  Duplicate PO
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
