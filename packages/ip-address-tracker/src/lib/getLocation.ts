export type ApiResponse = {
    ip: string
    isp: string
    as: {
        asn: number
        name: string
        route: string
        domain: string
        type: string
    }
    location: {
        country: string
        timezone: string
        postalCode: string
        lat: number
        lng: number
        city: string
        region: string
        geonameId: number
    }
}


export async function getLocation(params: URLSearchParams): Promise<ApiResponse> {
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?${params.toString()}`)

    if (!response.ok) {
        throw response
    }

    return response.json() as Promise<ApiResponse>
}