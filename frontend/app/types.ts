export type Step = 1 | 2 | 3;

export interface EventFormData {
  name: string;
  date: string;
  description: string;
}

export interface EventStop {
  id: string; 
  name: string;
  latitude: number;
  longitude: number;
  category?: string;
  time?: string;
}

export interface PlaceSuggestion {
  placePrediction: {
    placeId: string;
    text: {
      text: string;
    };
    structuredFormat: {
      mainText: {
        text: string;
      };
      secondaryText?: {
        text: string;
      };
    };
    types?: string[];
  };
}

export interface PlaceDetails {
  id: string;
  displayName: {
    text: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  primaryTypeDisplayName?: {
    text: string;
  };
}