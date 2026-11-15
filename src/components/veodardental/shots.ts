// The VeodarDental screenshots: the program running with its invented demo data, at
// 1600×1000, in its «gabinete claro» style (version 0.2.1). Phone, ID and bank account
// numbers are blurred anyway (they look real; the program marks where it draws them).
// The CT study is an invented one too (a synthetic jaw written as DICOM), opened in the
// program's own viewer. Astro turns each one into AVIF and WebP at the widths a page
// asks for.
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
import fichaResumen from '../../assets/veodardental/ficha-resumen.png';
import fichaFiliacion from '../../assets/veodardental/ficha-filiacion.png';
import fichaSalud from '../../assets/veodardental/ficha-salud.png';
import fichaHistorial from '../../assets/veodardental/ficha-historial.png';
import fichaDocumentos from '../../assets/veodardental/ficha-documentos.png';
import fichaPresupuestos from '../../assets/veodardental/ficha-presupuestos.png';
import fichaCuenta from '../../assets/veodardental/ficha-cuenta.png';
import cobros from '../../assets/veodardental/cobros.png';
import verifactu from '../../assets/veodardental/verifactu.png';
import caja from '../../assets/veodardental/caja.png';
import gastos from '../../assets/veodardental/gastos.png';
import bancos from '../../assets/veodardental/bancos.png';
import recalls from '../../assets/veodardental/recalls.png';
import listin from '../../assets/veodardental/listin.png';
import almacen from '../../assets/veodardental/almacen.png';
import laboratorio from '../../assets/veodardental/laboratorio.png';
import ortodoncia from '../../assets/veodardental/ortodoncia.png';
import tarifas from '../../assets/veodardental/tarifas.png';
import colaboradores from '../../assets/veodardental/colaboradores.png';
import informes from '../../assets/veodardental/informes.png';
import configuracion from '../../assets/veodardental/configuracion.png';
import modulos from '../../assets/veodardental/modulos.png';
import pizarra from '../../assets/veodardental/pizarra.png';
import entrada from '../../assets/veodardental/entrada.png';
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
  'ficha-resumen': fichaResumen,
  'ficha-filiacion': fichaFiliacion,
  'ficha-salud': fichaSalud,
  'ficha-historial': fichaHistorial,
  'ficha-documentos': fichaDocumentos,
  'ficha-presupuestos': fichaPresupuestos,
  'ficha-cuenta': fichaCuenta,
  cobros,
  verifactu,
  caja,
  gastos,
  bancos,
  recalls,
  listin,
  almacen,
  laboratorio,
  ortodoncia,
  tarifas,
  colaboradores,
  informes,
  configuracion,
  modulos,
  pizarra,
  entrada,
};
