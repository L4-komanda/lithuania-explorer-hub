
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Moon, Hand, User, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { attractions } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type MoonPhase = 'newMoon' | 'waxingCrescent' | 'firstQuarter' | 'waxingGibbous' | 
                'fullMoon' | 'waningGibbous' | 'lastQuarter' | 'waningCrescent';

type Horoscope = 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 
                'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

type PalmLine = 'strong' | 'medium' | 'weak';

const FortunePage: React.FC = () => {
  const [moonPhase, setMoonPhase] = useState<MoonPhase>('fullMoon');
  const [horoscope, setHoroscope] = useState<Horoscope>('aries');
  const [birthYear, setBirthYear] = useState<string>('1990');
  const [palmLine, setPalmLine] = useState<PalmLine>('medium');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestedAttraction, setSuggestedAttraction] = useState<any>(null);
  const { toast } = useToast();

  const handleFortuneTelling = () => {
    // Simple algorithm to pick a "random" attraction based on the inputs
    const moonValue = ['newMoon', 'waxingCrescent', 'firstQuarter', 'waxingGibbous', 
                    'fullMoon', 'waningGibbous', 'lastQuarter', 'waningCrescent'].indexOf(moonPhase);
    const horoscopeValue = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
                          'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'].indexOf(horoscope);
    const yearValue = parseInt(birthYear) % 100;
    const palmValue = ['weak', 'medium', 'strong'].indexOf(palmLine);
    
    // Use all values to create a seemingly complex but actually deterministic selection
    const index = (moonValue + horoscopeValue + yearValue + palmValue) % attractions.length;
    setSuggestedAttraction(attractions[index]);
    setIsOpen(true);
    
    toast({
      title: "Būrimas atliktas",
      description: "Pagal jūsų duomenis, parinkta tinkamiausia vieta!",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 md:pb-8 px-4 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-center">
          <Moon className="inline-block mr-2 text-primary" /> Būrimas
        </h1>
        <p className="text-center text-muted-foreground mb-10">
          Pagal mėnulio fazę, delno linijas, horoskopą ir gimimo metus išbursime jums tinkamiausią lankytiną vietą!
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Įveskite savo duomenis būrimui</CardTitle>
            <CardDescription>
              Pateikite informaciją, pagal kurią išbursime jums tinkamiausią lankytiną vietą
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Moon className="text-primary h-5 w-5" />
                <Label>Mėnulio fazė</Label>
              </div>
              <Select value={moonPhase} onValueChange={(value) => setMoonPhase(value as MoonPhase)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pasirinkite mėnulio fazę" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newMoon">Jaunatis</SelectItem>
                  <SelectItem value="waxingCrescent">Priešpilnis (didėjantis)</SelectItem>
                  <SelectItem value="firstQuarter">Pirmas ketvirtis</SelectItem>
                  <SelectItem value="waxingGibbous">Beveik pilnatis</SelectItem>
                  <SelectItem value="fullMoon">Pilnatis</SelectItem>
                  <SelectItem value="waningGibbous">Po pilnaties</SelectItem>
                  <SelectItem value="lastQuarter">Paskutinis ketvirtis</SelectItem>
                  <SelectItem value="waningCrescent">Delčia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="text-primary h-5 w-5" />
                <Label>Horoskopo ženklas</Label>
              </div>
              <Select value={horoscope} onValueChange={(value) => setHoroscope(value as Horoscope)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pasirinkite horoskopo ženklą" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aries">Avinas</SelectItem>
                  <SelectItem value="taurus">Jautis</SelectItem>
                  <SelectItem value="gemini">Dvyniai</SelectItem>
                  <SelectItem value="cancer">Vėžys</SelectItem>
                  <SelectItem value="leo">Liūtas</SelectItem>
                  <SelectItem value="virgo">Mergelė</SelectItem>
                  <SelectItem value="libra">Svarstyklės</SelectItem>
                  <SelectItem value="scorpio">Skorpionas</SelectItem>
                  <SelectItem value="sagittarius">Šaulys</SelectItem>
                  <SelectItem value="capricorn">Ožiaragis</SelectItem>
                  <SelectItem value="aquarius">Vandenis</SelectItem>
                  <SelectItem value="pisces">Žuvys</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary h-5 w-5" />
                <Label>Gimimo metai</Label>
              </div>
              <Select value={birthYear} onValueChange={setBirthYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Pasirinkite gimimo metus" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 80 }, (_, i) => 2005 - i).map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Hand className="text-primary h-5 w-5" />
                <Label>Delno linijos</Label>
              </div>
              <Select value={palmLine} onValueChange={(value) => setPalmLine(value as PalmLine)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pasirinkite delno linijų tipą" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strong">Ryškios, gilios linijos</SelectItem>
                  <SelectItem value="medium">Vidutinio ryškumo linijos</SelectItem>
                  <SelectItem value="weak">Silpnai matomos linijos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full mt-4" onClick={handleFortuneTelling}>
              <Moon className="mr-2 h-4 w-4" /> Burti
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Suggestion Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Moon className="text-primary h-5 w-5" />
              Jūsų išburta vieta
            </DialogTitle>
            <DialogDescription>
              Pagal pateiktus duomenis, mėnulio fazę, horoskopą ir delno linijas
            </DialogDescription>
          </DialogHeader>
          
          {suggestedAttraction && (
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={suggestedAttraction.image} 
                  alt={suggestedAttraction.name} 
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">{suggestedAttraction.name}</h3>
                <p className="text-muted-foreground text-sm">{suggestedAttraction.category}</p>
                <p className="mt-2">{suggestedAttraction.description}</p>
                
                <div className="mt-4 pt-3 border-t">
                  <h4 className="text-sm font-medium mb-2">Kodėl ši vieta jums tinka:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• {horoscope === 'aries' ? 'Jūsų avinui tinka aktyvios vietos' : 'Jūsų horoskopas rodo potraukį tokioms vietoms'}</li>
                    <li>• {moonPhase === 'fullMoon' ? 'Pilnaties metu ši vieta ypač magiska' : 'Esama mėnulio fazė palankiausia šiai vietai'}</li>
                    <li>• Jūsų gimimo metai ({birthYear}) kuria harmoniją su šia vieta</li>
                    <li>• {palmLine === 'strong' ? 'Ryškios delno linijos rodo stiprų ryšį su gamta' : 'Jūsų delno linijos rodo, kad šioje vietoje rasite ramybę'}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>Uždaryti</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FortunePage;
