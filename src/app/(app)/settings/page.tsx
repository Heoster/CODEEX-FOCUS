
'use client'; // This page involves client-side interactions

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Palette, Bell, Shield, UserCircle, Save, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect, type FormEvent } from 'react';
import { updateProfile, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Assuming auth is exported from your firebase setup
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SettingsPage() {
  const { toast } = useToast();
  const { user, setUser } = useAuth(); // Assuming setUser updates the user in context

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState(''); // Email is generally not changed by user directly

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  // For password change dialog
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
    }
    // Initialize dark mode from localStorage or system preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, [user]);

  const handleToggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toast({ title: "Appearance Updated", description: "Dark mode enabled." });
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      toast({ title: "Appearance Updated", description: "Dark mode disabled." });
    }
  };

  const handleSaveChanges = async () => {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to save changes.", variant: "destructive" });
      return;
    }

    let changesMade = false;
    try {
      if (displayName !== (user.displayName || '')) {
        await updateProfile(user, { displayName });
        // Update user in AuthContext
        if (setUser) {
            setUser({ ...user, displayName });
        }
        toast({ title: "Profile Updated", description: "Your display name has been updated." });
        changesMade = true;
      }

      // Placeholder for saving notification preferences
      // For example, you might make an API call here
      // if (emailNotifications !== initialEmailNotifications) { ... }
      // if (pushNotifications !== initialPushNotifications) { ... }

      if (!changesMade) {
        toast({ title: "No Changes", description: "No profile information was changed." });
      }
    } catch (error: any) {
      console.error("Error saving settings:", error);
      toast({ title: "Save Error", description: error.message || "Could not save settings.", variant: "destructive" });
    }
  };

  const handleChangePassword = async () => {
    if (!user || !user.email) {
        toast({ title: "Error", description: "User not found or email missing.", variant: "destructive" });
        return;
    }
    if (newPassword !== confirmNewPassword) {
        toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" });
        return;
    }
    if (newPassword.length < 6) {
        toast({ title: "Error", description: "New password must be at least 6 characters.", variant: "destructive" });
        return;
    }

    try {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        toast({ title: "Success", description: "Password updated successfully." });
        setIsPasswordDialogOpen(false);
        // Clear password fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    } catch (error: any) {
        console.error("Error changing password:", error);
        let description = "Failed to change password. Please ensure your current password is correct.";
        if (error.code === 'auth/wrong-password') {
            description = "Incorrect current password. Please try again.";
        } else if (error.code === 'auth/too-many-requests') {
            description = "Too many failed attempts. Please try again later.";
        } else if (error.message) {
            description = error.message;
        }
        toast({ title: "Password Change Error", description, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-lg text-muted-foreground">Manage your account and application preferences.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl"><UserCircle className="h-6 w-6 text-primary" /> Profile</CardTitle>
          <CardDescription className="text-base">Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-base">Display Name</Label>
            <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Enter your display name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">Email</Label>
            <Input id="email" type="email" value={email} disabled placeholder="Your email address" />
            <p className="text-xs text-muted-foreground">Email address cannot be changed here.</p>
          </div>
          
          <AlertDialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Change Password</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Change Your Password</AlertDialogTitle>
                <AlertDialogDescription>
                    Enter your current password and a new password. New password must be at least 6 characters.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                        <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                    </div>
                </div>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={() => {setCurrentPassword(''); setNewPassword(''); setConfirmNewPassword('');}}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleChangePassword}>Save New Password</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        </CardContent>
      </Card>
      
      <Separator />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl"><Palette className="h-6 w-6 text-primary" /> Appearance</CardTitle>
          <CardDescription className="text-base">Customize the look and feel of CODEEX-FOCUS.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
            <div>
              <Label htmlFor="dark-mode" className="text-lg font-medium">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
            </div>
            <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={handleToggleDarkMode} aria-label="Toggle dark mode" />
          </div>
           <div className="space-y-2 rounded-lg border p-4 shadow-sm">
            <Label className="text-lg font-medium">Accent Color</Label>
            <p className="text-sm text-muted-foreground mb-3">Your current theme's accent colors. (User selection coming soon!)</p>
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-md bg-primary border-2 border-primary-foreground/50 shadow"></div>
                    <span className="text-xs text-muted-foreground">Primary</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-md bg-accent border-2 border-accent-foreground/50 shadow"></div>
                    <span className="text-xs text-muted-foreground">Accent</span>
                </div>
                 <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-md bg-secondary border-2 border-secondary-foreground/50 shadow"></div>
                    <span className="text-xs text-muted-foreground">Secondary</span>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Separator />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl"><Bell className="h-6 w-6 text-primary" /> Notifications</CardTitle>
          <CardDescription className="text-base">Manage how you receive notifications from CODEEX-FOCUS.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
                <div>
                    <Label htmlFor="email-notifications" className="text-lg font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates and reminders via email.</p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={emailNotifications} 
                  onCheckedChange={(checked) => {
                    setEmailNotifications(checked);
                    toast({ title: "Notification Setting", description: `Email notifications ${checked ? 'enabled' : 'disabled'}. (Backend not implemented)` });
                  }} 
                  aria-label="Toggle email notifications" 
                />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
                <div>
                    <Label htmlFor="push-notifications" className="text-lg font-medium">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get real-time alerts in the app. (Coming soon)</p>
                </div>
                <Switch 
                  id="push-notifications" 
                  checked={pushNotifications} 
                  onCheckedChange={(checked) => {
                    setPushNotifications(checked);
                    toast({ title: "Notification Setting", description: `Push notifications ${checked ? 'enabled' : 'disabled'}. (Coming soon)` });
                  }} 
                  aria-label="Toggle push notifications"
                  disabled // Keep disabled as it's marked coming soon
                />
            </div>
        </CardContent>
      </Card>
      
      <Separator />
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl"><Shield className="h-6 w-6 text-primary" /> Account</CardTitle>
          <CardDescription className="text-base">Manage your account data and security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Button variant="outline" onClick={() => toast({title: "Feature In Progress", description: "Data export functionality is coming soon."})}>
                Export My Data
            </Button>
             <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers. This feature is a placeholder.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => toast({ title: "Account Deletion Simluated", description: "Actual account deletion is not implemented in this prototype.", variant: "destructive"})}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        Yes, Delete Account
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <p className="text-xs text-muted-foreground">Account deletion is permanent and cannot be undone.</p>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-6 pb-2">
        <Button onClick={handleSaveChanges} className="bg-primary hover:bg-primary/90 text-lg py-3 px-6 min-w-[150px]">
          <Save className="mr-2 h-5 w-5" /> Save Changes
        </Button>
      </div>
    </div>
  );
}

    