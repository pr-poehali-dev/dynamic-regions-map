import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Branch {
  id: number;
  city: string;
  region: string;
  lat: number;
  lng: number;
  info?: string;
}

const branches: Branch[] = [
  { id: 1, city: 'Краснодар', region: 'Краснодарский край', lat: 45.04, lng: 38.98, info: 'Главный офис' },
  { id: 2, city: 'Сочи', region: 'Краснодарский край', lat: 43.60, lng: 39.73 },
  { id: 3, city: 'Новороссийск', region: 'Краснодарский край', lat: 44.72, lng: 37.77 },
  { id: 4, city: 'Анапа', region: 'Краснодарский край', lat: 44.89, lng: 37.32 },
  { id: 5, city: 'Лазаревское', region: 'Краснодарский край', lat: 43.91, lng: 39.33 },
  { id: 6, city: 'Ейск', region: 'Краснодарский край', lat: 46.71, lng: 38.27 },
  { id: 7, city: 'Геленджик', region: 'Краснодарский край', lat: 44.56, lng: 38.08 },
  { id: 8, city: 'Ростов-на-Дону', region: 'Ростовская область', lat: 47.23, lng: 39.72 },
  { id: 9, city: 'Пятигорск', region: 'Ставропольский край', lat: 44.05, lng: 43.06 },
  { id: 10, city: 'Ставрополь', region: 'Ставропольский край', lat: 45.04, lng: 41.97 },
  { id: 11, city: 'Астрахань', region: 'Астраханская область', lat: 46.35, lng: 48.04 },
  { id: 12, city: 'Туапсе', region: 'Краснодарский край', lat: 44.10, lng: 39.08 },
  { id: 13, city: 'Симферополь', region: 'Крым', lat: 44.95, lng: 34.10 },
  { id: 14, city: 'Москва', region: 'Москва', lat: 55.75, lng: 37.62 },
  { id: 15, city: 'Воронеж', region: 'Воронежская область', lat: 51.67, lng: 39.18 },
  { id: 16, city: 'Липецк', region: 'Липецкая область', lat: 52.61, lng: 39.57 },
  { id: 17, city: 'Нижний Новгород', region: 'Нижегородская область', lat: 56.33, lng: 44.00 },
  { id: 18, city: 'Санкт-Петербург', region: 'Санкт-Петербург', lat: 59.93, lng: 30.36 },
  { id: 19, city: 'Самара', region: 'Самарская область', lat: 53.20, lng: 50.15 },
  { id: 20, city: 'Новосибирск', region: 'Новосибирская область', lat: 55.03, lng: 82.92 },
  { id: 21, city: 'Волгоград', region: 'Волгоградская область', lat: 48.71, lng: 44.51 },
  { id: 22, city: 'Пермь', region: 'Пермский край', lat: 58.01, lng: 56.25 },
  { id: 23, city: 'Челябинск', region: 'Челябинская область', lat: 55.16, lng: 61.40 },
  { id: 24, city: 'Саратов', region: 'Саратовская область', lat: 51.54, lng: 46.01 },
  { id: 25, city: 'Красноярск', region: 'Красноярский край', lat: 56.01, lng: 92.85 },
  { id: 26, city: 'Екатеринбург', region: 'Свердловская область', lat: 56.84, lng: 60.61 },
  { id: 27, city: 'Казань', region: 'Татарстан', lat: 55.79, lng: 49.12 },
  { id: 28, city: 'Уфа', region: 'Башкортостан', lat: 54.73, lng: 55.97 },
  { id: 29, city: 'Омск', region: 'Омская область', lat: 54.99, lng: 73.37 },
];

