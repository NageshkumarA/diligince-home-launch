
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Briefcase, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  jobTitle: z.string().min(1, { message: "Job title is required" }),
  company: z.string().min(1, { message: "Company name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  isCurrentPosition: z.boolean().default(false),
});

const ExperienceForm = () => {
  const [experiences, setExperiences] = useState<Array<{
    jobTitle: string;
    company: string;
    location: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    isCurrentPosition: boolean;
  }>>([
    {
      jobTitle: "Senior Mechanical Engineer",
      company: "TechMech Industries",
      location: "Mumbai, Maharashtra",
      description: "Led a team of 5 engineers in designing and implementing industrial automation solutions. Reduced machine downtime by 35% through preventive maintenance protocols.",
      startDate: new Date(2020, 2, 10),
      isCurrentPosition: true,
    },
    {
      jobTitle: "Maintenance Engineer",
      company: "Industrial Solutions Ltd",
      location: "Pune, Maharashtra",
      description: "Responsible for troubleshooting and maintenance of heavy machinery. Implemented new maintenance schedules that improved equipment lifespan by 25%.",
      startDate: new Date(2017, 5, 15),
      endDate: new Date(2020, 2, 5),
      isCurrentPosition: false,
    },
  ]);

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      location: "",
      description: "",
      isCurrentPosition: false,
    },
  });

  const isCurrentPosition = form.watch("isCurrentPosition");

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!startDate) {
      return; // Start date is required
    }

    const newExperience = {
      jobTitle: values.jobTitle,
      company: values.company,
      location: values.location,
      description: values.description,
      startDate: startDate,
      endDate: values.isCurrentPosition ? undefined : endDate,
      isCurrentPosition: values.isCurrentPosition,
    };
    
    setExperiences([...experiences, newExperience]);
    
    form.reset({
      jobTitle: "",
      company: "",
      location: "",
      description: "",
      isCurrentPosition: false,
    });
    setStartDate(undefined);
    setEndDate(undefined);
  }

  function removeExperience(index: number) {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>
          Add your professional work experience to showcase your industry expertise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <h3 className="text-base font-medium text-gray-800 mb-4">Your Experience</h3>
          
          {experiences.length === 0 ? (
            <div className="text-center p-6 border border-dashed rounded-md">
              <p className="text-gray-500">No experience added yet. Add your work history below.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className="relative bg-gray-50 rounded-md p-5 border"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="mt-1 bg-purple-100 p-2 rounded-md text-purple-600">
                        <Briefcase size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">{exp.jobTitle}</h4>
                        <p className="text-gray-700">{exp.company} • {exp.location}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {format(exp.startDate, "MMM yyyy")} - {exp.isCurrentPosition ? "Present" : exp.endDate && format(exp.endDate, "MMM yyyy")}
                        </p>
                        <p className="mt-3 text-gray-600">{exp.description}</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-base font-medium text-gray-800 mb-4">Add New Experience</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Mechanical Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. TechMech Industries" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Mumbai, Maharashtra" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "MMM yyyy") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>

                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={isCurrentPosition}
                        className={cn(
                          "justify-start text-left font-normal",
                          (!endDate || isCurrentPosition) && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate && !isCurrentPosition ? format(endDate, "MMM yyyy") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => 
                          startDate ? date < startDate : false
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>

                <FormField
                  control={form.control}
                  name="isCurrentPosition"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Current Position</FormLabel>
                        <FormDescription>
                          I currently work here
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            if (checked) {
                              setEndDate(undefined);
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your responsibilities, achievements, and technologies you worked with"
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">Add Experience</Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </>
  );
};

export default ExperienceForm;
