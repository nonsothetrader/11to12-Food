
'use client';

import { useState, useCallback } from 'react';
import type { WeeklyMenuItem } from '@/lib/types';
import { menuByDate as initialMenu } from '@/lib/data';
import { toDateString } from '@/lib/utils';

// This is our in-memory "database" for the menu.
// In a real app, this would be replaced by API calls to a proper backend.
let menuStore = new Map<string, WeeklyMenuItem>(initialMenu);
const listeners = new Set<() => void>();

const notifyListeners = () => {
    listeners.forEach(listener => listener());
};

const setMenuForDate = (date: Date, meal: WeeklyMenuItem | null) => {
    const dateString = toDateString(date);
    if (meal) {
        menuStore.set(dateString, meal);
    } else {
        menuStore.delete(dateString);
    }
    notifyListeners();
};

// This custom hook allows components to subscribe to changes in the menu store.
export function useMenuStore() {
    const [menu, setMenu] = useState(new Map(menuStore));

    const handleStoreChange = useCallback(() => {
        setMenu(new Map(menuStore));
    }, []);

    useState(() => {
        listeners.add(handleStoreChange);
        return () => {
            listeners.delete(handleStoreChange);
        };
    });
    
    return {
        menu,
        setMenuForDate
    };
}
