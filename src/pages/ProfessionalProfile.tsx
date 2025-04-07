
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { User, Upload, MapPin, Clock, Award, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  skills: z.array(z.string()).min(1, { message: "At least one skill is required" }),
  experience: z.string().min(1, { message: "Years of experience is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  availability: z.string().min(1, { message: "Availability is required" }),
  certifications: z.string().optional(),
  documentUpload: z.any().optional(),
});

const skillsOptions = [
  { id: "electrical", label: "Electrical Engineering" },
  { id: "mechanical", label: "Mechanical Engineering" },
  { id: "plumbing", label: "Plumbing" },
  { id: "welding", label: "Welding" },
  { id: "hvac", label: "HVAC" },
  { id: "automation", label: "Automation & Control Systems" },
  { id: "safety", label: "Safety & Compliance" },
  { id: "projectManagement", label: "Project Management" },
  { id: "qualityControl", label: "Quality Control" },
  { id: "maintenance", label: "Maintenance" },
  { id: "instrumentation", label: "Instrumentation" },
  { id: "civilEngineering", label: "Civil Engineering" },
];

const ProfessionalProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      skills: [],
      experience: "",
      location: "",
      availability: "",
      certifications: "",
      documentUpload: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      console.log("Professional profile values:", values);
      setIsLoading(false);
      toast.success("Profile saved successfully!", {
        description: "Your professional profile has been created.",
      });
      
      // Redirect after successful profile creation
      setTimeout(() => {
        navigate("/professional-dashboard");
      }, 1500);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large", {
        description: "Maximum file size is 5MB.",
      });
      return;
    }

    setFileUploaded(file);
    toast.success("Document uploaded!", {
      description: `File "${file.name}" has been uploaded.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 mt-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg animate-fade-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-primary">Create Your Professional Profile</CardTitle>
              <CardDescription className="text-gray-600">
                Share your skills to connect with Industries and Vendors.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="e.g., Ravi Kumar" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="e.g., Visakhapatnam, Andhra Pradesh" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="pl-10 relative">
                                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0-2 years">0-2 years</SelectItem>
                              <SelectItem value="2-5 years">2-5 years</SelectItem>
                              <SelectItem value="5-10 years">5-10 years</SelectItem>
                              <SelectItem value="10+ years">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Availability</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="pl-10 relative">
                                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <SelectValue placeholder="Select availability" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Full-Time">Full-Time</SelectItem>
                              <SelectItem value="Part-Time">Part-Time</SelectItem>
                              <SelectItem value="Freelance">Freelance</SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="skills"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Skills</FormLabel>
                          <div className="text-sm text-muted-foreground mb-4">
                            Select all skills that apply to your expertise
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {skillsOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="skills"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== option.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="certifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certifications (Optional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Award className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="e.g., OSHA Safety, AWS Certified Welder" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3">
                    <FormLabel>Document Upload (Optional)</FormLabel>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground text-center mb-2">
                        Drag and drop your resume or certifications or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        PDF or Images up to 5MB
                      </p>
                      <Input
                        id="documentUpload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("documentUpload")?.click()}
                      >
                        Browse Files
                      </Button>
                      {fileUploaded && (
                        <p className="text-sm text-primary mt-2 font-medium">
                          {fileUploaded.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full hover:scale-105 transition-transform duration-200"
                    disabled={isLoading || !form.formState.isValid}
                  >
                    {isLoading ? "Saving Profile..." : "Save Profile"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfessionalProfile;
