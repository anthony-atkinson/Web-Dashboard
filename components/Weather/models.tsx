import {Expose, Type, Transform} from "class-transformer";
import {format} from "date-fns";

export interface State {
  latitude: number,
  longitude: number,
  error: string,
  weather: AllInOneWeather,
  weatherUpdateTimeout: any,
}

export class AllInOneWeather {
  @Expose()
  timezone: string | undefined;

  @Expose()
  timezone_offset: number | undefined;

  @Expose()
  @Type( () => CurrentWeather)
  current: CurrentWeather | undefined;

  @Expose()
  @Type( () => WeatherDaily)
  daily: WeatherDaily[] = [];

  @Expose()
  @Type( () => WeatherAlert)
  alerts: WeatherAlert[] = [];
}

export class WeatherAlert {
  @Expose()
  sender_name: string = "";

  @Expose()
  event: string = "";

  @Expose()
  @Transform( ({value}) => new Date(value * 1000))
  start: Date = new Date();

  @Expose()
  @Transform( ({value}) => new Date(value * 1000))
  end: Date = new Date();

  @Expose()
  description: string = "";
}

// This is the one-call object
export class WeatherDaily {
  @Expose()
  @Type( () => Date )
  @Transform( ({value}) => new Date(value * 1000))
  dt: Date | undefined;

  @Expose()
  @Type( () => Date )
  @Transform( ({value}) => new Date(value * 1000))
  sunrise: Date | undefined;

  @Expose()
  @Type( () => Date )
  @Transform( ({value}) => new Date(value * 1000))
  sunset: Date | undefined;

  @Expose()
  @Type( () => WeatherDailyTemp )
  temp: WeatherDailyTemp | undefined;

  @Expose()
  @Type( () => WeatherDailyFeelsLikeTemp )
  feels_like: WeatherDailyFeelsLikeTemp[] = [];

  @Type( () => WeatherPressure )
  @Transform(({value}) => new WeatherPressure(value))
  @Expose()
  pressure: WeatherPressure = new WeatherPressure(0);

  @Expose()
  humidity: number | undefined;

  @Type( () => WeatherTemp )
  @Transform(({value}) => new WeatherTemp(value))
  @Expose()
  dew_point : WeatherTemp = new WeatherTemp(0);

  @Expose()
  wind_speed: number | undefined;

  @Expose()
  wind_deg: number | undefined;

  @Expose()
  @Type( () => WeatherDescription )
  weather: WeatherDescription[] = [];

  @Expose()
  clouds: number | undefined;

  @Expose()
  pop: number | undefined;

  @Expose()
  uvi: number | undefined;

  getWeatherDay = () => {
    if (this.dt) {
      return format(this.dt, "EEE");
    }
    return 'N/A'
  }
}

export class WeatherDailyFeelsLikeTemp {
  @Type( () => WeatherTemp )
  @Transform(({value}) => new WeatherTemp(value))
  @Expose()
  day : WeatherTemp = new WeatherTemp(0);

  @Type( () => WeatherTemp )
  @Transform(({value}) => new WeatherTemp(value))
  @Expose()
  night : WeatherTemp = new WeatherTemp(0);

  @Type( () => WeatherTemp )
  @Transform(({value}) => new WeatherTemp(value))
  @Expose()
  eve : WeatherTemp = new WeatherTemp(0);

  @Type( () => WeatherTemp )
  @Transform(({value}) => new WeatherTemp(value))
  @Expose()
  morn : WeatherTemp = new WeatherTemp(0);
}

export class WeatherDailyTemp {
  @Type( () => WeatherTemp )
  @Transform(({value}) => new WeatherTemp(value))
  @Expose()
  day : WeatherTemp = new WeatherTemp(0);

  @Type( () => WeatherTemp )
  @Transform(({value}) => new WeatherTemp(value))
  @Expose()
  min : WeatherTemp = new WeatherTemp(0);

  @Type( () => WeatherTemp )
  @Transform(({value}) => new WeatherTemp(value))
  @Expose()
  max : WeatherTemp = new WeatherTemp(0);

  @Type( () => WeatherTemp )
  @Transform(({value}) => new WeatherTemp(value))
  @Expose()
  night : WeatherTemp = new WeatherTemp(0);

  @Type( () => WeatherTemp )
  @Transform(({value}) => new WeatherTemp(value))
  @Expose()
  eve : WeatherTemp = new WeatherTemp(0);

  @Type( () => WeatherTemp )
  @Transform(({value}) => new WeatherTemp(value))
  @Expose()
  morn : WeatherTemp = new WeatherTemp(0);
}

export class WeatherDescription {
  @Expose()
  main: string | undefined;

  @Expose()
  description: string | undefined;

  @Expose()
  icon: string = '01d';

  getIconUri = () => {
    return "https://openweathermap.org/img/w/" + this.icon + ".png";
  };
}

export class CurrentWeather {
  @Expose()
  @Type( () => Date )
  @Transform( ({value}) => new Date(value * 1000))
  dt: Date | undefined;

  @Expose()
  @Type( () => Date )
  @Transform( ({value}) => new Date(value * 1000))
  sunrise: Date | undefined;

  @Expose()
  @Type( () => Date )
  @Transform( ({value}) => new Date(value * 1000))
  sunset: Date | undefined;

  @Type( () => WeatherTemp )
  @Transform(({value}) => new WeatherTemp(value))
  @Expose()
  temp : WeatherTemp = new WeatherTemp(0);

  @Type( () => WeatherTemp )
  @Transform(({value}) => new WeatherTemp(value))
  @Expose()
  feels_like : WeatherTemp = new WeatherTemp(0);

  @Type( () => WeatherPressure )
  @Transform(({value}) => new WeatherPressure(value))
  @Expose()
  pressure: WeatherPressure = new WeatherPressure(0);

  @Expose()
  humidity: number | undefined;

  @Type( () => WeatherTemp )
  @Transform(({value}) => new WeatherTemp(value))
  @Expose()
  dew_point : WeatherTemp = new WeatherTemp(0);

  @Expose()
  uvi: number | undefined;

  @Expose()
  clouds: number | undefined;

  @Expose()
  visibility: number | undefined;

  @Expose()
  wind_speed: number | undefined;

  @Expose()
  wind_deg: number | undefined;

  @Expose()
  @Type( () => WeatherDescription )
  weather: WeatherDescription[] = [];
}

export class WeatherPressure {
  constructor(hPaValue : number) {
    this.hPa = hPaValue;
  }

  @Expose()
  hPa: number = 0;
}

export class WeatherTemp {
  constructor(kelvinVal : number) {
    this.kelvin = kelvinVal;
  }

  @Expose()
  kelvin: number = 0

  getCelsius = () => {
    return (this.kelvin - 273.15).toFixed(2);
  }

  getFahrenheit = () => {
    return (Number(this.getCelsius()) * (9/5) + 32).toFixed(0);
  };
}