
import React from 'react';
import { DetailsModal } from '@/components/shared/modals/DetailsModal';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, Calendar, Users, Award, Phone, Mail } from 'lucide-react';
import { StakeholderProfile } from '@/types/stakeholder';

interface VendorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: StakeholderProfile;
  onCreatePO?: () => void;
}

export const VendorDetailsModal = ({ isOpen, onClose, vendor, onCreatePO }: VendorDetailsModalProps) => {
  const actions = onCreatePO ? [
    {
      label: 'Create Purchase Order',
      onClick: onCreatePO,
      variant: 'default' as const,
      icon: <Award className="h-4 w-4" />
    }
  ] : [];

  return (
    <DetailsModal
      isOpen={isOpen}
      onClose={onClose}
      title={vendor.name}
      actions={actions}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Header Info */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {vendor.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{vendor.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {vendor.location}
              </div>
              {vendor.established && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Est. {vendor.established}
                </div>
              )}
              {vendor.teamSize && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {vendor.teamSize} employees
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{vendor.completedProjects}</div>
            <div className="text-sm text-gray-600">Projects Completed</div>
          </div>
        </div>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{vendor.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{vendor.phone}</span>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{vendor.description}</p>
          </CardContent>
        </Card>

        {/* Specializations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Specializations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {vendor.specializations.map((spec, index) => (
                <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {spec}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {vendor.certifications.map((cert, index) => (
                <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  <Award className="h-3 w-3 mr-1" />
                  {cert}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DetailsModal>
  );
};
