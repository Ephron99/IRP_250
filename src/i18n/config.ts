import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Dashboard": "Dashboard",
      "Front Office": "Front Office",
      "Housekeeping": "Housekeeping",
      "F&B Service": "F&B Service",
      "Human Resources": "Human Resources",
      "Accounting & Finance": "Accounting & Finance",
      "Purchasing & Inventory": "Purchasing & Inventory",
      "Sales & Marketing": "Sales & Marketing",
      "Security": "Security",
      "Engineering & Maintenance": "Engineering & Maintenance",
      "IT": "IT",
      "Welcome": "Welcome",
      "Search": "Search",
      "Occupancy Rate": "Occupancy Rate",
      "RevPAR Today": "RevPAR Today",
      "Average Daily Rate": "Average Daily Rate",
      "Guest Satisfaction Score": "Guest Satisfaction Score",
      "Operations Overview": "Operations Overview",
      "F&B Revenue by Outlet Today": "F&B Revenue by Outlet Today",
      "Room Status Distribution": "Room Status Distribution",
      "Top 5 Upcoming Arrivals": "Top 5 Upcoming Arrivals",
      "Administrative & Maintenance": "Administrative & Maintenance",
      "Staffing Overview Today": "Staffing Overview Today",
      "Open Maintenance Requests": "Open Maintenance Requests",
      "IT System Health": "IT System Health",
    }
  },
  fr: {
    translation: {
      "Dashboard": "Tableau de bord",
      "Front Office": "Réception",
      "Housekeeping": "Entretien ménager",
      "F&B Service": "Restauration",
      "Human Resources": "Ressources humaines",
      "Accounting & Finance": "Comptabilité et finance",
      "Purchasing & Inventory": "Achats et inventaire",
      "Sales & Marketing": "Ventes et marketing",
      "Security": "Sécurité",
      "Engineering & Maintenance": "Ingénierie et maintenance",
      "IT": "Informatique",
      "Welcome": "Bienvenue",
      "Search": "Chercher",
      "Summary Dashboard": "Tableau de bord récapitulatif",
    }
  },
  es: {
    translation: {
      "Dashboard": "Tablero",
      "Front Office": "Recepción",
      "Housekeeping": "Limpieza",
      "F&B Service": "Restauración",
      "Human Resources": "Recursos Humanos",
      "Accounting & Finance": "Contabilidad y Finanzas",
      "Purchasing & Inventory": "Compras e Inventario",
      "Sales & Marketing": "Ventas y Marketing",
      "Security": "Seguridad",
      "Engineering & Maintenance": "Ingeniería y Mantenimiento",
      "IT": "TI",
      "Welcome": "Bienvenido",
      "Search": "Buscar",
      "Summary Dashboard": "Tablero de resumen",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
