# 🖼️ Guía: Cambiar a Imágenes Reales

## Estado Actual

✅ La galería está funcionando con **imágenes de prueba temporales** de Picsum Photos.
📍 Ubicación del código: `src/app/components/sections/PictureAlbumSection.tsx`

## 🔄 Pasos para Usar Tus Imágenes

### Paso 1: Preparar las Imágenes

**Formato Recomendado:**
- Relación de aspecto: **3:2** (ejemplo: 1200x800px, 900x600px, 800x533px)
- Formato: JPG, PNG o WebP
- Peso: Optimizado (< 500KB por imagen)
- Total necesario: **13 imágenes** (8 para PhotoFall + 5 para FilmRoll)

**Herramientas de Optimización (opcional):**
- [TinyPNG](https://tinypng.com/) - Compresión sin pérdida visible
- [Squoosh](https://squoosh.app/) - Optimización avanzada
- Photoshop: Guardar para Web (calidad 70-80%)

### Paso 2: Subir las Imágenes

Coloca tus imágenes en esta carpeta (ya existe):
```
public/images/gallery/
```

**Ejemplo de estructura:**
```
public/images/gallery/
├── foto1.jpg
├── foto2.jpg
├── foto3.jpg
├── foto4.jpg
├── foto5.jpg
├── foto6.jpg
├── foto7.jpg
├── foto8.jpg
├── foto9.jpg
├── foto10.jpg
├── foto11.jpg
├── foto12.jpg
└── foto13.jpg
```

### Paso 3: Actualizar el Código

Edita el archivo: `src/app/components/sections/PictureAlbumSection.tsx`

**Busca estas líneas (aprox. línea 7-24):**
```tsx
const fallImages = [
  'https://picsum.photos/seed/dental1/800/533',
  'https://picsum.photos/seed/dental2/800/533',
  // ...
];

const rollImages = [
  'https://picsum.photos/seed/clinic1/800/533',
  // ...
];
```

**Reemplázalas con:**
```tsx
const fallImages = [
  '/images/gallery/foto1.jpg',
  '/images/gallery/foto2.jpg',
  '/images/gallery/foto3.jpg',
  '/images/gallery/foto4.jpg',
  '/images/gallery/foto5.jpg',
  '/images/gallery/foto6.jpg',
  '/images/gallery/foto7.jpg',
  '/images/gallery/foto8.jpg',
];

const rollImages = [
  '/images/gallery/foto9.jpg',
  '/images/gallery/foto10.jpg',
  '/images/gallery/foto11.jpg',
  '/images/gallery/foto12.jpg',
  '/images/gallery/foto13.jpg',
];
```

### Paso 4: Verificar

1. **Guarda el archivo** (Ctrl + S)
2. El navegador se recargará automáticamente
3. **Verifica** que todas las imágenes se vean correctamente

## 🎨 Ideas de Contenido para las Imágenes

### Para PhotoFall (8 imágenes):
- Fotos del consultorio
- Equipamiento médico
- Equipo profesional
- Instalaciones
- Antes/después de tratamientos
- Pacientes satisfechos (con consentimiento)
- Certificaciones
- Momentos del día a día

### Para FilmRoll (5 imágenes):
- Vista panorámica del consultorio
- Sala de espera
- Sala de tratamiento
- Equipo médico en acción
- Detalle de tecnología

## 🔧 Ajustes Opcionales

### Cambiar el Número de Imágenes

**Para más o menos fotos en PhotoFall:**
```tsx
const fallImages = [
  '/images/gallery/foto1.jpg',
  '/images/gallery/foto2.jpg',
  // Agrega o quita imágenes según necesites
];
```

**Para FilmRoll:**
```tsx
const rollImages = [
  '/images/gallery/foto1.jpg',
  '/images/gallery/foto2.jpg',
  // Mínimo 3 imágenes, máximo no hay límite
];
```

### Usar Algunas Imágenes Existentes

Si ya tienes imágenes en otras carpetas:

**Opción 1 - Copiar:**
```bash
# Windows PowerShell
Copy-Item public\images\pacients\*.jpg public\images\gallery\
```

**Opción 2 - Referenciar directamente:**
```tsx
const fallImages = [
  '/images/pacients/foto1.jpg',
  '/images/asociated/logo1.png',
  // ...
];
```

## ⚠️ Solución de Problemas

### "La imagen no se carga"
✅ **Verificar que:**
- El archivo existe en `public/images/gallery/`
- El nombre del archivo coincide exactamente (incluye mayúsculas/minúsculas)
- La extensión es correcta (.jpg, .png, etc.)
- La ruta empieza con `/images/` (no `public/images/`)

### "Las imágenes se ven pixeladas"
✅ **Solución:**
- Usa imágenes de al menos 800x533px
- Verifica que la calidad de compresión no sea muy baja

### "La página carga lento"
✅ **Solución:**
- Optimiza las imágenes (reducir tamaño en KB)
- Considera usar formatos modernos como WebP
- Reduce el número total de imágenes

## 📱 Consideraciones Responsive

El componente limita automáticamente las imágenes en móvil:
```tsx
limitImagesOnMobile={6}  // Solo muestra 6 en vez de 8 en móvil
```

**Para cambiar este límite:**
```tsx
<PhotoFall
  limitImagesOnMobile={4}  // Cambia a 4, o a 0 para mostrar todas
  // ...
/>
```

## 🚀 Próximos Pasos

1. ✅ Prepara tus imágenes (formato 3:2)
2. ✅ Súbelas a `public/images/gallery/`
3. ✅ Actualiza los arrays en `PictureAlbumSection.tsx`
4. ✅ Verifica que se vean bien
5. ✅ Ajusta estilos y colores si es necesario

## 💡 Tips de Diseño

- **Coherencia:** Usa un estilo fotográfico consistente
- **Calidad:** Solo usa fotos profesionales o de buena calidad
- **Variedad:** Mezcla diferentes tipos de fotos (espacios, personas, detalles)
- **Luminosidad:** Preferir fotos bien iluminadas
- **Enfoque:** El componente PhotoFall funciona mejor con fotos horizontales

---

**¿Necesitas más ayuda?** 
- Ver: `COMPONENTS_STRUCTURE.md` para detalles técnicos
- Ver: `GALLERY_SETUP.md` para configuración general
- Ver: `CHANGES_SUMMARY.md` para resumen de cambios
