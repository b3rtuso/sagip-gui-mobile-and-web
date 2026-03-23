import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import {
  User,
  Bell,
  Lock,
  Globe,
  Database,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

import { useState } from "react";
import { useStore } from "../store";

export function Settings() {
  const [profile, setProfile] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@sendresqpls.gov.ph",
    position: "Operations Chief",
    contact: "0917-XXX-XXXX"
  });

  const updateSettings = useStore((state) => state.updateSettings);

  const handleSave = () => {
    updateSettings(profile);
    toast.success("Settings saved successfully!");
  };

  const handleAction = (action: string) => {
    toast.success(`${action} initiated successfully.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage system settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={profile.firstName} onChange={(e) => setProfile({...profile, firstName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={profile.lastName} onChange={(e) => setProfile({...profile, lastName: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" value={profile.position} onChange={(e) => setProfile({...profile, position: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input id="contact" value={profile.contact} onChange={(e) => setProfile({...profile, contact: e.target.value})} />
            </div>

            <Button onClick={handleSave}>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => handleAction("Password change")}>
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleAction("Two-Factor setup")}>
              <Shield className="mr-2 h-4 w-4" />
              Two-Factor Auth
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleAction("Data backup")}>
              <Database className="mr-2 h-4 w-4" />
              Backup Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">
                Receive email alerts for critical incidents
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Alerts</p>
              <p className="text-sm text-gray-500">
                Get SMS notifications for new incidents
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Desktop Notifications</p>
              <p className="text-sm text-gray-500">
                Show browser notifications
              </p>
            </div>
            <Switch />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily Summary</p>
              <p className="text-sm text-gray-500">
                Receive daily incident summary reports
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            System Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-Assignment</p>
              <p className="text-sm text-gray-500">
                Automatically assign teams to incidents based on availability
              </p>
            </div>
            <Switch />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Public Reporting</p>
              <p className="text-sm text-gray-500">
                Allow public to report incidents through the system
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Real-time Updates</p>
              <p className="text-sm text-gray-500">
                Enable real-time incident status updates
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Data Retention</p>
              <p className="text-sm text-gray-500">
                Keep incident records for 5 years
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}