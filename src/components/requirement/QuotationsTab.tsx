import React from "react";
import { useNavigate } from "react-router-dom";
import { QuotationsByRequirementResponse } from "@/types/quotation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp, TrendingDown, Eye, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface QuotationsTabProps {
  quotations: QuotationsByRequirementResponse | null;
  loading: boolean;
}

export const QuotationsTab: React.FC<QuotationsTabProps> = ({ quotations, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!quotations || quotations.data.quotations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quotations</CardTitle>
          <CardDescription>No quotations received yet</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">
            Vendors haven't submitted quotations for this requirement yet.
          </p>
          <p className="text-sm text-muted-foreground">
            Check back later or contact vendors directly.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { summary, quotations: quotationsList } = quotations.data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_review":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "under_evaluation":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{summary.totalQuotations}</div>
            <p className="text-sm text-muted-foreground">Total Quotations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{summary.pendingReview}</div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{summary.approved}</div>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{summary.rejected}</div>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle>Price Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-sm text-muted-foreground">Lowest Quote</div>
                <div className="text-xl font-bold">${summary.lowestQuote.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5" />
              <div>
                <div className="text-sm text-muted-foreground">Average Quote</div>
                <div className="text-xl font-bold">${summary.averageQuote.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-sm text-muted-foreground">Highest Quote</div>
                <div className="text-xl font-bold">${summary.highestQuote.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quotations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Received Quotations</CardTitle>
          <CardDescription>
            Review and compare quotations from vendors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quotation ID</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Delivery Time</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotationsList.map((quotation) => (
                <TableRow key={quotation.id}>
                  <TableCell className="font-medium">
                    {quotation.quotationNumber}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{quotation.vendorName}</div>
                      <div className="text-sm text-muted-foreground">
                        Rating: {quotation.vendorRating}/5
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${quotation.quotedAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>{quotation.deliveryTimeWeeks} weeks</TableCell>
                  <TableCell>
                    {new Date(quotation.submittedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(quotation.status)}>
                      {quotation.status.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/dashboard/quotations/${quotation.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {quotationsList.length > 1 && (
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() =>
                  navigate(`/dashboard/quotations/comparison?requirement=${quotations.data.requirementId}`)
                }
              >
                Compare All Quotations
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
