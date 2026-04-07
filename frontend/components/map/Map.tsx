'use client';

import type { Map as MapboxMap } from "mapbox-gl";
import { useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import MarkerRole from "./Marker";
import PopupRole from "./PopUp";

const DEFAULT_CENTER: [number, number] = [-35.20551753609717, -5.832075313805946];
const DEFAULT_ZOOM = 12;


interface Local {
    id: number;
    name: string;
    time: string;
    latitude: number;
    longitude: number;
    category: string;
}   

interface MapProps {
    locais: Local[];
}

export default function Map({ locais }: MapProps) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        let map: MapboxMap | null = null;
        let popupRoots: Root[] = [];
        let markerRoots: Root[] = [];

        let isMounted = true; 
        mapContainerRef.current.innerHTML = "";

        const initMap = async () => {
            const mapboxglModule = await import("mapbox-gl");
            const mapboxgl = mapboxglModule.default || mapboxglModule;

            if (!isMounted) return;

            const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
            if (!token) {
                console.error("NEXT_PUBLIC_MAPBOX_TOKEN não está definido. Configure-o em .env.local.");
                return;
            }

            mapboxgl.accessToken = token;

            map = new mapboxgl.Map({
                container: mapContainerRef.current!,
                style: "mapbox://styles/mapbox/streets-v12",
                center: DEFAULT_CENTER,
                zoom: DEFAULT_ZOOM,
            });

            map.addControl(new mapboxgl.NavigationControl(), "top-right");

            const bounds = new mapboxgl.LngLatBounds();

            locais.forEach((local) => {
                const markerContainer = document.createElement("div");
                const markerRoot = createRoot(markerContainer);
                markerRoot.render(<MarkerRole category={local.category} />);
                markerRoots.push(markerRoot);

                const popupContainer = document.createElement("div");
                const popupRoot = createRoot(popupContainer);
                popupRoot.render(<PopupRole nomeLocal={local.name} horario={local.time} />);
                popupRoots.push(popupRoot);

                const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
                    .setDOMContent(popupContainer);

                new mapboxgl.Marker(markerContainer)
                    .setLngLat([local.longitude, local.latitude])
                    .setPopup(popup)
                    .addTo(map!);

                bounds.extend([local.longitude, local.latitude]);
            });

            if (locais.length > 0) {
                map.fitBounds(bounds, {
                    padding: 60,
                    maxZoom: 15,
                    duration: 1000
                });
            }
            
        };

        initMap();

        return () => {
            isMounted = false;

            setTimeout(() => {
                popupRoots.forEach((root) => root.unmount());
                markerRoots.forEach((root) => root.unmount());
            }, 0);
            
            if (map) {
                map.remove();
            } else if (mapContainerRef.current) {
                mapContainerRef.current.innerHTML = ""; 
            }
        };
    }, [locais]);

    return (
        <div className="flex h-full w-full items-stretch">
            <div ref={mapContainerRef} className="h-[calc(100vh-4rem)] w-full" />
        </div>
    );
}
