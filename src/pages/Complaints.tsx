
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, MessageSquare, FileText } from 'lucide-react';

interface Complaint {
  id: string;
  subject: string;
  category: string;
  message: string;
  status: 'Pateiktas' | 'Peržiūrimas' | 'Išspręstas' | 'Atmestas';
  date: string;
}

// Mock data for demonstration
const mockComplaints: Complaint[] = [
  {
    id: '1',
    subject: 'Netinkamas turinys',
    category: 'content',
    message: 'Radau netinkamą informaciją.',
    status: 'Pateiktas',
    date: '2025-04-15'
  },
  {
    id: '2',
    subject: 'Techninė problema',
    category: 'technical',
    message: 'Neveikia žemėlapio funkcija.',
    status: 'Išspręstas',
    date: '2025-04-14'
  }
];

const ComplaintsPage: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Skundas pateiktas",
        description: "Jūsų skundas buvo sėkmingai išsiųstas. Mes jį peržiūrėsime kuo greičiau.",
      });
      
      setSubject('');
      setCategory('');
      setMessage('');
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pateiktas':
        return 'text-yellow-600';
      case 'Peržiūrimas':
        return 'text-blue-600';
      case 'Išspręstas':
        return 'text-green-600';
      case 'Atmestas':
        return 'text-red-600';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 md:pb-8 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Skundai</h1>
          <p className="text-muted-foreground">
            Pateikite naują skundą arba peržiūrėkite ankstesnius skundus.
          </p>
        </div>

        <Tabs defaultValue="submit" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="submit" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Pateikti skundą
            </TabsTrigger>
            <TabsTrigger value="view" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Peržiūrėti skundus
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Skundo forma
                </CardTitle>
                <CardDescription>
                  Užpildykite žemiau esančią formą, kad pateiktumėte skundą.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Tema</Label>
                    <Input 
                      id="subject" 
                      placeholder="Įveskite skundo temą" 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategorija</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Pasirinkite kategoriją" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Techninė problema</SelectItem>
                        <SelectItem value="content">Neteisingas turinys</SelectItem>
                        <SelectItem value="user">Naudotojo elgesys</SelectItem>
                        <SelectItem value="payment">Mokėjimo problema</SelectItem>
                        <SelectItem value="other">Kita</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Žinutė</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Aprašykite savo problemą..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div className="flex items-start text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p>
                      Pateikdami skundą, jūs sutinkate su mūsų privatumo politika ir taisyklėmis.
                      Mes nesidalinsime jūsų asmenine informacija be jūsų sutikimo.
                    </p>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Atšaukti</Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? "Siunčiama..." : "Pateikti skundą"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="view">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Skundų sąrašas
                </CardTitle>
                <CardDescription>
                  Peržiūrėkite visus pateiktus skundus ir jų būsenas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Tema</TableHead>
                      <TableHead>Kategorija</TableHead>
                      <TableHead>Būsena</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockComplaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell>{complaint.date}</TableCell>
                        <TableCell>{complaint.subject}</TableCell>
                        <TableCell>
                          {complaint.category === 'technical' && 'Techninė problema'}
                          {complaint.category === 'content' && 'Neteisingas turinys'}
                          {complaint.category === 'user' && 'Naudotojo elgesys'}
                          {complaint.category === 'payment' && 'Mokėjimo problema'}
                          {complaint.category === 'other' && 'Kita'}
                        </TableCell>
                        <TableCell className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComplaintsPage;
