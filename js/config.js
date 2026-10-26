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

  // Client transformation photos. Upload images to the given path
  // (same file name) and they will appear automatically.
  transformations: [
    { image: 'assets/images/transformations/client-1.jpg', name: 'Client name', result: 'Lost 12 kg in 4 months' },
    { image: 'assets/images/transformations/client-2.jpg', name: 'Client name', result: 'Lost 9 kg in 3 months' },
    { image: 'assets/images/transformations/client-3.jpg', name: 'Client name', result: 'Lost 15 kg in 6 months' },
    { image: 'assets/images/transformations/client-4.jpg', name: 'Client name', result: 'Lost 7 kg in 2 months' },
    { image: 'assets/images/transformations/client-5.jpg', name: 'Client name', result: 'Lost 11 kg in 4 months' },
    { image: 'assets/images/transformations/client-6.jpg', name: 'Client name', result: 'Lost 18 kg in 7 months' }
  ],

  // Review videos / posts on YouTube and Instagram.
  // platform: 'youtube' or 'instagram'
  reviews: [
    { platform: 'youtube', title: 'Client review video', url: 'https://www.youtube.com/', thumbnail: 'assets/images/reviews/review-1.jpg' },
    { platform: 'instagram', title: 'Transformation story', url: 'https://www.instagram.com/', thumbnail: 'assets/images/reviews/review-2.jpg' },
    { platform: 'youtube', title: 'Client review video', url: 'https://www.youtube.com/', thumbnail: 'assets/images/reviews/review-3.jpg' }
  ]
};
