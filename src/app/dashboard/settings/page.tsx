
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your public profile and professional details.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            This information will be displayed on your public profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Profile Photo</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button variant="outline">Change Photo</Button>
                <Button variant="ghost" className="text-destructive hover:text-destructive">Remove</Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
                Recommended: Square, min 400x400px
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input id="title" defaultValue="Full-Stack Developer" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select country/region" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ng">Lagos, Nigeria</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                         <SelectItem value="gb">United Kingdom</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="gmt+1">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmt-12">(GMT-12:00) International Date Line West</SelectItem>
                  <SelectItem value="gmt-1">(GMT-01:00) Azores</SelectItem>
                  <SelectItem value="gmt+0">(GMT+00:00) London</SelectItem>
                  <SelectItem value="gmt+1">(GMT+01:00) West Africa Time</SelectItem>
                  <SelectItem value="gmt+8">(GMT+08:00) Beijing, Perth</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={5}
              defaultValue="I'm a passionate full-stack developer with 5+ years of experience building web applications. I specialize in React, Node.js, and creating intuitive user experiences. I've worked with startups and enterprises across various industries."
            />
             <p className="text-sm text-muted-foreground text-right">315/500 characters</p>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (USDC)</Label>
              <div className="relative">
                <Input id="hourlyRate" type="number" defaultValue="50" className="pl-8"/>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
               <Select defaultValue="full-time">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time (40+ hours/week)</SelectItem>
                  <SelectItem value="part-time">Part-time (20-30 hours/week)</SelectItem>
                  <SelectItem value="as-needed">As needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Professional Details</CardTitle>
            <CardDescription>Showcase your skills, education, and experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2 p-3 border rounded-md">
                    <Badge variant="secondary" className="pl-2 py-1">React <button className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-muted-foreground/20"><X className="h-3 w-3"/></button></Badge>
                    <Badge variant="secondary" className="pl-2 py-1">Node.js <button className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-muted-foreground/20"><X className="h-3 w-3"/></button></Badge>
                    <Badge variant="secondary" className="pl-2 py-1">MongoDB <button className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-muted-foreground/20"><X className="h-3 w-3"/></button></Badge>
                    <Input placeholder="+ Add skill" className="inline-flex w-28 h-8 border-dashed" />
                </div>
            </div>

            <div className="space-y-4">
                <Label>Languages</Label>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Input defaultValue="English" className="flex-1"/>
                         <Select defaultValue="native">
                            <SelectTrigger className="w-[180px]">
                            <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="basic">Basic</SelectItem>
                                <SelectItem value="conversational">Conversational</SelectItem>
                                <SelectItem value="fluent">Fluent</SelectItem>
                                <SelectItem value="native">Native/Bilingual</SelectItem>
                            </SelectContent>
                        </Select>
                         <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                     <div className="flex items-center gap-2">
                        <Input defaultValue="Yoruba" className="flex-1"/>
                         <Select defaultValue="native">
                            <SelectTrigger className="w-[180px]">
                            <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="basic">Basic</SelectItem>
                                <SelectItem value="conversational">Conversational</SelectItem>
                                <SelectItem value="fluent">Fluent</SelectItem>
                                <SelectItem value="native">Native/Bilingual</SelectItem>
                            </SelectContent>
                        </Select>
                         <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                </div>
                <Button variant="link" className="p-0">+ Add Language</Button>
            </div>

             <div className="space-y-4">
                <Label>Education</Label>
                <Card className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold">Bachelor of Science in Computer Science</p>
                            <p className="text-sm text-muted-foreground">University of Lagos</p>
                            <p className="text-sm text-muted-foreground">2015 - 2019</p>
                        </div>
                        <div className="flex gap-2">
                             <Button variant="ghost" size="sm">Edit</Button>
                             <Button variant="ghost" size="sm">Remove</Button>
                        </div>
                    </div>
                </Card>
                <Button variant="link" className="p-0">+ Add Education</Button>
            </div>
             <div className="space-y-4">
                <Label>Certifications</Label>
                <Card className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold">AWS Certified Developer</p>
                            <p className="text-sm text-muted-foreground">Amazon Web Services</p>
                            <p className="text-sm text-muted-foreground">Issued: Jan 2024 • No Expiration</p>
                        </div>
                        <div className="flex gap-2">
                             <Button variant="ghost" size="sm">View Certificate</Button>
                             <Button variant="ghost" size="sm">Edit</Button>
                             <Button variant="ghost" size="sm">Remove</Button>
                        </div>
                    </div>
                </Card>
                <Button variant="link" className="p-0">+ Add Certification</Button>
            </div>

        </CardContent>
        <CardFooter>
            <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>Add your portfolio and social media links.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input id="github" defaultValue="https://github.com/johndoe" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" defaultValue="https://linkedin.com/in/johndoe" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="website">Personal Website</Label>
              <Input id="website" defaultValue="https://johndoe.dev" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="twitter">Twitter/X</Label>
              <Input id="twitter" defaultValue="https://twitter.com/johndoe" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="dribbble">Dribbble</Label>
              <Input id="dribbble" placeholder="https://dribbble.com/..." />
            </div>
        </CardContent>
         <CardFooter>
            <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
