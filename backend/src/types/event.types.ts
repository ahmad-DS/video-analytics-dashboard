export const EVENT_TYPES = [
  "view",
  "click",
  "add_to_cart",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export interface CreateEventBody {
  videoId: number;
  eventType: EventType;
}