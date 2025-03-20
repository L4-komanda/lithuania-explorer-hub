
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, MessageSquare } from 'lucide-react';

const ComplaintsPage: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Skundas pateiktas",
        description: "Jūsų skundas buvo sėkmingai išsiųstas. Mes jį peržiūrėsime kuo greičiau.",
      });
      
      // Reset form
      setSubject('');
      setCategory('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 md:pb-8 px-4 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Pateikti skundą</h1>
          <p className="text-muted-foreground">
            Susidūrėte su problema? Pateikite skundą ir mes jį peržiūrėsime kuo greičiau.
          </p>
        </div>
        
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
      </div>
    </div>
  );
};

export default ComplaintsPage;
