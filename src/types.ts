export interface Wish {
  id: string;
  name: string;
  relationship: string; // e.g., 'Keluarga', 'Teman', 'Rekan Kerja', 'Tetangga'
  message: string;
  createdAt: string;
  attendance: 'hadir' | 'tidak_hadir' | 'tentatif';
}

export interface RSVP {
  id: string;
  name: string;
  phone?: string;
  attendance: 'hadir' | 'tidak_hadir';
  guestsCount: number;
  message?: string;
  createdAt: string;
}

export interface WeddingEvent {
  title: string;
  date: string; // ISO format
  time: string;
  locationName: string;
  address: string;
  mapLink: string;
}
