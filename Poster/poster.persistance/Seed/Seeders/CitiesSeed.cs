using poster.domain;

namespace poster.persistance.Seed.Seeders
{
    public static class CitiesSeed
    {

        public static List<City> Get() => new ()
        {
            new City
            {
                Name = "Warszawa",
                Places = new List<Place>
                {
                    new Place
                    {
                        Name = "Stadion Narodowy",
                        Street = "Aleja Ks. J. Poniatowskiego",
                        Building = "1"
                    },
                    new Place
                    {
                        Name = "Pałac Kultury i Nauki",
                        Street = "Plac Defilad",
                        Building = "1"
                    }
                }
            },
            new City
            {
                Name = "Kraków",
                Places = new List<Place>
                {
                    new Place
                    {
                        Name = "Wawel",
                        Street = "Wawel 5"
                    },
                    new Place
                    {
                        Name = "Rynek Główny",
                        Street = "Rynek Główny"
                    }
                }
            },
            new City
            {
                Name = "Gdańsk",
                Places = new List<Place>
                {
                    new Place
                    {
                        Name = "Brama Wyżynna",
                        Street = "Targ Węglowy"
                    },
                    new Place
                    {
                        Name = "Muzeum II Wojny Światowej",
                        Street = "Plac Władysława Bartoszewskiego 1",
                        Building = "23"
                    }
                }
            }, 
            new City
            {
                Name = "Sanok",
                Places = new List<Place>
                {
                    new Place
                    {
                        Name = "Muzeum Historyczne",
                        Street = "Rynek 15",
                        Building = "1"
                    },
                    new Place
                    {
                        Name = "Zamek Królewski",
                        Street = "Zamkowa 1",
                        Building = "1"
                    }
                }
            },
            new City
            {
                Name = "Lublin",
                Places = new List<Place>
                {
                    new Place
                    {
                        Name = "Stare City",
                        Street = "Rynek 1"
                    },
                    new Place
                    {
                        Name = "Zamek Lubelski",
                        Street = "Krakowskie Przedmieście 2"
                    }
                }
            },
            new City
            {
                Name = "Rzeszów",
                Places = new List<Place>
                {
                    new Place
                    {
                        Name = "Rynek",
                        Street = "Rynek 1"
                    },
                    new Place
                    {
                        Name = "Podkarpackie Muzeum",
                        Street = "Długa 4"
                    }
                }
            },
            new City
            {
                Name = "Poznań",
                Places = new List<Place>
                {
                    new Place
                    {
                        Name = "Stary Rynek",
                        Street = "Stary Rynek 1"
                    },
                    new Place
                    {
                        Name = "Wzgórze Przemysła",
                        Street = "Wzgórze Przemysła"
                    }
                }
            },
            new City
            {
                Name = "Sopot",
                Places = new List<Place>
                {
                    new Place
                    {
                        Name = "Molo",
                        Street = "ul. Powstańców Warszawy"
                    },
                    new Place
                    {
                        Name = "Opera Leśna",
                        Street = "ul. Moniuszki 12"
                    }
                }
            },
            new City
            {
                Name = "Katowice",
                Places = new List<Place>
                {
                    new Place
                    {
                        Name = "Spodek",
                        Street = "al. Korfantego 35"
                    },
                    new Place
                    {
                        Name = "Silesia City Center",
                        Street = "ul. Chorzowska 107"
                    }
                }
            },
            new City
            {
                Name = "Zakopane",
                Places = new List<Place>
                {
                    new Place
                    {
                        Name = "Wielka Krokiew",
                        Street = "ul. Bronisława Czecha 1"
                    },
                    new Place
                    {
                        Name = "Gubałówka",
                        Street = "ul. Gubalowska 4"
                    }
                }
            },
            new City
            {
                Name = "Gliwice",
                Places = new List<Place>
                {
                    new Place
                    {
                        Name = "Arena Gliwice",
                        Street = "ul. Akademicka 50"
                    },
                    new Place
                    {
                        Name = "Park Śląski",
                        Street = "ul. Jordana 15"
                    }
                }
            },
            new City
            {
                Name = "Wrocław",
                Places = new List<Place>
                {
                    new Place
                    {
                        Name = "Rynek",
                        Street = "Rynek 1"
                    },
                    new Place
                    {
                        Name = "Ostrów Tumski",
                        Street = "ul. Katedralna 18"
                    }
                }
            }
        };
    }
}
