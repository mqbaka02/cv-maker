import { useState, useEffect, useRef, useCallback, RefObject } from 'react';

type ElementId = string | number;

interface UseMultipleOnScreenReturn<T extends HTMLElement> {
    setRef: (id: ElementId) => (el: T | null) => void;
    visibleIds: Record<string, boolean>;
    elementsRef: RefObject<Map<ElementId, T>>;
}

export function useMultipleOnScreen<T extends HTMLElement = HTMLElement>(
    options?: IntersectionObserverInit
): UseMultipleOnScreenReturn<T> {
    const [visibleIds, setVisibleIds] = useState<Record<string, boolean>>({});
    const elementsRef = useRef<Map<ElementId, T>>(new Map());
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Extract primitive options so inline objects don't recreate the observer
    const { root = null, rootMargin = '0px', threshold = 0 } = options ?? {};

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                setVisibleIds((prev) => {
                    let hasChanged = false;
                    const next = { ...prev };

                    entries.forEach((entry) => {
                        const id = (entry.target as HTMLElement).dataset.observeId;
                        if (id && prev[id] !== entry.isIntersecting) {
                            next[id] = entry.isIntersecting;
                            hasChanged = true;
                        }
                    });

                    // Return the exact same reference if nothing changed
                    return hasChanged ? next : prev;
                });
            },
            { root, rootMargin, threshold }
        );

        elementsRef.current.forEach((el) => {
            observerRef.current?.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, [root, rootMargin, threshold]);

    const setRef = useCallback(
        (id: ElementId) => (el: T | null) => {
            const observer = observerRef.current;
            const prevEl = elementsRef.current.get(id);

            if (prevEl && observer) {
                observer.unobserve(prevEl);
            }

            if (el) {
                el.dataset.observeId = String(id);
                elementsRef.current.set(id, el);
                observer?.observe(el);
            } else {
                elementsRef.current.delete(id);
            }
        },
        []
    );

    return { setRef, visibleIds, elementsRef };
}
