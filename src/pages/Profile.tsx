
import React, { useEffect } from 'react';
import { currentUser, races, friends } from '@/lib/data';
import { User, MapPin, Flag, Settings, Users } from 'lucide-react';

const ProfilePage: React.FC = () => {
  // Animation on component mount
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo({ top: 0 });
  }, []);

  const registeredRaces = races.filter(race => 
    race.participants.includes(currentUser.id)
  );

  return (
    <div className="min-h-screen pt-24 pb-20 md:pb-8 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - User info */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-xl p-6 animate-slide-in">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-24 h-24 rounded-full border-4 border-white shadow-sm"
                  />
                  <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                </div>
                <h1 className="text-2xl font-bold mb-1">{currentUser.name}</h1>
                <p className="text-muted-foreground text-sm mb-4">{currentUser.email}</p>
                
                <div className="flex gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-semibold">{registeredRaces.length}</div>
                    <div className="text-xs text-muted-foreground">Lenktynės</div>
                  </div>
                  <div className="h-10 border-l border-border"></div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{friends.length}</div>
                    <div className="text-xs text-muted-foreground">Draugai</div>
                  </div>
                  <div className="h-10 border-l border-border"></div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">0</div>
                    <div className="text-xs text-muted-foreground">Aplankytos vietos</div>
                  </div>
                </div>
                
                <button className="flex items-center text-sm gap-1 text-muted-foreground hover:text-foreground">
                  <Settings className="w-4 h-4" />
                  <span>Redaguoti profilį</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Right column - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Registered races */}
            <div className="glass-card rounded-xl p-6 animate-slide-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-2 mb-4">
                <Flag className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Užregistruotos lenktynės</h2>
              </div>
              
              {registeredRaces.length > 0 ? (
                <div className="space-y-4">
                  {registeredRaces.map(race => (
                    <div key={race.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="h-12 w-12 rounded-md overflow-hidden">
                        <img src={race.image} alt={race.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{race.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <span>{new Date(race.date).toLocaleDateString('lt-LT')}</span>
                        </p>
                      </div>
                      <button className="text-sm text-primary hover:text-primary/80">Detalės</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-4 text-center text-muted-foreground">
                  <p>Nėra užregistruotų lenktynių</p>
                  <button className="mt-2 text-primary hover:underline">Naršyti lenktynes</button>
                </div>
              )}
            </div>
            
            {/* Friends list */}
            <div className="glass-card rounded-xl p-6 animate-slide-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Draugai</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {friends.map(friend => (
                  <div key={friend.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="relative">
                      <img src={friend.avatar} alt={friend.name} className="h-10 w-10 rounded-full" />
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{friend.name}</h3>
                      <p className="text-xs text-muted-foreground capitalize">{friend.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
