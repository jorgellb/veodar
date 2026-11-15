// The VeodarDental screenshots: the program running with its invented demo data, at
// 1600×1000. Phone and ID numbers are blurred anyway (they look real). The CT study is
// an invented one too (a synthetic jaw written as DICOM), opened in the program's own
// viewer. Astro turns each one into AVIF and WebP at the widths a page asks for.
import inicio from '../../assets/veodardental/inicio.png';
import agenda from '../../assets/veodardental/agenda.png';
import odontograma from '../../assets/veodardental/odontograma.png';
import odontogramaRx from '../../assets/veodardental/odontograma-radiografia.png';
import periodontograma from '../../assets/veodardental/periodontograma.png';
import presupuestos from '../../assets/veodardental/presupuestos.png';
import facturas from '../../assets/veodardental/facturas.png';
import comunicaciones from '../../assets/veodardental/comunicaciones.png';
import equipos from '../../assets/veodardental/equipos.png';
import fichaImagenes from '../../assets/veodardental/ficha-imagenes.png';
import tac from '../../assets/veodardental/tac.png';
import compararRadiografias from '../../assets/veodardental/comparar-radiografias.png';
import iaRadiografia from '../../assets/veodardental/ia-radiografia.png';
import type { Shot } from '../../data/veodardental';

export const shots: Record<Shot, ImageMetadata> = {
  inicio,
  agenda,
  odontograma,
  'odontograma-radiografia': odontogramaRx,
  periodontograma,
  presupuestos,
  facturas,
  comunicaciones,
  equipos,
  'ficha-imagenes': fichaImagenes,
  tac,
  'comparar-radiografias': compararRadiografias,
  'ia-radiografia': iaRadiografia,
};
