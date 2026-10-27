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
    instagram: 'https://www.instagram.com/',
    youtube: 'https://www.youtube.com/'
  },

  // Optional: URL that receives booking form submissions as a POST
  // (e.g. a Google Apps Script web app — see docs/google-apps-script.js).
  // Leave empty to send bookings over WhatsApp only.
  formEndpoint: '',

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

  // Review videos / posts on YouTube and Instagram.
  // platform: 'youtube' or 'instagram'
  reviews: [
    { platform: 'youtube', title: 'Client review video', url: 'https://www.youtube.com/', thumbnail: 'assets/images/reviews/review-1.jpg' },
    { platform: 'instagram', title: 'Transformation story', url: 'https://www.instagram.com/', thumbnail: 'assets/images/reviews/review-2.jpg' },
    { platform: 'youtube', title: 'Client review video', url: 'https://www.youtube.com/', thumbnail: 'assets/images/reviews/review-3.jpg' }
  ]
};
