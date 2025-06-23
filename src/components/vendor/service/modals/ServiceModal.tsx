
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Save } from "lucide-react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: {
    id: string;
    name: string;
    category: string;
    description: string;
    skills: string[];
    pricing: string;
    experience: string;
    portfolio: string[];
  };
  isEdit?: boolean;
}

export const ServiceModal = ({ isOpen, onClose, service, isEdit = false }: ServiceModalProps) => {
  const [serviceData, setServiceData] = useState({
    name: service?.name || "",
    category: service?.category || "",
    description: service?.description || "",
    pricing: service?.pricing || "",
    experience: service?.experience || ""
  });

  const [skills, setSkills] = useState<string[]>(service?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [portfolio, setPortfolio] = useState<string[]>(service?.portfolio || []);
  const [newPortfolioItem, setNewPortfolioItem] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addPortfolioItem = () => {
    if (newPortfolioItem.trim()) {
      setPortfolio([...portfolio, newPortfolioItem.trim()]);
      setNewPortfolioItem("");
    }
  };

  const removePortfolioItem = (index: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log("Saving service:", { serviceData, skills, portfolio });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Edit Service" : "Add New Service"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                value={serviceData.name}
                onChange={(e) => setServiceData({...serviceData, name: e.target.value})}
                placeholder="e.g., Custom Software Development"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setServiceData({...serviceData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software-development">Software Development</SelectItem>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="mobile-development">Mobile Development</SelectItem>
                  <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                  <SelectItem value="design">Design & Branding</SelectItem>
                  <SelectItem value="consulting">Business Consulting</SelectItem>
                  <SelectItem value="data-analytics">Data & Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Service Description</Label>
            <Textarea
              id="description"
              value={serviceData.description}
              onChange={(e) => setServiceData({...serviceData, description: e.target.value})}
              placeholder="Describe your service in detail..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pricing">Pricing Model</Label>
              <Select onValueChange={(value) => setServiceData({...serviceData, pricing: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pricing model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly Rate</SelectItem>
                  <SelectItem value="fixed">Fixed Price</SelectItem>
                  <SelectItem value="milestone">Milestone-based</SelectItem>
                  <SelectItem value="retainer">Monthly Retainer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Select onValueChange={(value) => setServiceData({...serviceData, experience: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Skills & Technologies</Label>
            <div className="flex gap-2 mt-2 mb-3">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <Button type="button" onClick={addSkill} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-yellow-50 text-yellow-700">
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-yellow-600 hover:text-yellow-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Portfolio Links</Label>
            <div className="flex gap-2 mt-2 mb-3">
              <Input
                value={newPortfolioItem}
                onChange={(e) => setNewPortfolioItem(e.target.value)}
                placeholder="Add portfolio link or project name..."
                onKeyPress={(e) => e.key === 'Enter' && addPortfolioItem()}
              />
              <Button type="button" onClick={addPortfolioItem} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {portfolio.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm">{item}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removePortfolioItem(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="bg-yellow-600 hover:bg-yellow-700">
              <Save className="mr-2 h-4 w-4" />
              {isEdit ? "Update Service" : "Create Service"}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
