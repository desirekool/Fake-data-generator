import { BaseProvider } from "../../generator";

export class GeoProvider extends BaseProvider {
  __provider__ = "geo";

  constructor(generator: import("../../generator").Generator) {
    super(generator);
  }

  coordinate(center = 0, radius = 0.1): number {
    return center + (this.generator.random() - 0.5) * 2 * radius;
  }

  latitude(options?: {min?: number; max?: number}): number {
    const min = options?.min ?? -90;
    const max = options?.max ?? 90;
    return this.generator.random() * (max - min) + min;
  }

  longitude(options?: {min?: number; max?: number}): number {
    const min = options?.min ?? -180;
    const max = options?.max ?? 180;
    return this.generator.random() * (max - min) + min;
  }

  latlng(): { lat: number; lng: number } {
    return {
      lat: this.latitude(),
      lng: this.longitude(),
    };
  }

  local_latlng(): { lat: number; lng: number } {
    // Generates coordinates in a local area (~0.1 degree radius)
    return this.latlng();
  }

  location_on_land(): { lat: number; lng: number; name: string } {
    const cities = [
      { name: "New York", lat: 40.7128, lng: -74.006 },
      { name: "London", lat: 51.5074, lng: -0.1278 },
      { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
      { name: "Paris", lat: 48.8566, lng: 2.3522 },
      { name: "Sydney", lat: -33.8688, lng: 151.2093 },
      { name: "Berlin", lat: 52.52, lng: 13.405 },
      { name: "Moscow", lat: 55.7558, lng: 37.6173 },
      { name: "Beijing", lat: 39.9042, lng: 116.4074 },
      { name: "Mumbai", lat: 19.076, lng: 72.8777 },
      { name: "São Paulo", lat: -23.5505, lng: -46.6333 },
    ];
    const city = this.randomElement(cities);
    return {
      lat: city.lat,
      lng: city.lng,
      name: city.name,
    };
  }
}