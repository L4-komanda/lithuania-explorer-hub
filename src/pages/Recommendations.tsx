
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

const RecommendationsPage: React.FC = () => {
  // TODO: Implement actual recommendation logic based on user data
  const recommendedAttractions = [
    { id: 'rec-1', name: 'Birštono apžvalgos bokštas', reason: 'Populiarus tarp panašaus amžiaus vartotojų' },
    { id: 'rec-2', name: 'Ventės ragas', reason: 'Jei patiko Kuršių Nerija' },
    { id: 'rec-3', name: 'Europos parkas', reason: 'Mėgstantiems meną ir gamtą' },
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
                  className="overflow-hidden transition-all hover:shadow-lg animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <CardTitle>{attraction.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{attraction.reason}</p>
                    {/* Placeholder for more details or image */}
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
