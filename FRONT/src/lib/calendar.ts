// « Ajouter au calendrier » pour les lieux éphémères.
// Le fichier .ics s'ouvre dans Apple Calendrier (iPhone, Mac) et dans les agendas Android ;
// le lien Google Agenda sert à ceux qui n'utilisent que le web.
import type { Place } from '../types'
import { parseDay } from './format'

const pad = (n: number) => String(n).padStart(2, '0')
const day = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`

/** Dates « journée entière » : la fin est exclusive, donc le lendemain du dernier jour. */
function range(place: Place) {
  const start = parseDay(place.startsAt!)
  const end = parseDay(place.endsAt ?? place.startsAt!)
  end.setDate(end.getDate() + 1)
  return { start: day(start), end: day(end) }
}

const escape = (text: string) =>
  text.replace(/\\/g, '\\\\').replace(/([;,])/g, '\\$1').replace(/\n/g, '\\n')

export function downloadIcs(place: Place) {
  const { start, end } = range(place)
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//UNSPYR//Site//FR',
    'BEGIN:VEVENT',
    `UID:${place.id}@unspyr`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${escape(place.title)}`,
    `LOCATION:${escape(place.address)}`,
    `DESCRIPTION:${escape(`${place.description}\n${place.hours}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `${place.id}.ics`
  link.click()
  // Safari annule le téléchargement si l'URL est libérée trop tôt
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function googleCalendarUrl(place: Place) {
  const { start, end } = range(place)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: place.title,
    dates: `${start}/${end}`,
    details: `${place.description}\n${place.hours}`,
    location: place.address,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}
