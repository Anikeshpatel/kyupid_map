import mapboxgl from 'mapbox-gl';

export const BASE_URL = 'https://kyupid-api.vercel.app/api'
export const AREAS_URL = `${BASE_URL}/areas`
export const USERS_URL = `${BASE_URL}/users`


export const MAPGL_ACCESS_TOKEN = 'pk.eyJ1IjoiYW5pa2VzaDE5OTkiLCJhIjoiY2t5YjEzbmRvMGF6cDJ2cW9tajd3MWZpZiJ9.C_1dgwb8mskT-UuSn5dhWA'
mapboxgl.accessToken = MAPGL_ACCESS_TOKEN

export const REVENUE_COLOR_MAP = {
  high: 'green',
  medium: 'orange',
  low: 'red'
}
