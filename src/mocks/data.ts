export type Role = "admin" | "lead" | "guide";
export type BookingStatus = "Pending" | "Matching" | "Confirmed";
export type GuideRank = "Trial" | "Super" | "Professional";

export type Guide = {
  id: string;
  name: string;
  star5Count: number;
  rank: GuideRank;
  profile: {
    education: string;
    yearsAsGuide: number;
    specialties: string[];
    personality: string;
  };
};

export type Booking = {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  date: string;
  pax: number;
  status: BookingStatus;
  intentSnapshot: string[];
  guestBrief: string;
  salesAmountUsd: number;
  candidateGuideIds: [string, string];
  acceptedGuideIds: string[];
  confirmedGuideId?: string;
};

export const guides: Guide[] = [
  {
    id: "g-1",
    name: "Ami Kato",
    star5Count: 2,
    rank: "Trial",
    profile: {
      education: "Waseda University",
      yearsAsGuide: 1,
      specialties: ["Food", "Neighborhood Walks"],
      personality: "Warm and conversational"
    }
  },
  {
    id: "g-2",
    name: "Daisuke Mori",
    star5Count: 8,
    rank: "Super",
    profile: {
      education: "Keio University",
      yearsAsGuide: 4,
      specialties: ["History", "Architecture"],
      personality: "Calm and precise"
    }
  },
  {
    id: "g-3",
    name: "Reina Sato",
    star5Count: 15,
    rank: "Professional",
    profile: {
      education: "Sophia University",
      yearsAsGuide: 7,
      specialties: ["Culture", "Art", "High-touch Service"],
      personality: "Elegant and intuitive"
    }
  }
];

export const bookings: Booking[] = [
  {
    id: "bk-101",
    guestName: "Michael G.",
    guestEmail: "michael@example.com",
    guestPhone: "+1-202-100-2001",
    date: "2026-04-12",
    pax: 4,
    status: "Pending",
    intentSnapshot: ["#FoodFocus", "#SlowPace", "#OffBeatenPath"],
    guestBrief: "Prefers hidden alleys, no rushed schedule, and casual izakaya stops.",
    salesAmountUsd: 640,
    candidateGuideIds: ["g-2", "g-3"],
    acceptedGuideIds: []
  },
  {
    id: "bk-102",
    guestName: "Lina P.",
    guestEmail: "lina@example.com",
    guestPhone: "+65-9000-3210",
    date: "2026-04-15",
    pax: 2,
    status: "Matching",
    intentSnapshot: ["#HistoryDepth", "#Culture", "#FlexibleFlow"],
    guestBrief: "Wants layered historical context with room for spontaneous detours.",
    salesAmountUsd: 480,
    candidateGuideIds: ["g-1", "g-2"],
    acceptedGuideIds: ["g-2"]
  },
  {
    id: "bk-103",
    guestName: "Sofia R.",
    guestEmail: "sofia@example.com",
    guestPhone: "+34-612-333-444",
    date: "2026-04-21",
    pax: 4,
    status: "Confirmed",
    intentSnapshot: ["#FamilyFriendly", "#MainAttractions", "#ModeratePace"],
    guestBrief: "Family with one senior member; smooth pacing and frequent rest points.",
    salesAmountUsd: 720,
    candidateGuideIds: ["g-2", "g-3"],
    acceptedGuideIds: ["g-2", "g-3"],
    confirmedGuideId: "g-3"
  }
];

export const guideAvailabilityById: Record<string, string[]> = {
  "g-1": ["2026-04-10", "2026-04-11", "2026-04-15"],
  "g-2": ["2026-04-12", "2026-04-15", "2026-04-18", "2026-04-21"],
  "g-3": ["2026-04-12", "2026-04-17", "2026-04-21", "2026-04-23"]
};

export function computeGuideCompensationPerHour(rank: GuideRank, pax: number): number {
  const baseRateByRank: Record<GuideRank, number> = {
    Trial: 20,
    Super: 25,
    Professional: 30
  };

  if (pax <= 4) return baseRateByRank[rank];
  return baseRateByRank[rank] + (pax - 4) * 2;
}
