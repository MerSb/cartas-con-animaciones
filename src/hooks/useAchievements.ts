export const LOGROS = {
  PRIMER_BESO: {
    id: 'primer_beso',
    titulo: '¡Primer beso!',
    descripcion: 'Diste tu primer beso virtual',
    icono: '💋'
  },
  CARICIAS_MAGICAS: {
    id: 'caricias_magicas',
    titulo: 'Caricias Mágicas',
    descripcion: 'Acariciaste al perro 10 veces',
    icono: '🐕'
  },
  COLECCIONISTA: {
    id: 'coleccionista',
    titulo: 'Coleccionista de Sellos',
    descripcion: 'Encontraste todos los sellos',
    icono: '📮'
  },
  BESOS_ILIMITADOS: {
    id: 'besos_ilimitados',
    titulo: 'Amor Infinito',
    descripcion: 'Diste 50 besos',
    icono: '💖'
  }
};

export function useAchievements(onUnlock?: (logroId: string) => void) {
  const desbloquear = (logroId: keyof typeof LOGROS) => {
    const logro = LOGROS[logroId];
    const desbloqueados = JSON.parse(localStorage.getItem('logros') || '[]');
    if (!desbloqueados.includes(logroId)) {
      localStorage.setItem('logros', JSON.stringify([...desbloqueados, logroId]));
      onUnlock?.(logroId);
      
      const event = new CustomEvent('logroDesbloqueado', { detail: logro });
      window.dispatchEvent(event);
    }
  };

  const isDesbloqueado = (logroId: keyof typeof LOGROS) => {
    const desbloqueados = JSON.parse(localStorage.getItem('logros') || '[]');
    return desbloqueados.includes(logroId);
  };

  return { desbloquear, isDesbloqueado };
}