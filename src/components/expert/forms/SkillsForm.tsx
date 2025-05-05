
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  primarySkill: z.string().min(1, { message: "Primary skill is required" }),
  yearsOfExperience: z.string().min(1, { message: "Years of experience is required" }),
  skillLevel: z.string().min(1, { message: "Skill level is required" }),
});

const skillOptions = [
  "Welding",
  "Machining",
  "CAD Design",
  "Process Control",
  "Hydraulics",
  "Pneumatics",
  "PLC Programming",
  "Electrical Troubleshooting",
  "Maintenance",
  "Quality Control",
  "Instrumentation",
  "HVAC Systems",
  "3D Printing",
  "CNC Operation",
  "Robotics",
  "Automation",
];

const experienceOptions = [
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "5-7 years",
  "7-10 years",
  "10+ years",
];

const levelOptions = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

const SkillsForm = () => {
  const [skills, setSkills] = useState<Array<{name: string, experience: string, level: string}>>([
    { name: "Welding", experience: "5-7 years", level: "Expert" },
    { name: "CAD Design", experience: "3-5 years", level: "Advanced" },
    { name: "Maintenance", experience: "7-10 years", level: "Expert" },
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primarySkill: "",
      yearsOfExperience: "",
      skillLevel: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newSkill = {
      name: values.primarySkill,
      experience: values.yearsOfExperience,
      level: values.skillLevel,
    };
    
    setSkills([...skills, newSkill]);
    
    form.reset({
      primarySkill: "",
      yearsOfExperience: "",
      skillLevel: "",
    });
  }

  function removeSkill(index: number) {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Skills & Expertise</CardTitle>
        <CardDescription>
          Add your technical skills and expertise to help match you with relevant opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <h3 className="text-base font-medium text-gray-800 mb-4">Your Skills</h3>
          
          {skills.length === 0 ? (
            <div className="text-center p-6 border border-dashed rounded-md">
              <p className="text-gray-500">No skills added yet. Add your first skill below.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between bg-gray-50 rounded-md p-4 border"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-600 hover:bg-purple-200">
                      {skill.level}
                    </Badge>
                    <div>
                      <h4 className="font-medium">{skill.name}</h4>
                      <p className="text-sm text-gray-500">{skill.experience}</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-base font-medium text-gray-800 mb-4">Add New Skill</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="primarySkill"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a skill" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {skillOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Years of experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {experienceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skillLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proficiency Level</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {levelOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit">Add Skill</Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </>
  );
};

export default SkillsForm;
