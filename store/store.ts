import { Subscription } from '@/types/Subscription';
import {create} from 'zustand';

export type LanguageSupported=
    | "en"
    | "es"
    |"de"
    |"fr"
    |"te"
    |"ta"|"ml"|"ko"|"kn"|"ja"|"gu"|"de"|"bn"|"hi"

export const LanguageSupportedMap: Record<LanguageSupported, string> = {
    "en": "English",
    "es": "Spanish",
    "de": "German",
    "fr": "French",
    "te": "Telugu",
    "ta": "Tamil",
    "ml": "Malayalam",
    "ko": "Korean",
    "kn": "Kannada",
    "ja": "Japanese",
    "gu": "Gujarati",
    "bn": "Bengali",
    "hi": "Hindi"
};

interface SubscriptionState{
    subscription : Subscription | null;
    setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: null,
    setSubscription: (subscription) => set({subscription}),
}));    
