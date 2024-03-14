/// <reference types="vite/client" />

module Lelflet {
    type LatLng = { lat: number; lng: number } | [number, number]
    type MapOptions = Partial<{
        center: [number, number],
        zoom: number;
        preferCanvas: boolean;
    }>

    class Marker {
        addTo(map: Map): this
        setLatLng(latlng: LatLng): this
    }

    class Layer {
        addTo(map: Map): this
    }
    class Map {
        setView(latlag: LatLng, zoom: number): this;
        setZoom(delta: number): this;
        remove(): this;
        locate(): this;
    }
    class Icon { }
}

// eslint-disable-next-line no-var
declare var L: {
    map: (el: string | HTMLElement, ...options: unknown[]) => Lelflet.Map;
    map: (el: string | HTMLLIElement, options: Record<string, unknown>) => Lelflet.Map;
    marker: (value: [number, number], options?: {
        icon?: Lelflet.Icon,
        title?: string,
        alt?: string,
    }) => Lelflet.Marker,
    tileLayer: (layer: string, options?: {
        attribution?: string;
    }) => Lelflet.Layer;
    icon(options: {
        iconUrl: string,
        shadowUrl?: string,
        // size of the icon
        iconSize?: [number, number],
        shadowSize?: [number, number], // size of the shadow
        iconAnchor?: [number, number], // point of the icon which will correspond to marker's location
        shadowAnchor?: [number, number], // the same for the shadow
        popupAnchor?: [number, number]
    }): Lelflet.Icon
}
