/*
 * Shows a labelled placeholder for any image that hasn't been uploaded yet.
 * The label is the expected file name, so you know exactly what to upload where.
 * Loaded in <head> (not deferred) so it catches errors from the first images.
 */
window.addEventListener('error', function (e) {
  var img = e.target;
  if (!img || img.tagName !== 'IMG' || img.dataset.placeholder) return;
  img.dataset.placeholder = 'true';

  var path = img.getAttribute('src') || '';
  var w = img.getAttribute('width') || 800;
  var h = img.getAttribute('height') || 600;
  var svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
    '<rect width="100%" height="100%" fill="#e0f2fe"/>' +
    '<g fill="none" stroke="#8cc3e8" stroke-width="4" transform="translate(' + (w / 2 - 40) + ',' + (h / 2 - 60) + ')">' +
    '<rect x="0" y="0" width="80" height="60" rx="8"/><circle cx="26" cy="22" r="8"/><path d="M4 56l24-22 16 14 12-10 20 18"/></g>' +
    '<text x="50%" y="' + (h / 2 + 34) + '" text-anchor="middle" font-family="sans-serif" font-size="' + Math.max(14, w / 32) + '" fill="#3f7199">' +
    path.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</text></svg>';
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}, true);
