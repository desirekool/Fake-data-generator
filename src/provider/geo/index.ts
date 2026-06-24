import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class GeoProvider extends BaseProvider {
  __provider__ = "geo";

  protected data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
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
    return this.latlng();
  }

  location_on_land(): { lat: number; lng: number; name: string } {
    const city = this.randomElement(this.data.cities ?? []);
    return {
      lat: city.lat,
      lng: city.lng,
      name: city.name,
    };
  }
}
