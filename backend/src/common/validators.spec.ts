import { validateDominio, validateCUIT, validateFechaFabricacion } from './validators';

describe('Validators', () => {
  describe('validateDominio', () => {
    it('debe aceptar formato AAA999', () => {
      expect(validateDominio('ABC123')).toBe(true);
    });

    it('debe aceptar formato AA999AA', () => {
      expect(validateDominio('AB123CD')).toBe(true);
    });

    it('debe rechazar formato inválido (ej: A123BCD)', () => {
      expect(validateDominio('A123BCD')).toBe(false);
    });

    it('debe rechazar minúsculas', () => {
      expect(validateDominio('abc123')).toBe(false);
    });
  });

  describe('validateCUIT', () => {
    it('debe aceptar un CUIT válido (ej: 20267565393)', () => {
      // 20267565393 es un CUIT de prueba válido (tipo 20)
      expect(validateCUIT('20267565393')).toBe(true);
    });

    it('debe rechazar CUIT con dígito incorrecto', () => {

      expect(validateCUIT('20267565394')).toBe(false);
    });

    it('debe rechazar longitud incorrecta', () => {
      expect(validateCUIT('1234567890')).toBe(false); 
      expect(validateCUIT('123456789012')).toBe(false); 
    });

    it('debe rechazar caracteres no numéricos', () => {
      expect(validateCUIT('20A5678567B')).toBe(false);
    });
  });

  describe('validateFechaFabricacion', () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentYearMonth = currentYear * 100 + currentMonth;

    it('debe aceptar fecha actual', () => {
      expect(validateFechaFabricacion(currentYearMonth)).toBe(true);
    });

    it('debe aceptar fecha válida pasada (202001)', () => {
      expect(validateFechaFabricacion(202001)).toBe(true);
    });

    it('debe rechazar mes inválido (202413)', () => {
      expect(validateFechaFabricacion(202413)).toBe(false);
    });

    it('debe rechazar fecha futura', () => {
      const futureYearMonth = (currentYear + 1) * 100 + 1; 
      expect(validateFechaFabricacion(futureYearMonth)).toBe(false);
    });

    it('debe rechazar si no tiene 6 dígitos', () => {
      expect(validateFechaFabricacion(20201)).toBe(false); 
    });
  });
});