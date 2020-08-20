export interface City {
  city: string;
  city_ascii: string;
  lat: number;
  lng: number;
  country: string;
  iso2: string | null;
  iso3: string | null;
  admin_name: string | null;
  capital: string | null;
  population: number | null;
  id: number;
}

export interface Location {
  lat: number;
  lng: number;
}
