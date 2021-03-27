export enum ACTION_TYPES {
  WEATHER_LOCATION= 'weather_location' ,
}

export interface Action {
  show: boolean,
  content: string,
  confirmButtonText: string,
}

export function reducer(state: any, action: ACTION_TYPES) {
  switch (action) {
    case ACTION_TYPES.WEATHER_LOCATION:
      return {
        content: "We are about to request location info from you. This location information " +
                 "will only be used for getting weather information. Click the \"Okay\" button " +
                 "below to allow the app to request information. Thank you :)",
        confirmButtonText: 'Okay',
        show: true
      }
    default:
      throw `Action type ${action} not mapped for modal!`;
  }
}