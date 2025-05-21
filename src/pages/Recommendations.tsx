
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio'; // Importuota AspectRatio
import { Lightbulb } from 'lucide-react';

const RecommendationsPage: React.FC = () => {
  // TODO: Implement actual recommendation logic based on user data
  const recommendedAttractions = [
    { 
      id: 'rec-1', 
      name: 'Birštono apžvalgos bokštas', 
      reason: 'Populiarus tarp panašaus amžiaus vartotojų',
      image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dG93ZXJ8ZW58MHx8MHx8fDA%3D' 
    },
    { 
      id: 'rec-2', 
      name: 'Ventės ragas', 
      reason: 'Jei patiko Kuršių Nerija',
      image: 'https://images.unsplash.com/photo-1519901049339-d0e481656958?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlnaHRob3VzZSUyMGNvbGFzdHxlbnwwfHwwfHx8MA%3D%3D'
    },
    { 
      id: 'rec-3', 
      name: 'Europos parkas', 
      reason: 'Mėgstantiems meną ir gamtą',
      image: 'https://images.unsplash.com/photo-1504216085419-90ea3c637978?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2N1bHB0dXJlJTIwcGFya3xlbnwwfHwwfHx8MA%3D%3D'
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 md:pb-8 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight flex items-center justify-center">
            <Lightbulb className="w-8 h-8 mr-3 text-primary" />
            Jums Rekomenduojamos Vietos
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Atraskite naujas įdomias Lietuvos vietas, parinktas specialiai jums! Ateityje šios rekomendacijos bus dar labiau pritaikytos pagal jūsų pomėgius ir aplankytas vietas.
          </p>
        </header>

        <section>
          {recommendedAttractions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedAttractions.map((attraction, index) => (
                <Card 
                  key={attraction.id} 
                  className="overflow-hidden transition-all hover:shadow-lg animate-slide-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-xl tracking-tight">{attraction.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 px-4 pb-4">
                    <p className="text-sm text-muted-foreground">{attraction.reason}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Šiuo metu neturime jums specialių rekomendacijų. Aplankykite daugiau vietų, kad galėtume geriau jus pažinti!</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default RecommendationsPage;
