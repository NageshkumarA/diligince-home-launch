import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Lock, Bell, Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Checkbox } from "@radix-ui/react-checkbox";

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });


const notificationSchema = z.object({
  // emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  emailUpdates: z.boolean(),
  emailNewOpportunities: z.boolean(),
  emailPayments: z.boolean(),
});
const twoFactorSchema = z.object({
  enableTwoFactor: z.boolean().default(false),
  phoneNumber: z.string().optional(),
  receiveBackupCodes: z.boolean().default(false),
}); 
const privacySchema = z.object({
  profileVisibility: z.boolean(),
  contactInfoVisibility: z.boolean(),
  hourlyRateVisibility: z.boolean(),
});

const AccountSettingsForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTwoFactorSubmitting, setIsTwoFactorSubmitting] = useState(false);
  
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
    const defaultSessions: Session[] = [
    {
      id: 1,
      name: "Chrome on Windows",
      location: "Mumbai, India",
      current: true,
      lastActive: "Current Session",
    },
    {
      id: 2,
      name: "Firefox on MacOS",
      location: "Delhi, India",
      current: false,
      lastActive: "Last active: Yesterday",
    },
    {
      id: 3,
      name: "Safari on iPhone",
      location: "Mumbai, India",
      current: false,
      lastActive: "Last active: 2 days ago",
    },
  ];
  type Session = {
  id: number;
  name: string;
  location: string;
  current: boolean;
  lastActive: string;
};
type TwoFactorSettings = z.infer<typeof twoFactorSchema>;
  const [sessions, setSessions] = useState<Session[]>(() => {
    const stored = localStorage.getItem("sessions");
    return stored ? JSON.parse(stored) : defaultSessions;
  });

  const notificationForm = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      
      smsNotifications: false,
      pushNotifications: true,
      emailUpdates: true,
      emailNewOpportunities: true,
      emailPayments: true,
    },
  });

  const privacyForm = useForm<z.infer<typeof privacySchema>>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      profileVisibility: true,
      contactInfoVisibility: false,
      hourlyRateVisibility: true,
    },
  });
   const twoFactorForm = useForm<TwoFactorSettings>({
      resolver: zodResolver(twoFactorSchema),
      defaultValues: {
        enableTwoFactor: false,
        phoneNumber: "",
        receiveBackupCodes: false,
      },
    });
    const onSubmitTwoFactor = (values: TwoFactorSettings) => {
        setIsTwoFactorSubmitting(true);
        
        setTimeout(() => {
          console.log("Two-factor values:", values);
          setIsTwoFactorSubmitting(false);
          toast.success("Authentication settings updated!");
        }, 1500);
      };
    const handleLogout = (id: number, name: string) => {
    const confirmLogout = window.confirm(`Do you want to logout from ${name}?`);
    if (confirmLogout) {
      const updatedSessions = sessions.filter((session) => session.id !== id);
      setSessions(updatedSessions);
      localStorage.setItem("sessions", JSON.stringify(updatedSessions));
      toast.success(`Logged out from ${name}`);
    }
  };

  const handleLogoutAll = () => {
    const confirmAll = window.confirm("Do you want to logout from all devices?");
    if (confirmAll) {
      const updatedSessions = sessions.filter((session) => session.current);
      setSessions(updatedSessions);
      localStorage.setItem("sessions", JSON.stringify(updatedSessions));
      toast.success("Logged out from all other devices");
    }
  };

  function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    localStorage.setItem("passwordForm", JSON.stringify(values));
    toast.success("Password updated successfully!");
    passwordForm.reset();
  }

  function onNotificationSubmit(values: z.infer<typeof notificationSchema>) {
    console.log("Notification settings:", values);
    toast("Notification preferences saved successfully!");
  }

  function onPrivacySubmit(values: z.infer<typeof privacySchema>) {
    console.log("Privacy settings:", values);
    toast("Privacy settings updated successfully!");
  }

