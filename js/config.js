/*
 * nutrilean.in — site settings
 * Edit this file to update contact details, the offer banner, social links,
 * client transformation photos and review links. No other code changes needed.
 */
window.NUTRILEAN = {
  brand: 'nutrilean.in',
  coachName: 'Piyush',

  // WhatsApp number with country code, digits only (e.g. 919876543210)
  whatsappNumber: '919595985678',
  phoneDisplay: '+91 95959 85678',
  email: 'hello@nutrilean.in',

  // Top announcement bar + offer text on buttons. Set active: false to hide.
  offer: {
    active: true,
    banner: 'Diwali Sale is live — 50% OFF on your first counselling',
    cta: 'Book now & get 50% off'
  },

  social: {
    instagram: 'https://www.instagram.com/nutrilean.in',
    youtube: '' // empty hides every YouTube link; add the channel URL to show them again
  },

  // Optional: URL that receives booking form submissions as a POST
  // (e.g. a Google Apps Script web app — see docs/google-apps-script.js).
  // Leave empty to send bookings over WhatsApp only.
  formEndpoint: '',

  // Consultation slots shown on the booking page.
  // days: 0 = Sunday … 6 = Saturday. Times are 24-hour 'HH:MM'.
  // booked: 'Booked' / 'Full' — that slot always shows as taken.
  // randomBooked: chance (0–1) that an open slot also shows as booked. The pick
  // is fixed per date, so a visitor sees the same slots on reload. At least
  // minOpen slots per day always stay open.
  slots: {
    daysAhead: 14,
    randomBooked: 0.2,
    minOpen: 2,
    schedule: [
      {
        days: [4, 5, 6], // Thursday, Friday, Saturday
        times: [
          { time: '09:30' },
          { time: '10:30', booked: 'Booked' },
          { time: '11:30', booked: 'Booked' },
          { time: '12:30', booked: 'Booked' },
          { time: '13:30' },
          { time: '15:00' },
          { time: '16:00' },
          { time: '18:00', booked: 'Full' },
          { time: '20:00', booked: 'Full' }
        ]
      },
      {
        days: [0], // Sunday
        times: [
          { time: '10:00' },
          { time: '11:00' },
          { time: '12:00' },
          { time: '13:00', booked: 'Full' },
          { time: '17:00', booked: 'Full' },
          { time: '18:00', booked: 'Full' },
          { time: '20:00', booked: 'Full' }
        ]
      }
    ]
  },

  // Client transformation photos. Use before/after for a side-by-side card,
  // or a single image. Upload images to the given path.
  transformations: [
    {
      name: 'Om Shedage',
      result: '38 kg fat loss in 5 months',
      before: { image: 'assets/images/transformations/om-shedage-before.webp', label: '110 kg' },
      after: { image: 'assets/images/transformations/om-shedage-after.webp', label: '72 kg' }
    },
    {
      name: 'Ganesh Gauransh Shivatare',
      result: '21 kg fat loss in 90 days',
      before: { image: 'assets/images/transformations/gauransh-shivatare-before.webp' },
      after: { image: 'assets/images/transformations/gauransh-shivatare-after.webp' }
    }
    // Single photo instead of before/after:
    // { name: 'Client name', result: 'Lost 12 kg in 4 months', image: 'assets/images/transformations/client-2.jpg' }
  ],

  // Client video stories (shown in "Hear it from our clients").
  // video: compressed .mp4 in assets/videos/, poster: cover image shown before play.
  videos: [
    { name: 'Om Shedage', result: '38 kg fat loss in 5 months', video: 'assets/videos/om-shedage.mp4', poster: 'assets/images/videos/om-shedage.webp' },
    { name: 'Prathamesh Jadhav', result: '25 kg fat loss in 5 months', video: 'assets/videos/prathamesh-jadhav.mp4', poster: 'assets/images/videos/prathamesh-jadhav.webp' },
    { name: 'Akshay Kadekar', result: '23 kg fat loss in 5 months — Mr. Pune Shree 2025 bodybuilding prep', video: 'assets/videos/akshay-kadekar.mp4', poster: 'assets/images/videos/akshay-kadekar.webp' },
    { name: 'Gauransh Shivatare', result: '21 kg fat loss in 90 days', video: 'assets/videos/gauransh-shivatare.mp4', poster: 'assets/images/videos/gauransh-shivatare.webp' },
    { name: 'Niranjan Ingale', result: '18 kg fat loss in 4 months', video: 'assets/videos/niranjan-ingale.mp4', poster: 'assets/images/videos/niranjan-ingale.webp' },
    { name: 'Umesh Lohar', result: '18 kg fat loss in 4 months', video: 'assets/videos/umesh-lohar.mp4', poster: 'assets/images/videos/umesh-lohar.webp' },
    { name: 'Prathamesh Yadav', result: '15 kg fat loss in 3 months', video: 'assets/videos/prathamesh-yadav.mp4', poster: 'assets/images/videos/prathamesh-yadav.webp' },
    { name: 'Prajwal Wedpathak', result: '11 kg fat loss in 2 months', video: 'assets/videos/prajwal-wedpathak.mp4', poster: 'assets/images/videos/prajwal-wedpathak.webp' },
    { name: 'Omkar Kumkar', result: '7 kg weight loss in 9 days', video: 'assets/videos/omkar-kumkar.mp4', poster: 'assets/images/videos/omkar-kumkar.webp' },
    { name: 'Rohit Barage', result: '6 kg fat loss in 1 month + hair fall recovery', video: 'assets/videos/rohit-barage.mp4', poster: 'assets/images/videos/rohit-barage.webp' },
    { name: 'Miss Zatale', result: 'Her first counselling experience', video: 'assets/videos/zatale-first-counselling.mp4', poster: 'assets/images/videos/zatale-first-counselling.webp' }
  ]
};
