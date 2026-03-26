'use client';

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import PopupRole from "./PopUp";
import MarkerRole from "./Marker";

const DEFAULT_CENTER: [number, number] = [-35.20551753609717, -5.832075313805946];
const DEFAULT_ZOOM = 12;

export default function Map() {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        let map: any;
        let popupRoot: any;
        let markerRoot: any;

        const initMap = async () => {
            const mapboxglModule = await import("mapbox-gl");
            const mapboxgl = mapboxglModule.default || mapboxglModule;

            const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
            if (!token) {
                console.error(
                "NEXT_PUBLIC_MAPBOX_TOKEN não está definido. Configure-o em .env.local."
                );
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



            const popupContainer = document.createElement("div");

            popupRoot = createRoot(popupContainer);
            popupRoot.render(<PopupRole nomeLocal="Barzinho do IMD kkk" horario="20h00" />);

            const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
                .setDOMContent(popupContainer);

            const markerContainer = document.createElement("div");
            markerRoot = createRoot(markerContainer);
            markerRoot.render(<MarkerRole />);

            new mapboxgl.Marker(markerContainer)
                .setLngLat(DEFAULT_CENTER)
                .setPopup(popup)
                .addTo(map);
        };

        initMap();

        return () => {
            if (popupRoot) popupRoot.unmount();
            if (markerRoot) markerRoot.unmount();
            if (map) map.remove();
        };
    }, []);

    return (
        <div className="flex h-full w-full items-stretch">
        <div ref={mapContainerRef} className="h-[calc(100vh-4rem)] w-full" />
        </div>
    );
}
