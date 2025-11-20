import { supabase } from "../lib/supabase";
import type { Event, News, Faq } from "../types";

export async function fetchEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });
  if (error) throw new Error(error.message);
  return data as Event[];
}

export async function fetchNews(): Promise<News[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw new Error(error.message);
  return data as News[];
}

export async function fetchFaq(): Promise<Faq[]> {
  const { data, error } = await supabase
    .from("faq")
    .select("*")
    .order("id", { ascending: true });
  if (error) throw new Error(error.message);
  return data as Faq[];
}

export async function fetchUpcomingEvents(limit = 10): Promise<Event[]> {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const nowTime = `${hh}:${mm}`;

  const orFilter = `and(date.eq.${todayStr},time.gte.${nowTime}),date.gt.${todayStr}`;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .or(orFilter)
    .order("date", { ascending: true })
    .order("time", { ascending: true })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data as Event[];
}

export async function fetchUpcomingEventsNoLimit(): Promise<Event[]> {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const nowTime = `${hh}:${mm}`;

  const orFilter = `and(date.eq.${todayStr},time.gte.${nowTime}),date.gt.${todayStr}`;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .or(orFilter)
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (error) throw new Error(error.message);
  return data as Event[];
}

export async function fetchFavouriteEvents(): Promise<Event[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: favs, error: favErr } = await supabase
    .from("event_favourites")
    .select("event_id")
    .eq("user_id", user.id);

  if (favErr || !favs) return [];

  const ids = favs.map((f) => f.event_id);
  if (ids.length === 0) return [];

  const { data: events, error: evErr } = await supabase
    .from("events")
    .select("*")
    .in("id", ids);

  if (evErr || !events) return [];

  return events as Event[];
}
