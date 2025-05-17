
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Palette, Bell, Shield, UserCircle } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-top-8 duration-700 ease-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences.</p>
      </div>

      <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.005] transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserCircle className="h-5 w-5 text-primary" /> Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" defaultValue="Current User Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="user@example.com" disabled />
          </div>
          <Button variant="outline">Change Password</Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.005] transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-primary" /> Appearance</CardTitle>
          <CardDescription>Customize the look and feel of CODEEX-FOCUS.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
            </div>
            <Switch id="dark-mode" aria-label="Toggle dark mode" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="accent-color">Accent Color</Label>
            <Input id="accent-color" type="color" defaultValue="#FF7F50" className="w-24 h-10 rounded-md" /> 
            {/* Updated defaultValue to match new accent color */}
            <p className="text-sm text-muted-foreground">Personalize your accent color. (Note: Full theme integration for custom accent needs more work)</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.005] transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-primary" /> Notifications</CardTitle>
          <CardDescription>Manage how you receive notifications from CODEEX-FOCUS.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates and summaries via email.</p>
                </div>
                <Switch id="email-notifications" aria-label="Toggle email notifications" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get real-time alerts in the app (requires browser permission).</p>
                </div>
                <Switch id="push-notifications" aria-label="Toggle push notifications" />
            </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.005] transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /> Account</CardTitle>
          <CardDescription>Manage your account data and security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
            <Button variant="outline">Export My Data</Button>
            <Button variant="destructive">Delete Account</Button>
            <p className="text-xs text-muted-foreground">Account deletion is permanent and cannot be undone.</p>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button className="bg-primary hover:bg-primary/90 min-w-[120px]">Save Changes</Button>
      </div>
    </div>
  );
}