const [showInfo, setShowInfo] = useState(false);
  return (
    <>
     <div className="p-4 m-5 bg-white">
  <div className="flex flex-col">
    {/* Title + Info */}
    <div className="flex items-center">
      <h2 className="text-2xl font-semibold mr-2">Account Settings</h2>
      <button
        type="button"
        onClick={() => setShowInfo(!showInfo)}
        className="text-black opacity-70 hover:opacity-100 transition"
        aria-label="Toggle account settings information"
      >
        <Info className="w-6 h-6" />
      </button>
    </div>

    {/* Stable description container */}
    <div className="min-h-[24px] transition-all duration-200">
      {showInfo && (
        <p className="text-gray-400 text-sm mt-1 animate-fadeIn">
          Manage your account security, notification preferences, and privacy settings.
        </p>
      )}
    </div>
  </div>
</div>
      <CardContent className='bg-white m-6'>
        <Tabs defaultValue="password">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="password" className="flex items-center gap-2">
              <Lock size={14} /> Password
            </TabsTrigger>
            <TabsTrigger value="2fa" className="flex items-center justify-center gap-2">
          <EyeOff size={14} /> Two-Factor
          </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell size={14} /> Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield size={14} /> Privacy
            </TabsTrigger>
             <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Smartphone size={14} /> sessions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="password">
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Enter your current password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                          >
                            {showCurrentPassword ? (
                              <EyeOff size={16} className="text-gray-400" />
                            ) : (
                              <Eye size={16} className="text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter your new password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff size={16} className="text-gray-400" />
                            ) : (
                              <Eye size={16} className="text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Password must be at least 8 characters and include a mix
                        of letters, numbers, and symbols
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your new password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={16} className="text-gray-400" />
                            ) : (
                              <Eye size={16} className="text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-800">Update</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="2fa">
            <Form {...twoFactorForm}>
              <form onSubmit={twoFactorForm.handleSubmit(onSubmitTwoFactor)} className="space-y-6">
                <div className="rounded-lg border p-6 pb-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Shield className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  
                  <FormField
                    control={twoFactorForm.control}
                    name="enableTwoFactor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Enable Two-Factor Authentication</FormLabel>
                          <FormDescription>
                            Require a verification code when logging in
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                             className="data-[state=checked]:bg-blue-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {twoFactorForm.watch("enableTwoFactor") && (
                    <div className="space-y-4 mt-4">
                      <FormField
                        control={twoFactorForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number for SMS Verification</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter phone number" {...field} />
                            </FormControl>
                            <FormDescription>
                              We'll send a verification code to this number when you log in
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={twoFactorForm.control}
                        name="receiveBackupCodes"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Generate and download backup codes
                              </FormLabel>
                              <FormDescription>
                                Backup codes can be used to access your account if you lose your phone
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    disabled={isTwoFactorSubmitting || !twoFactorForm.formState.isDirty}
                    className="bg-blue-600 text-white hover:bg-blue-800"
                  >
                    {isTwoFactorSubmitting ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
{/* //className="bg-blue-600 text-white hover:bg-blue-800 */}
          <TabsContent value="notifications">
            <Form {...notificationForm}>
              <form
                onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-base font-medium text-gray-800">
                    Notification Channels
                  </h3>

                  <div className="space-y-4">
                   

                    <FormField
                      control={notificationForm.control}
                      name="smsNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              SMS Notifications
                            </FormLabel>
                            <FormDescription>
                              Receive notifications via SMS
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-blue-600"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="pushNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Push Notifications
                            </FormLabel>
                            <FormDescription>
                              Receive in-app notifications
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-blue-600"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-medium text-gray-800">
                    Email Preferences
                  </h3>

                  <div className="space-y-4">
                    <FormField
                      control={notificationForm.control}
                      name="emailUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Platform Updates
                            </FormLabel>
                            <FormDescription>
                              Receive emails about platform updates and new
                              features
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-blue-600"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="emailNewOpportunities"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              New Opportunities
                            </FormLabel>
                            <FormDescription>
                              Receive emails about new job opportunities
                              matching your skills
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-blue-600"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="emailPayments"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Payment Notifications
                            </FormLabel>
                            <FormDescription>
                              Receive emails about payments and invoices
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-blue-600"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-800">Save </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white text-black hover:bg-gray-100"
                    onClick={() => {
                      
                      toast("Notification preferences reset to default!");
                    }}
                  >
                    Reset to Default
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="privacy">
            <Form {...privacyForm}>
              <form
                onSubmit={privacyForm.handleSubmit(onPrivacySubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-base font-medium text-gray-800">
                   Privacy Settings
                  </h3>

                  <div className="space-y-4">
                    <FormField
                      control={privacyForm.control}
                      name="profileVisibility"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Public Profile
                            </FormLabel>
                            <FormDescription>
                              Make your profile visible to potential clients
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-blue-600"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={privacyForm.control}
                      name="contactInfoVisibility"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Contact Information
                            </FormLabel>
                            <FormDescription>
                              Show your contact details to verified clients
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-blue-600"/>
                            
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={privacyForm.control}
                      name="hourlyRateVisibility"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Rate Visibility
                            </FormLabel>
                            <FormDescription>
                              Display your daily/hourly rate on your profile
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                             checked={field.value}
                             onCheckedChange={field.onChange}
                             className="data-[state=checked]:bg-blue-600"/>
                             </FormControl>

                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-800">Save </Button>
                   <Button
                    type="button"
                    variant="outline"
                    className="bg-white text-black hover:bg-gray-100"
                    onClick={() => {
                      
                      toast("Notification preferences reset to default!");
                    }}
                  >
                    Reset to Default
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="sessions">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">{session.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {session.location} • {session.lastActive}
                        </p>
                      </div>
                      {session.current ? (
                        <Button variant="ghost" size="sm" disabled>
                          Current
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleLogout(session.id, session.name)}
                        >
                          Logout
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {sessions.filter((s) => !s.current).length > 0 && (
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button variant="outline" onClick={handleLogoutAll}>
                      Logout from All Devices
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Login History</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>May 5, 2025 09:15 AM</TableCell>
                      <TableCell>Chrome on Windows</TableCell>
                      <TableCell>Mumbai, India</TableCell>
                      <TableCell>192.168.1.1</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Successful
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 4, 2025 02:30 PM</TableCell>
                      <TableCell>Firefox on MacOS</TableCell>
                      <TableCell>Delhi, India</TableCell>
                      <TableCell>192.168.2.2</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Successful
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 3, 2025 10:45 AM</TableCell>
                      <TableCell>Safari on iPhone</TableCell>
                      <TableCell>Unknown</TableCell>
                      <TableCell>192.168.3.3</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Failed</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </>
  );
};

export default AccountSettingsForm;



// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import * as z from "zod";
// import { Lock, Shield, Smartphone, History, EyeOff, Eye, Bell } from "lucide-react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   FormDescription,
// } from "@/components/ui/form";
// import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";

// const passwordSchema = z
//   .object({
//     currentPassword: z.string().min(1, "Current password is required"),
//     newPassword: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .regex(/[A-Z]/, "Must include an uppercase letter")
//       .regex(/[a-z]/, "Must include a lowercase letter")
//       .regex(/\d/, "Must include a number")
//       .regex(/[^A-Za-z0-9]/, "Must include a special character"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type Session = {
//   id: number;
//   name: string;
//   location: string;
//   current: boolean;
//   lastActive: string;
// };



// const notificationSchema = z.object({
//   emailNotifications: z.boolean(),
//   smsNotifications: z.boolean(),
//   pushNotifications: z.boolean(),
//   emailUpdates: z.boolean(),
//   emailNewOpportunities: z.boolean(),
//   emailPayments: z.boolean(),
// });

// const notificationForm = useForm<z.infer<typeof notificationSchema>>({
//   resolver: zodResolver(notificationSchema),
//   defaultValues: {
//     emailNotifications: true,
//     smsNotifications: false,
//     pushNotifications: true,
//     emailUpdates: true,
//     emailNewOpportunities: true,
//     emailPayments: true,
//   },
// });
// const Security = () => {
//   const navigate = useNavigate();
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const passwordForm = useForm<z.infer<typeof passwordSchema>>({
//     resolver: zodResolver(passwordSchema),
//     defaultValues: {
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     },
//   });
 
//   const privacySchema = z.object({
//   profileVisibility: z.boolean().default(true),
//   contactInfoVisibility: z.boolean().default(true),
//   hourlyRateVisibility: z.boolean().default(true),
// });

// // Add this type for better type safety
// type PrivacySettings = z.infer<typeof privacySchema>;

// // Define default values in one place for consistency
// const DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
//   profileVisibility: true,
//   contactInfoVisibility: false,
//   hourlyRateVisibility: true,
// };
// function onNotificationSubmit(values: z.infer<typeof notificationSchema>) {
//   console.log("Notification settings:", values);
//   toast("Notification preferences saved successfully!");
// }

// function onPrivacySubmit(values: PrivacySettings) {
//   // Here you would typically send to your backend
//   console.log("Saving privacy settings:", values);
  
//   // Save to localStorage for persistence (replace with API call in real app)
//   localStorage.setItem('privacySettings', JSON.stringify(values));
  
//   toast.success("Privacy settings updated successfully!");
// }

// const handleReset = () => {
//   // Reset form to default values
//   privacyForm.reset(DEFAULT_PRIVACY_SETTINGS);
  
//   // Optional: Clear from localStorage if using
//   localStorage.removeItem('privacySettings');
  
//   toast.success("Reset to default settings!");
// };

//   const defaultSessions: Session[] = [
//     {
//       id: 1,
//       name: "Chrome on Windows",
//       location: "Mumbai, India",
//       current: true,
//       lastActive: "Current Session",
//     },
//     {
//       id: 2,
//       name: "Firefox on MacOS",
//       location: "Delhi, India",
//       current: false,
//       lastActive: "Last active: Yesterday",
//     },
//     {
//       id: 3,
//       name: "Safari on iPhone",
//       location: "Mumbai, India",
//       current: false,
//       lastActive: "Last active: 2 days ago",
//     },
//   ];

//   const [sessions, setSessions] = useState<Session[]>(() => {
//     const stored = localStorage.getItem("sessions");
//     return stored ? JSON.parse(stored) : defaultSessions;
//   });

//   const handleLogout = (id: number, name: string) => {
//     const confirmLogout = window.confirm(`Do you want to logout from ${name}?`);
//     if (confirmLogout) {
//       const updatedSessions = sessions.filter((session) => session.id !== id);
//       setSessions(updatedSessions);
//       localStorage.setItem("sessions", JSON.stringify(updatedSessions));
//       toast.success(`Logged out from ${name}`);
//     }
//   };

//   const handleLogoutAll = () => {
//     const confirmAll = window.confirm("Do you want to logout from all devices?");
//     if (confirmAll) {
//       const updatedSessions = sessions.filter((session) => session.current);
//       setSessions(updatedSessions);
//       localStorage.setItem("sessions", JSON.stringify(updatedSessions));
//       toast.success("Logged out from all other devices");
//     }
//   };

//   const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
//     try {
//       console.log("Update password data:", values);
//       localStorage.setItem("passwordForm", JSON.stringify({
//         updatedAt: new Date().toISOString()
//       }));
//       toast.success("Password updated successfully!");
//       passwordForm.reset();
//     } catch (error) {
//       toast.error("Failed to update password.");
//     }
//   };

//  const privacyForm = useForm<PrivacySettings>({
//   resolver: zodResolver(privacySchema),
//   defaultValues: DEFAULT_PRIVACY_SETTINGS,
// });

//   return (
//     <>
//       <CardHeader>
//         <CardTitle>Account Settings</CardTitle>
//         <CardDescription>
//           Manage your account security, active sessions, and notification preferences
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="password">
//           <TabsList className="grid grid-cols-5 mb-6">
//             <TabsTrigger value="password" className="flex items-center justify-center gap-2">
//               <Lock size={14} /> Password
//             </TabsTrigger>
//             <TabsTrigger value="2fa" className="flex items-center justify-center gap-2">
//               <EyeOff size={14} /> Two-Factor
//             </TabsTrigger>
//              <TabsTrigger value="notifications" className="flex items-center justify-center gap-2">
//               <Bell size={14} /> Notifications
//             </TabsTrigger>
//             <TabsTrigger value="privacy" className="flex items-center justify-center gap-2">
//               <Shield size={14} /> Privacy
//             </TabsTrigger>
//             <TabsTrigger value="sessions" className="flex items-center justify-center gap-2">
//               <Smartphone size={14} /> Sessions
//             </TabsTrigger>
           
//           </TabsList>

//           <TabsContent value="password">
//             <Form {...passwordForm}>
//               <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
//                 <FormField
//                   control={passwordForm.control}
//                   name="currentPassword"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Current Password</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Input 
//                             className="border-gray-400"
//                             type={showCurrentPassword ? "text" : "password"} 
//                             placeholder="Enter your current password" 
//                             {...field} 
//                           />
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="sm"
//                             className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                             onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                           >
//                             {showCurrentPassword ? (
//                               <EyeOff size={16} className="text-gray-400" />
//                             ) : (
//                               <Eye size={16} className="text-gray-400" />
//                             )}
//                           </Button>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={passwordForm.control}
//                   name="newPassword"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>New Password</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Input 
//                             className="border-gray-400"
//                             type={showNewPassword ? "text" : "password"} 
//                             placeholder="Enter new password" 
//                             {...field} 
//                             disabled={!passwordForm.watch("currentPassword")}
//                           />
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="sm"
//                             className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                             onClick={() => setShowNewPassword(!showNewPassword)}
//                           >
//                             {showNewPassword ? (
//                               <EyeOff size={16} className="text-gray-400" />
//                             ) : (
//                               <Eye size={16} className="text-gray-400" />
//                             )}
//                           </Button>
//                         </div>
//                       </FormControl>
//                       <FormDescription>
//                         Password must be at least 8 characters with letters, numbers, and special characters
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={passwordForm.control}
//                   name="confirmPassword"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Confirm New Password</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Input 
//                             className="border-gray-400"
//                             type={showConfirmPassword ? "text" : "password"} 
//                             placeholder="Confirm new password" 
//                             {...field} 
//                             disabled={!passwordForm.watch("currentPassword")}
//                           />
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="sm"
//                             className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           >
//                             {showConfirmPassword ? (
//                               <EyeOff size={16} className="text-gray-400" />
//                             ) : (
//                               <Eye size={16} className="text-gray-400" />
//                             )}
//                           </Button>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="flex justify-end space-x-4 pt-4">
//                   <Button type="submit">Update</Button>
//                 </div>
//               </form>
//             </Form>
//           </TabsContent>

//           <TabsContent value="2fa">
//             <div className="space-y-6">
//               <div className="flex items-center justify-between rounded-lg border p-4">
//                 <div className="space-y-0.5">
//                   <h3 className="text-base font-medium">Two-Factor Authentication</h3>
//                   <p className="text-sm text-muted-foreground">
//                     Enhance your account security with an extra layer of protection
//                   </p>
//                 </div>
//                 <Switch />
//               </div>

//               <div className="flex justify-end space-x-4 pt-4">
//                 <Button onClick={() => navigate("*")}>Setup 2FA</Button>
//               </div>
//             </div>
//             </TabsContent>
//           <TabsContent value="notifications">
//   <Form {...notificationForm}>
//     <form
//       onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}
//       className="space-y-6"
//     >
//       <div className="space-y-4">
//         <h3 className="text-base font-medium text-gray-800">
//           Notification Channels
//         </h3>

//         <div className="space-y-4">
//           <FormField
//             control={notificationForm.control}
//             name="emailNotifications"
//             render={({ field }) => (
//               <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                 <div className="space-y-0.5">
//                   <FormLabel className="text-base">
//                     Email Notifications
//                   </FormLabel>
//                   <FormDescription>
//                     Receive notifications via email
//                   </FormDescription>
//                 </div>
//                 <FormControl>
//                   <Switch
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                   />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           {/* Other FormField components remain the same */}
//         </div>
//       </div>

//       <div className="space-y-4">
//         <h3 className="text-base font-medium text-gray-800">
//           Email Preferences
//         </h3>

//         <div className="space-y-4">
//           {/* Email preference FormField components */}
//         </div>
//       </div>

//       <div className="flex justify-end space-x-4 pt-4">
//         <Button type="submit">Save</Button>
//         <Button
//           type="button"
//           variant="outline"
//           className="bg-white text-black hover:bg-gray-100"
//           onClick={() => {
//             notificationForm.reset({
//               emailNotifications: true,
//               smsNotifications: false,
//               pushNotifications: true,
//               emailUpdates: true,
//               emailNewOpportunities: true,
//               emailPayments: true,
//             });
//             toast("Notification preferences reset to default!");
//           }}
//         >
//           Reset to Default
//         </Button>
//       </div>
//     </form>
//   </Form>
// </TabsContent>
//           <TabsContent value="privacy">
//             <Form {...privacyForm}>
//               <form
//                 onSubmit={privacyForm.handleSubmit(onPrivacySubmit)}
//                 className="space-y-6"
//               >
//                 <div className="space-y-4">
//                   <h3 className="text-base font-medium text-gray-800">
//                     Profile Visibility
//                   </h3>

//                   <div className="space-y-4">
//                     <FormField
//                       control={privacyForm.control}
//                       name="profileVisibility"
//                       render={({ field }) => (
//                         <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                           <div className="space-y-0.5">
//                             <FormLabel className="text-base">
//                               Public Profile
//                             </FormLabel>
//                             <FormDescription>
//                               Make your profile visible to potential clients
//                             </FormDescription>
//                           </div>
//                           <FormControl>
//                             <Switch
//                               checked={field.value}
//                               onCheckedChange={field.onChange}
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={privacyForm.control}
//                       name="contactInfoVisibility"
//                       render={({ field }) => (
//                         <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                           <div className="space-y-0.5">
//                             <FormLabel className="text-base">
//                               Contact Information
//                             </FormLabel>
//                             <FormDescription>
//                               Show your contact details to verified clients
//                             </FormDescription>
//                           </div>
//                           <FormControl>
//                             <Switch
//                               checked={field.value}
//                               onCheckedChange={field.onChange}
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={privacyForm.control}
//                       name="hourlyRateVisibility"
//                       render={({ field }) => (
//                         <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                           <div className="space-y-0.5">
//                             <FormLabel className="text-base">
//                               Rate Visibility
//                             </FormLabel>
//                             <FormDescription>
//                               Display your daily/hourly rate on your profile
//                             </FormDescription>
//                           </div>
//                           <FormControl>
//                             <Switch
//                               checked={field.value}
//                               onCheckedChange={field.onChange}
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div>

//                <div className="flex justify-end space-x-4 pt-4">
//                 {/* disabled={!privacyForm.formState.isDirty} */}
//               <Button type="submit" >
//                 Save
//               </Button>
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="bg-white text-black hover:bg-gray-100"
//                 onClick={handleReset}
//                 // disabled={!privacyForm.formState.isDirty}
//               >
//                 Reset to default
//               </Button>
//             </div>
//               </form>
//             </Form>
//           </TabsContent>
      

//           <TabsContent value="sessions">
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
//                 <div className="space-y-4">
//                   {sessions.map((session) => (
//                     <div
//                       key={session.id}
//                       className="flex items-center justify-between rounded-lg border p-4"
//                     >
//                       <div className="space-y-1">
//                         <h4 className="text-sm font-medium">{session.name}</h4>
//                         <p className="text-sm text-muted-foreground">
//                           {session.location} • {session.lastActive}
//                         </p>
//                       </div>
//                       {session.current ? (
//                         <Button variant="ghost" size="sm" disabled>
//                           Current
//                         </Button>
//                       ) : (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleLogout(session.id, session.name)}
//                         >
//                           Logout
//                         </Button>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {sessions.filter((s) => !s.current).length > 0 && (
//                   <div className="flex justify-end space-x-4 pt-4">
//                     <Button variant="outline" onClick={handleLogoutAll}>
//                       Logout from All Devices
//                     </Button>
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <h3 className="text-lg font-medium mb-4">Login History</h3>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Date & Time</TableHead>
//                       <TableHead>Device</TableHead>
//                       <TableHead>Location</TableHead>
//                       <TableHead>IP Address</TableHead>
//                       <TableHead>Status</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell>May 5, 2025 09:15 AM</TableCell>
//                       <TableCell>Chrome on Windows</TableCell>
//                       <TableCell>Mumbai, India</TableCell>
//                       <TableCell>192.168.1.1</TableCell>
//                       <TableCell>
//                         <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
//                           Successful
//                         </Badge>
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell>May 4, 2025 02:30 PM</TableCell>
//                       <TableCell>Firefox on MacOS</TableCell>
//                       <TableCell>Delhi, India</TableCell>
//                       <TableCell>192.168.2.2</TableCell>
//                       <TableCell>
//                         <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
//                           Successful
//                         </Badge>
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell>May 3, 2025 10:45 AM</TableCell>
//                       <TableCell>Safari on iPhone</TableCell>
//                       <TableCell>Unknown</TableCell>
//                       <TableCell>192.168.3.3</TableCell>
//                       <TableCell>
//                         <Badge variant="destructive">Failed</Badge>
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </div>
//             </div>
//           </TabsContent>

          
//         </Tabs>
//       </CardContent>
//     </>
//   );
// };

// export default Security;