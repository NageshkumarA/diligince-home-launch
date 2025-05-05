
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addDays } from "date-fns";

const workTimeOptions = [
  { value: "full-day", label: "Full Day (8+ hours)" },
  { value: "half-day-morning", label: "Morning Half Day (4 hours)" },
  { value: "half-day-afternoon", label: "Afternoon Half Day (4 hours)" },
  { value: "unavailable", label: "Unavailable" },
];

const workDaysSchema = z.object({
  monday: z.string().min(1, { message: "Selection required" }),
  tuesday: z.string().min(1, { message: "Selection required" }),
  wednesday: z.string().min(1, { message: "Selection required" }),
  thursday: z.string().min(1, { message: "Selection required" }),
  friday: z.string().min(1, { message: "Selection required" }),
  saturday: z.string().min(1, { message: "Selection required" }),
  sunday: z.string().min(1, { message: "Selection required" }),
  commutingPreference: z.string().min(1, { message: "Selection required" }),
  normalNoticePeriod: z.string().min(1, { message: "Selection required" }),
});

const AvailabilityCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [specialDays, setSpecialDays] = useState<Date[]>([
    addDays(new Date(), 2),
    addDays(new Date(), 7),
    addDays(new Date(), 14),
  ]);

  const form = useForm<z.infer<typeof workDaysSchema>>({
    resolver: zodResolver(workDaysSchema),
    defaultValues: {
      monday: "full-day",
      tuesday: "full-day",
      wednesday: "full-day",
      thursday: "full-day",
      friday: "half-day-afternoon",
      saturday: "unavailable",
      sunday: "unavailable",
      commutingPreference: "up-to-100km",
      normalNoticePeriod: "1-day",
    },
  });

  function onSubmit(values: z.infer<typeof workDaysSchema>) {
    console.log(values);
    // In a real application, you would save this data to a database
  }

  // This function would handle marking special days (like days off, half days, etc.)
  function handleDateSelect(day: Date | undefined) {
    if (!day) return;
    
    // Check if the date is already in specialDays
    const dateExists = specialDays.some(d => 
      d.getDate() === day.getDate() && 
      d.getMonth() === day.getMonth() && 
      d.getFullYear() === day.getFullYear()
    );
    
    if (dateExists) {
      // Remove the date if it's already marked
      setSpecialDays(specialDays.filter(d => 
        !(d.getDate() === day.getDate() && 
          d.getMonth() === day.getMonth() && 
          d.getFullYear() === day.getFullYear())
      ));
    } else {
      // Add the date if it's not already marked
      setSpecialDays([...specialDays, day]);
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Availability Calendar</CardTitle>
        <CardDescription>
          Set your regular work schedule and mark special days of availability
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-base font-medium text-gray-800 mb-4">Regular Weekly Schedule</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-4">
                  {Object.keys(form.getValues()).slice(0, 7).map((day) => (
                    <FormField
                      key={day}
                      control={form.control}
                      name={day as "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"}
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-3 space-y-0">
                          <FormLabel className="w-24 text-gray-700">
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </FormLabel>
                          <div className="flex-1">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select availability" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {workTimeOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-base font-medium text-gray-800 mb-4">Work Preferences</h3>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="commutingPreference"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Commuting Preference</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="remote-only" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Remote work only
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="up-to-25km" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Up to 25 km from my location
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="up-to-50km" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Up to 50 km from my location
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="up-to-100km" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Up to 100 km from my location
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="anywhere" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Willing to travel anywhere
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="normalNoticePeriod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Standard Notice Period</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="same-day" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Same day (emergency availability)
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="1-day" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  1 day notice
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="2-3-days" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  2-3 days notice
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="1-week" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  1 week notice
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="2-weeks" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  2+ weeks notice
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end pt-6">
                    <Button type="submit">Save Availability Settings</Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-800 mb-4">Special Days</h3>
            <p className="text-sm text-gray-600 mb-4">Mark days when you have different availability than your regular schedule.</p>
            
            <div className="border rounded-md p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
              />
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Set Availability for {date?.toLocaleDateString()}</h4>
                
                <Select defaultValue="full-day">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    {workTimeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" className="flex-1" onClick={() => handleDateSelect(date)}>
                    {specialDays.some(d => 
                      date && 
                      d.getDate() === date.getDate() && 
                      d.getMonth() === date.getMonth() && 
                      d.getFullYear() === date.getFullYear()
                    ) ? 'Remove Marking' : 'Mark Day'}
                  </Button>
                  <Button className="flex-1">Save Day Settings</Button>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <p className="mb-2">Legend:</p>
                <div className="flex items-center gap-2">
                  <span className="block h-3 w-3 rounded-full bg-purple-600"></span>
                  <span>Special availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default AvailabilityCalendar;
