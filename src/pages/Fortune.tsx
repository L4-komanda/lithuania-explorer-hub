import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { attractions } from '@/lib/data';
import { Attraction } from '@/lib/types';
import { Hand, ScanLine, Wand2, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface PalmLine {
  x: number;
  y: number;
}

interface PalmLinesData {
  heartLine: PalmLine[];
  headLine: PalmLine[];
  lifeLine: PalmLine[];
  fateLine: PalmLine[];
}

const palmLinesData: PalmLinesData = {
  heartLine: [
    { x: 200, y: 300 },
    { x: 250, y: 280 },
    { x: 300, y: 250 },
    { x: 350, y: 230 },
    { x: 400, y: 220 },
    { x: 450, y: 230 },
    { x: 500, y: 250 },
    { x: 550, y: 280 },
    { x: 600, y: 300 },
  ],
  headLine: [
    { x: 200, y: 400 },
    { x: 250, y: 380 },
    { x: 300, y: 350 },
    { x: 350, y: 330 },
    { x: 400, y: 320 },
    { x: 450, y: 330 },
    { x: 500, y: 350 },
    { x: 550, y: 380 },
    { x: 600, y: 400 },
  ],
  lifeLine: [
    { x: 220, y: 450 },
    { x: 230, y: 500 },
    { x: 250, y: 550 },
    { x: 300, y: 580 },
    { x: 350, y: 590 },
    { x: 400, y: 580 },
    { x: 450, y: 550 },
    { x: 500, y: 500 },
    { x: 550, y: 450 },
  ],
  fateLine: [
    { x: 350, y: 300 },
    { x: 350, y: 350 },
    { x: 350, y: 400 },
    { x: 350, y: 450 },
    { x: 350, y: 500 },
  ],
};

interface PalmLineSelectorProps {
  palmLinesData: PalmLinesData;
  onLineSelected: (lineName: keyof PalmLinesData, point: PalmLine) => void;
}

const PalmLineSelector: React.FC<PalmLineSelectorProps> = ({ palmLinesData, onLineSelected }) => {
  const handleLineClick = (lineName: keyof PalmLinesData, point: PalmLine) => {
    onLineSelected(lineName, point);
  };

  return (
    <svg width="800" height="600">
      {Object.entries(palmLinesData).map(([lineName, line]) => (
        <g key={lineName}>
          <polyline
            points={line.map(p => `${p.x},${p.y}`).join(' ')}
            style={{
              fill: 'none',
              stroke: 'rgba(255, 255, 255, 0.7)',
              strokeWidth: 2,
            }}
          />
          {line.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={5}
              fill="rgba(255, 255, 0, 0.5)"
              style={{ cursor: 'pointer' }}
              onClick={() => handleLineClick(lineName as keyof PalmLinesData, point)}
            />
          ))}
        </g>
      ))}
    </svg>
  );
};

const FortunePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Attraction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [selectedLine, setSelectedLine] = useState<{ lineName: keyof PalmLinesData; point: PalmLine } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scanTimeout = useRef<NodeJS.Timeout | null>(null);

  const palmImages = [
    '/lovable-uploads/4c2fdec9-be0f-4290-ba6c-37e8aaf7dee3.png', // Assuming this is one of the images
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?q=80&w=800&auto=format&fit=crop'
  ];
  const [currentPalmImage, setCurrentPalmImage] = useState<string | null>(null);

  const handleScan = () => {
    setIsLoading(true);
    setIsScanning(true);
    setScanStep(0);
    setCurrentPalmImage(palmImages[Math.floor(Math.random() * palmImages.length)]);

    scanTimeout.current = setTimeout(() => {
      setScanStep(1);
      scanTimeout.current = setTimeout(() => {
        setScanStep(2);
        scanTimeout.current = setTimeout(() => {
          setScanStep(3);
          scanTimeout.current = setTimeout(() => {
            setScanStep(4);
            scanTimeout.current = setTimeout(() => {
              setIsLoading(false);
              setIsScanning(false);
              const randomAttraction = attractions[Math.floor(Math.random() * attractions.length)];
              setResult(randomAttraction);
              setIsModalOpen(true);
            }, 1500);
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const handleFortuneTell = () => {
    setIsLoading(true);
    setIsScanning(true);
    setScanStep(0);

    scanTimeout.current = setTimeout(() => {
      setScanStep(1);
      scanTimeout.current = setTimeout(() => {
        setScanStep(2);
        scanTimeout.current = setTimeout(() => {
          setScanStep(3);
          scanTimeout.current = setTimeout(() => {
            setScanStep(4);
            scanTimeout.current = setTimeout(() => {
              setIsLoading(false);
              setIsScanning(false);
              const randomAttraction = attractions[Math.floor(Math.random() * attractions.length)];
              setResult(randomAttraction);
              setIsModalOpen(true);
            }, 1500);
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const resetScanner = () => {
    setResult(null);
    setIsModalOpen(false);
    setCurrentPalmImage(null);
    setIsScanning(false);
    setScanStep(0);
    if (scanTimeout.current) {
      clearTimeout(scanTimeout.current);
    }
  };

  const scanSteps = [
    "Analizuojama delno struktūra...",
    "Ieškoma pagrindinių linijų...",
    "Vertinamas pirštų ilgis ir forma...",
    "Tikrinami kalneliai ir ženklai...",
    "Formuojama asmeninė prognozė..."
  ];

  useEffect(() => {
    if (isLoading && scanStep < scanSteps.length) {
      document.title = `Skenuojama... ${scanSteps[scanStep]}`;
    } else {
      document.title = "Delno Linijų Būrimas";
    }
  }, [isLoading, scanStep]);


  const PalmScanner: React.FC<{ onScanComplete: (image: string) => void, isScanning: boolean }> = ({ onScanComplete, isScanning }) => {
    return (
      <div className="w-full max-w-xs h-80 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden border-2 border-primary/50">
        {isScanning && scanStep < scanSteps.length && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
            <ScanLine className="w-16 h-16 text-primary animate-pulse" />
            <p className="text-white mt-2 text-center px-4">{scanSteps[scanStep]}</p>
            <div className="w-3/4 h-2 bg-primary/30 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-1000 ease-linear"
                style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        {!isScanning && !currentPalmImage && (
          <div className="text-center text-muted-foreground">
            <Hand className="w-24 h-24 mx-auto mb-4" />
            <p>Padėkite delną skenavimui</p>
          </div>
        )}
        {currentPalmImage && (
          <img src={currentPalmImage} alt="Nuskenuotas delnas" className="w-full h-full object-cover" />
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-24 px-4 min-h-screen flex flex-col items-center justify-center animate-fade-in">
      
      
      <Card className="w-full max-w-lg glass-card animate-scale-in">
        <CardHeader className="text-center">
          <Wand2 className="w-12 h-12 mx-auto text-primary mb-2" />
          <CardTitle className="text-2xl">Delno Linijų Būrimas</CardTitle>
          <CardDescription>Nuskenuokite savo delną ir sužinokite, ką jis slepia!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <PalmScanner onScanComplete={setCurrentPalmImage} isScanning={isLoading} />

          {!isLoading && !result && (
            <Button onClick={handleScan} className="w-full" size="lg" disabled={isLoading}>
              <ScanLine className="mr-2" /> {currentPalmImage ? "Skenuoti iš naujo" : "Skenuoti Delną"}
            </Button>
          )}

          {isLoading && (
            <div className="text-center">
              <p>Skenuojama... Prašome palaukti.</p>
            </div>
          )}

          {currentPalmImage && !isLoading && !result && (
             <Button onClick={handleFortuneTell} className="w-full bg-green-500 hover:bg-green-600 text-white" size="lg">
              <Wand2 className="mr-2" /> Burti
            </Button>
          )}
        </CardContent>
        {result && (
          <CardFooter className="flex flex-col items-center pt-6">
            <p className="text-lg font-semibold mb-2">Jūsų laukia kelionė į:</p>
            <h3 className="text-2xl font-bold text-primary text-center">{result.name}</h3>
            <img src={result.image} alt={result.name} className="mt-4 rounded-lg max-h-48 object-cover aspect-video"/>
            <Button onClick={resetScanner} className="mt-6 w-full" variant="outline">
              Bandyti dar kartą
            </Button>
          </CardFooter>
        )}
      </Card>

      
      {result && isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">Jūsų kelionės tikslas!</DialogTitle>
              <DialogDescription>
                Remiantis jūsų delno linijomis, žvaigždės jums lėmė aplankyti šią vietą:
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 text-center">
              <img src={result.image} alt={result.name} className="rounded-md mx-auto mb-4 max-h-60 object-contain" />
              <h3 className="text-xl font-semibold text-primary">{result.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-1" /> {result.category}
              </p>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{result.description}</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsModalOpen(false)} className="w-full">Uždaryti</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
    </div>
  );
};

export default FortunePage;