const Index = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredBranch, setHoveredBranch] = useState<number | null>(null);

  const filteredBranches = branches.filter(
    (branch) =>
      branch.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const regions = Array.from(new Set(branches.map(b => b.region)));

  const convertToSvgCoords = (lat: number, lng: number) => {
    const minLat = 41;
    const maxLat = 70;
    const minLng = 19;
    const maxLng = 180;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * 1000;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 600;
    
    return { x, y };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-4 lg:p-8">
        <header className="mb-8 animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-2">
            Филиалы по России
          </h1>
          <p className="text-lg text-slate-600">
            Интерактивная карта с {branches.length} точками присутствия
          </p>
        </header>

        <div className="grid lg:grid-cols-[350px_1fr] gap-6">
          <aside className="space-y-4">
            <Card className="animate-fade-in">
              <CardContent className="pt-6">
                <div className="relative mb-4">
                  <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input
                    placeholder="Поиск по городу или региону..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Регионы</h3>
                  <div className="flex flex-wrap gap-2">
                    {regions.slice(0, 5).map((region) => (
                      <Badge key={region} variant="secondary" className="text-xs">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>

                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-2">
                    {filteredBranches.map((branch) => (
                      <button
                        key={branch.id}
                        onClick={() => setSelectedBranch(branch)}
                        onMouseEnter={() => setHoveredBranch(branch.id)}
                        onMouseLeave={() => setHoveredBranch(null)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          selectedBranch?.id === branch.id
                            ? 'bg-primary text-white shadow-md'
                            : hoveredBranch === branch.id
                            ? 'bg-slate-100'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-medium">{branch.city}</div>
                            <div className={`text-sm ${
                              selectedBranch?.id === branch.id ? 'text-white/80' : 'text-slate-500'
                            }`}>
                              {branch.region}
                            </div>
                          </div>
                          <Icon 
                            name="MapPin" 
                            size={18} 
                            className={selectedBranch?.id === branch.id ? 'text-white' : 'text-primary'}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </aside>

          <main className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-slate-100 to-slate-200">
                  <svg
                    viewBox="0 0 1000 600"
                    className="w-full h-auto"
                    style={{ minHeight: '600px' }}
                  >
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    <rect width="1000" height="600" fill="#f8fafc" />
                    
                    <path
                      d="M 50 300 Q 150 250 250 280 T 450 300 Q 550 320 650 300 T 850 280 Q 900 290 950 300 L 950 100 Q 900 120 850 100 T 650 80 Q 550 60 450 80 T 250 100 Q 150 120 50 100 Z"
                      fill="#e2e8f0"
                      stroke="#cbd5e1"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                    
                    <path
                      d="M 50 450 Q 150 420 250 440 T 450 460 Q 550 480 650 460 T 850 440 Q 900 450 950 460 L 950 600 L 50 600 Z"
                      fill="#e2e8f0"
                      stroke="#cbd5e1"
                      strokeWidth="1"
                      opacity="0.3"
                    />

                    {branches.map((branch) => {
                      const { x, y } = convertToSvgCoords(branch.lat, branch.lng);
                      const isSelected = selectedBranch?.id === branch.id;
                      const isHovered = hoveredBranch === branch.id;

                      return (
                        <g
                          key={branch.id}
                          onClick={() => setSelectedBranch(branch)}
                          onMouseEnter={() => setHoveredBranch(branch.id)}
                          onMouseLeave={() => setHoveredBranch(null)}
                          className="cursor-pointer"
                          style={{ transition: 'all 0.3s ease' }}
                        >
                          {isSelected && (
                            <circle
                              cx={x}
                              cy={y}
                              r="16"
                              fill="#0EA5E9"
                              opacity="0.2"
                              className="animate-pulse-marker"
                            />
                          )}
                          
                          <circle
                            cx={x}
                            cy={y}
                            r={isSelected ? "8" : isHovered ? "7" : "6"}
                            fill={isSelected ? "#0EA5E9" : "#1A1F2C"}
                            stroke="white"
                            strokeWidth="2"
                            filter={isSelected ? "url(#glow)" : undefined}
                            style={{ transition: 'all 0.2s ease' }}
                          />
                          
                          {(isSelected || isHovered) && (
                            <g>
                              <rect
                                x={x + 12}
                                y={y - 18}
                                width={branch.city.length * 8 + 16}
                                height="32"
                                fill="white"
                                stroke="#cbd5e1"
                                strokeWidth="1"
                                rx="4"
                                opacity="0.95"
                              />
                              <text
                                x={x + 20}
                                y={y - 6}
                                fontSize="12"
                                fontWeight="600"
                                fill="#1A1F2C"
                              >
                                {branch.city}
                              </text>
                              <text
                                x={x + 20}
                                y={y + 6}
                                fontSize="10"
                                fill="#64748b"
                              >
                                {branch.region}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {selectedBranch && (
                    <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-auto lg:w-96">
                      <Card className="shadow-xl animate-fade-in">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                                {selectedBranch.city}
                              </h3>
                              <p className="text-slate-600">{selectedBranch.region}</p>
                            </div>
                            <button
                              onClick={() => setSelectedBranch(null)}
                              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                              <Icon name="X" size={20} className="text-slate-600" />
                            </button>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-3 text-slate-700">
                              <Icon name="MapPin" size={18} className="text-primary" />
                              <span className="text-sm">
                                {selectedBranch.lat.toFixed(2)}°N, {selectedBranch.lng.toFixed(2)}°E
                              </span>
                            </div>

                            {selectedBranch.info && (
                              <div className="flex items-center gap-3 text-slate-700">
                                <Icon name="Info" size={18} className="text-primary" />
                                <span className="text-sm">{selectedBranch.info}</span>
                              </div>
                            )}

                            <div className="flex items-center gap-3 text-slate-700">
                              <Icon name="Phone" size={18} className="text-primary" />
                              <span className="text-sm">+7 (800) 123-45-67</span>
                            </div>

                            <div className="flex items-center gap-3 text-slate-700">
                              <Icon name="Mail" size={18} className="text-primary" />
                              <span className="text-sm">info@company.ru</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
