import { apiClient } from "@/api/client";

export type EventRole = "OWNER" | "MEMBER";

export interface EventSummary {
  eventId: number;
  eventName: string;
  eventDate?: string | null;
  coverImageUrl?: string | null;
  photoCount?: number;
  participantCount?: number;
  role: EventRole;
}

export const getMyEvents = async (): Promise<EventSummary[]> => {
  const response = await apiClient.get<EventSummary[]>("/events/my");

  return response.data;
};
