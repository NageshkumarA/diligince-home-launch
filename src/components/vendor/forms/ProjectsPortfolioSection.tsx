
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { PlusCircle, Upload, FileText, Download, Trash, Edit, Calendar, Building, Clock, Check, Image } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { MultiSelect } from "@/components/vendor/ui/MultiSelect";

// Define project schema
const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Project name is required" }),
  client: z.string().min(2, { message: "Client name is required" }),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  duration: z.string().optional(),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  technologies: z.array(z.string()).min(1, { message: "Select at least one technology" }),
  outcomes: z.string().min(10, { message: "Outcomes must be at least 10 characters" }),
  images: z.array(z.string()).optional(),
});

type Project = z.infer<typeof projectSchema>;

// Mock data for projects
const initialProjects: Project[] = [
  {
    id: "1",
    name: "Manufacturing Line Automation",
    client: "XYZ Pharmaceuticals",
    startDate: new Date("2022-04-15"),
    endDate: new Date("2022-09-30"),
    duration: "5.5 months",
    description: "Complete modernization of manufacturing line with implementation of automated process control systems and quality monitoring.",
    technologies: ["PLC Programming", "SCADA", "HMI", "Quality Control Systems"],
    outcomes: "Increased production efficiency by 35%, reduced quality defects by 48%, and minimized downtime by implementing predictive maintenance.",
    images: ["project1-image1.jpg", "project1-image2.jpg"],
  },
  {
    id: "2",
    name: "Energy Management System",
    client: "ABC Cement Ltd.",
    startDate: new Date("2023-01-10"),
    endDate: new Date("2023-04-28"),
    duration: "3.5 months",
    description: "Design and implementation of comprehensive energy monitoring and management system for a large cement plant to optimize energy consumption.",
    technologies: ["IoT Sensors", "Data Analytics", "SCADA", "Cloud Integration"],
    outcomes: "Reduced energy consumption by 22%, identified optimization opportunities worth ₹45 lakhs annually, and improved sustainability metrics.",
    images: ["project2-image1.jpg"],
  },
];

// Define technology options
const technologyOptions = [
  { label: "PLC Programming", value: "PLC Programming" },
  { label: "SCADA", value: "SCADA" },
  { label: "HMI", value: "HMI" },
  { label: "IoT Sensors", value: "IoT Sensors" },
  { label: "Robotics", value: "Robotics" },
  { label: "Cloud Integration", value: "Cloud Integration" },
  { label: "Data Analytics", value: "Data Analytics" },
  { label: "Quality Control Systems", value: "Quality Control Systems" },
  { label: "Maintenance Systems", value: "Maintenance Systems" },
  { label: "Safety Systems", value: "Safety Systems" },
  { label: "Production Planning", value: "Production Planning" },
  { label: "Warehouse Automation", value: "Warehouse Automation" },
];

const ProjectsPortfolioSection = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const form = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      client: "",
      startDate: undefined,
      endDate: undefined,
      description: "",
      technologies: [],
      outcomes: "",
      images: [],
    },
  });

  const openAddProjectDialog = () => {
    form.reset({
      name: "",
      client: "",
      startDate: undefined,
      endDate: undefined,
      description: "",
      technologies: [],
      outcomes: "",
      images: [],
    });
    setSelectedFiles([]);
    setIsDialogOpen(true);
  };

  const onSubmit = (values: Project) => {
    setIsSubmitting(true);
    
    // Calculate duration automatically
    const startDate = new Date(values.startDate);
    const endDate = new Date(values.endDate);
    const monthDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                      (endDate.getMonth() - startDate.getMonth());
    const duration = monthDiff === 1 
      ? "1 month" 
      : monthDiff < 1 
        ? "Less than a month" 
        : `${monthDiff} months`;
    
    setTimeout(() => {
      // Mock image uploads (in a real app these would be file paths from storage)
      const mockImagePaths = selectedFiles.map((file, index) => `project-${Date.now()}-image${index+1}.jpg`);
      
      const newProject = {
        ...values,
        id: `${Date.now()}`,
        duration,
        images: mockImagePaths,
      };
      
      setProjects([...projects, newProject]);
      setIsDialogOpen(false);
      setIsSubmitting(false);
      toast.success("Project added successfully!");
    }, 1000);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((project) => project.id !== id));
      toast.success("Project deleted successfully!");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">Projects Portfolio</CardTitle>
            <CardDescription>
              Showcase your successful projects and achievements
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-muted rounded-md flex overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none px-3 ${viewMode === 'grid' ? 'bg-orange-100 text-orange-800' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Image className="h-4 w-4 mr-1" />
                Grid
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none px-3 ${viewMode === 'list' ? 'bg-orange-100 text-orange-800' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <FileText className="h-4 w-4 mr-1" />
                List
              </Button>
            </div>
            <Button onClick={openAddProjectDialog} className="bg-orange-600 hover:bg-orange-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No projects added yet. Click "Add Project" to get started.
            </div>
          ) : (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center relative">
                      {project.images && project.images.length > 0 ? (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Image className="w-12 h-12 text-gray-400" />
                          <span className="text-sm text-gray-500">Project Image</span>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-sm text-gray-500">No Images</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span>{project.client}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>
                            {format(new Date(project.startDate), "MMM yyyy")} - {format(new Date(project.endDate), "MMM yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{project.duration}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between p-4 pt-0">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProject(project.id!)}
                        className="h-8 w-8 text-red-600"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{project.name}</h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4 text-gray-400" />
                              <span>{project.client}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>{project.duration}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProject(project.id!)}
                          className="h-8 w-8 text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Description</h4>
                          <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Technologies Used</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Outcomes</h4>
                          <p className="text-sm text-gray-600 mt-1">{project.outcomes}</p>
                        </div>
                        
                        {project.images && project.images.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Images/Documents</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Image className="h-4 w-4 text-blue-600" />
                              <span className="text-sm text-blue-600">{project.images.length} files attached</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>
              Add a new project to showcase your capabilities and experience
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter client name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => 
                              !form.getValues().startDate || 
                              date < new Date(form.getValues().startDate) ||
                              date > new Date()
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the project scope and implementation..." 
                        className="h-24 resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technologies & Services Used</FormLabel>
                    <FormControl>
                      <MultiSelect
                        placeholder="Select technologies"
                        options={technologyOptions}
                        selected={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="outcomes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Results & Outcomes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the results and business outcomes achieved..." 
                        className="h-24 resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground text-center mb-2">
                  Upload project images or documents
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  JPG, PNG or PDF up to 5MB each
                </p>
                <Input
                  id="projectFiles"
                  type="file"
                  className="hidden"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("projectFiles")?.click()}
                >
                  Browse Files
                </Button>
                {selectedFiles.length > 0 && (
                  <div className="w-full mt-4">
                    <p className="text-sm font-medium mb-2">{selectedFiles.length} file(s) selected:</p>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="truncate">{file.name}</span>
                          <span className="text-gray-500 text-xs">
                            ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
                  {isSubmitting ? "Saving..." : "Add Project"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectsPortfolioSection;
