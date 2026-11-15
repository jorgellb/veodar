// Line drawings of the imaging devices VeodarDental opens (20×20, 1.5px stroke, like
// the site's icons), in the order of the imaging copy: intraoral sensor, panoramic unit,
// CT scanner, intraoral camera, intraoral scanner.
export const deviceGlyphs = [
  // sensor with its cable
  '<rect x="5.5" y="3" width="9" height="11" rx="2.2"/><path d="M8 6.5h4M10 14v1.6c0 1.4-1 2.2-2.4 2.2H5"/>',
  // panoramic: the arch with its teeth
  '<path d="M2.8 7.2c1.6 6.4 12.8 6.4 14.4 0"/><path d="M4.6 10.6v2.2M7.6 12.2v2.4M10 12.7v2.4M12.4 12.2v2.4M15.4 10.6v2.2"/>',
  // CT: a volume and its slices
  '<path d="M10 2.6 16.6 6.4v7.2L10 17.4l-6.6-3.8V6.4z"/><path d="M3.4 6.4 10 10.2l6.6-3.8M10 10.2v7.2"/><path d="M6.7 8.3v6.4M13.3 8.3v6.4" opacity=".55"/>',
  // camera
  '<rect x="2.5" y="6" width="15" height="10.5" rx="2.2"/><circle cx="10" cy="11.2" r="2.9"/><path d="M7 6l1.3-2.2h3.4L13 6"/>',
  // scanner: a tooth in 3D
  '<path d="M6.3 3.4c-2.2 0-3.4 1.7-3.4 3.8 0 2.6 1.3 4.2 1.9 6.8.4 1.8.8 3.1 1.8 3.1s1.1-1.7 1.7-3.6c.3-1 .8-1.4 1.7-1.4s1.4.4 1.7 1.4c.6 1.9.7 3.6 1.7 3.6s1.4-1.3 1.8-3.1c.6-2.6 1.9-4.2 1.9-6.8 0-2.1-1.2-3.8-3.4-3.8-1.6 0-2.3 1-3.7 1s-2.1-1-3.7-1z"/>',
];
