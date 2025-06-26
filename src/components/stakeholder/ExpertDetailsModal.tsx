
import React from 'react';
import { DetailsModal } from '@/components/shared/modals/DetailsModal';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, Calendar, Award, Phone, Mail, Briefcase } from 'lucide-react';
import { StakeholderProfile } from '@/types/stakeholder';

interface ExpertDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  expert: StakeholderProfile;
  onHireExpert?: () => void;
}

export const ExpertDetailsModal = ({ isOpen, onClose, expert, onHireExpert }: ExpertDetailsModalProps) => {
  const actions = onHireExpert ? [
    {
      label: 'Hire Expert',
      onClick: onHireExpert,
      variant: 'default' as const,
      icon: <Briefcase className="h-4 w-4" />
    }
  ] : [];

  return (
    <DetailsModal
      isOpen={isOpen}
      onClose={onClose}
      title={expert.name}
      actions={actions}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Header Info */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Expert Professional
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{expert.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {expert.location}
              </div>
              {expert.established && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Experience since {expert.established}
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{expert.completedProjects}</div>
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
              <span>{expert.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{expert.phone}</span>
            </div>
          </CardContent>
        </Card>

        {/* Professional Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{expert.description}</p>
          </CardContent>
        </Card>

        {/* Expertise Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Areas of Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {expert.specializations.map((spec, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {spec}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Professional Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Professional Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {expert.certifications.map((cert, index) => (
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
