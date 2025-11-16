# Configuración de SEO y Metadatos
Este archivo documenta todos los elementos que necesitan actualización con datos reales.

## 📍 Datos a Actualizar

### 1. Google Analytics (layout.tsx)
```typescript
// Línea ~47-48 y línea ~54
'G-XXXXXXXXXX' → Reemplazar con tu ID real de Google Analytics
```
**Cómo obtenerlo:**
1. Ir a https://analytics.google.com
2. Crear una propiedad
3. Copiar el ID (formato: G-XXXXXXXXXX)

### 2. Facebook Pixel (layout.tsx) - OPCIONAL
```typescript
// Líneas comentadas 56-77
'TU_PIXEL_ID' → Reemplazar con tu Pixel ID de Facebook
```
**Cómo obtenerlo:**
1. Ir a https://business.facebook.com/events_manager
2. Crear un pixel
3. Copiar el ID

**Si no usas Facebook Ads:** Puedes dejar esta sección comentada o eliminarla.

---

## 📝 metadata.ts - Datos a Actualizar

### 3. Dominio del Sitio
```typescript
// Línea 3
const siteUrl = 'https://drharald.cl' → Tu dominio real
```

### 4. Información de Contacto
```typescript
// Líneas ~170-171
telephone: '+56927416008', → Tu teléfono real
email: 'contacto@drharald.cl', → Tu email real
```

### 5. Dirección Física
```typescript
// Líneas ~175-180
streetAddress: 'Calle Principal 123', → Dirección real de tu consultorio
addressLocality: 'Ovalle', → Ciudad (probablemente correcto)
addressRegion: 'Región de Coquimbo', → Región (probablemente correcto)
postalCode: '1840000', → Código postal real
```

### 6. Coordenadas GPS
```typescript
// Líneas ~184-185
latitude: -30.5975, → Latitud exacta de tu consultorio
longitude: -71.1992, → Longitud exacta de tu consultorio
```

**Cómo obtenerlas:**
1. Ir a https://www.google.com/maps
2. Buscar tu dirección
3. Click derecho en el marcador
4. Copiar las coordenadas (ejemplo: -30.5975, -71.1992)

### 7. Horarios de Atención
```typescript
// Líneas ~188-200
opens: '09:00', → Hora de apertura
closes: '18:00', → Hora de cierre
// Ajusta los días según tu disponibilidad
```

### 8. Redes Sociales
```typescript
// Líneas ~145-148 y ~288-290
sameAs: [
  'https://www.instagram.com/drharald', → Tu Instagram real
  'https://www.facebook.com/drharald', → Tu Facebook real
  // Agrega LinkedIn, TikTok, etc. si tienes
],
```

### 9. Universidad
```typescript
// Líneas ~158-160
alumniOf: {
  '@type': 'EducationalOrganization',
  name: 'Universidad de Chile', → Tu universidad real
},
```

### 10. Google Search Console Verification
```typescript
// Línea ~114
google: 'tu-codigo-de-verificacion-google', → Código de verificación
```

**Cómo obtenerlo:**
1. Ir a https://search.google.com/search-console
2. Agregar propiedad
3. Verificar con meta tag
4. Copiar solo el código (sin las etiquetas meta)

### 11. Twitter Handle (Opcional)
```typescript
// Línea ~96
creator: '@drharald', → Tu handle de Twitter/X real o eliminar
```

---

## 🎯 Prioridades

### Alta Prioridad (Crítico para SEO):
- [ ] Dominio real (`siteUrl`)
- [ ] Dirección física completa
- [ ] Coordenadas GPS exactas
- [ ] Teléfono y email
- [ ] Google Analytics ID
- [ ] Horarios de atención reales

### Media Prioridad (Importante):
- [ ] Redes sociales reales
- [ ] Universidad real
- [ ] Google Search Console verification

### Baja Prioridad (Opcional):
- [ ] Facebook Pixel
- [ ] Twitter handle
- [ ] Bing/Yandex verification

---

## ✅ Checklist Post-Actualización

Después de actualizar los datos:

1. **Testing Local:**
   - [ ] `npm run dev` funciona sin errores
   - [ ] Metadata se muestra correctamente en el inspector

2. **Testing en Producción:**
   - [ ] Verificar Open Graph: https://developers.facebook.com/tools/debug/
   - [ ] Verificar Twitter Card: https://cards-dev.twitter.com/validator
   - [ ] Verificar Schema: https://validator.schema.org/
   - [ ] Verificar en Google Search Console

3. **Configuraciones Externas:**
   - [ ] Registrar en Google Business Profile
   - [ ] Configurar Google Search Console
   - [ ] Configurar Google Analytics
   - [ ] Enviar sitemap a Google

---

## 📞 Soporte

Si necesitas ayuda con algún paso, pregúntame y te guío específicamente.
