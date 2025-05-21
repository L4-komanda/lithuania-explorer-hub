import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Loader2, Wand2, AlertTriangle, Gift, Smile, Meh, Frown } from 'lucide-react';

interface FortuneState {
  prediction: string;
  luckyNumber: number;
  luckyColor: string;
  advice: string;
}

const fortuneTellingPhases = [
  "Žvaigždės išsidėsto palankiai...",
  "Likimo linijos ryškėja...",
  "Ateitis atsiveria...",
];

const getRandomElement = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

const initialFortuneState: FortuneState = {
  prediction: "",
  luckyNumber: 0,
  luckyColor: "",
  advice: "",
};

const FortunePage: React.FC = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phase, setPhase] = useState<'input' | 'loading' | 'result'>('input');
  const [fortune, setFortune] = useState<FortuneState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fortuneCardRef = useRef<HTMLDivElement>(null);

  const handleFortuneTell = async () => {
    if (!name || !birthDate) {
      setError('Prašome įvesti vardą ir gimimo datą.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setPhase('loading');

    // Simulate fortune telling process
    const fortuneTellingInterval = setInterval(() => {
      toast({
        title: "Burtai...",
        description: getRandomElement(fortuneTellingPhases),
      });
    }, 1500);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 5000));

    clearInterval(fortuneTellingInterval);
    setIsLoading(false);
    setPhase('result');

    // Mock fortune result
    const mockedFortune: FortuneState = {
      prediction: `Šiandien jūsų laukia netikėtumai, tačiau nebijokite priimti iššūkius. Būkite atviri naujoms galimybėms ir pasitikėkite savo intuicija.`,
      luckyNumber: Math.floor(Math.random() * 100),
      luckyColor: ['raudona', 'žalia', 'mėlyna', 'geltona', 'violetinė', 'oranžinė', 'juoda', 'balta'][Math.floor(Math.random() * 8)],
      advice: `Nepamirškite skirti laiko sau ir savo artimiesiems.`,
    };

    setFortune(mockedFortune);
  };

  const handleReset = () => {
    setPhase('input');
    setFortune(null);
    setName('');
    setBirthDate('');
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo({ top: 0 });

    // Fade in animation
    if (fortuneCardRef.current) {
      fortuneCardRef.current.classList.add('animate-fade-in-scale');
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      if (fortuneCardRef.current) {
        fortuneCardRef.current.classList.remove('animate-fade-in-scale');
      }
    };
  }, []);

  const getSentimentIcon = () => {
    const randomNumber = Math.random();
    if (randomNumber < 0.3) {
      return <Smile className="h-10 w-10 text-green-400" />;
    } else if (randomNumber < 0.6) {
      return <Meh className="h-10 w-10 text-yellow-400" />;
    } else {
      return <Frown className="h-10 w-10 text-red-400" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-20 md:pb-8 px-4 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white selection:bg-white/30 selection:text-white">
      <div ref={fortuneCardRef} className="w-full max-w-md">
        {/* Phase 1: Input */}
        {phase === 'input' && (
          <Card className="bg-white/10 backdrop-blur-lg shadow-xl border-white/20 animate-fade-in-scale">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center">
                <Wand2 className="mr-3 h-8 w-8 text-yellow-300" />
                Ateities Spėjimas
              </CardTitle>
              <CardDescription className="text-center text-white/80 pt-2">
                Įveskite savo duomenis ir sužinokite, ką jums lemia žvaigždės!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/90">Vardas</Label>
                <Input 
                  id="name" 
                  placeholder="Jūsų vardas" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/20 border-white/30 placeholder:text-white/60 focus:bg-white/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-white/90">Gimimo data</Label>
                <Input 
                  id="birthDate" 
                  type="date" 
                  value={birthDate} 
                  onChange={(e) => setBirthDate(e.target.value)} 
                  className="bg-white/20 border-white/30 placeholder:text-white/60 focus:bg-white/30 appearance-none"
                  style={{ colorScheme: 'dark' }} 
                />
              </div>
              {error && (
                <p className="text-sm text-red-300 bg-red-900/50 p-3 rounded-md flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  {error}
                </p>
              )}
            </CardContent>
            <CardFooter className="flex justify-center pt-6">
              <Button 
                onClick={handleFortuneTell} 
                disabled={isLoading || !name || !birthDate}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-700 font-semibold text-lg py-3 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-5 w-5" />
                )}
                Spėti ateitį
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Phase 2: Loading */}
        {phase === 'loading' && (
          <Card className="bg-white/10 backdrop-blur-lg shadow-xl border-white/20 animate-fade-in-scale text-center py-20">
            <CardContent>
              <Loader2 className="h-16 w-16 text-yellow-300 animate-spin mx-auto mb-6" />
              <p className="text-xl font-semibold text-white/90">Maišomos žvaigždžių kortos...</p>
              <p className="text-white/70">Jūsų likimas tuoj paaiškės.</p>
            </CardContent>
          </Card>
        )}

        {/* Phase 3: Result */}
        {phase === 'result' && fortune && (
          <Card className="bg-white/10 backdrop-blur-lg shadow-xl border-white/20 animate-fade-in-scale">
            <CardHeader className="text-center">
              <div className="mx-auto bg-yellow-400 rounded-full p-3 inline-block mb-4 shadow-md">
                {getSentimentIcon()}
              </div>
              <CardTitle className="text-3xl font-bold text-white">
                {name}, jūsų ateitis atskleista!
              </CardTitle>
              <CardDescription className="text-white/80 pt-2">
                Remiantis gimimo data {new Date(birthDate).toLocaleDateString('lt-LT')}, žvaigždės byloja:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="border-t border-b border-white/20 py-4">
                <p className="text-lg text-white/90 leading-relaxed">{fortune.prediction}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-yellow-300 font-semibold">Laimingas skaičius: <span className="text-xl text-white">{fortune.luckyNumber}</span></p>
                <p className="text-sm text-yellow-300 font-semibold">Laiminga spalva: <span className="text-xl text-white capitalize" style={{color: fortune.luckyColor.toLowerCase() === 'balta' ? '#FFFFFF' : fortune.luckyColor.toLowerCase() === 'juoda' ? '#CCCCCC' : fortune.luckyColor.toLowerCase() }}>{fortune.luckyColor}</span></p>
                <p className="text-sm text-yellow-300 font-semibold">Patarimas: <span className="text-white italic">"{fortune.advice}"</span></p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-6">
              <Button 
                onClick={handleReset}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold text-lg py-3 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                <Gift className="mr-2 h-5 w-5" />
                Bandyti dar kartą
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FortunePage;
