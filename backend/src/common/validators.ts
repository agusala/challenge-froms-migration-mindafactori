/*Validacio para el elformato de dominio: AAA999 o AA999AA*/
export function validateDominio(dominio: string): boolean {
  const regex = /^[A-Z]{3}[0-9]{3}$|^[A-Z]{2}[0-9]{3}[A-Z]{2}$/;
  return regex.test(dominio);
}

/*Validacion para el CUIT*/
export function validateCUIT(cuit: string): boolean {
  if (!/^\d{11}$/.test(cuit)) return false;
  const coeficientes = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let suma = 0;
  for (let i = 0; i < 10; i++) {
    suma += parseInt(cuit[i]) * coeficientes[i];
  }
  let digitoCalculado = 11 - (suma % 11);
  if (digitoCalculado === 11) digitoCalculado = 0;
  return digitoCalculado === parseInt(cuit[10]);
}

/*Validacion para fecha de fabricación: número 6 dígitos, mes 1-12 y no futuro*/
export function validateFechaFabricacion(fecha: number): boolean {
  const str = fecha.toString();
  if (str.length !== 6) return false;
  const year = parseInt(str.substring(0, 4));
  const month = parseInt(str.substring(4, 6));
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentYearMonth = currentYear * 100 + currentMonth;
  return fecha <= currentYearMonth;
}