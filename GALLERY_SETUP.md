# Guía Rápida: Cómo Probar la Galería

## 🚀 Inicio Rápido

La sección **PictureAlbumSection** ya está agregada a tu página principal. Para verla en acción:

### 1. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

### 2. Abrir en el Navegador

Visita: `http://localhost:3000`

La nueva sección aparecerá entre el carrusel de pacientes y la sección de WhatsApp.

## 📸 Configurar Imágenes Propias

### Opción A: Usar tus propias imágenes

1. **Coloca tus imágenes** en: `public/images/gallery/`
   
   Ejemplo:
   ```
   public/images/gallery/
   ├── 1.jpg
   ├── 2.jpg
   ├── 3.jpg
   └── ...
   ```

2. **Edita** `src/app/components/sections/PictureAlbumSection.tsx`:

   ```tsx
   const fallImages = [
     '/images/gallery/1.jpg',
     '/images/gallery/2.jpg',
     '/images/gallery/3.jpg',
     '/images/gallery/4.jpg',
     '/images/gallery/5.jpg',
     '/images/gallery/6.jpg',
     '/images/gallery/7.jpg',
     '/images/gallery/8.jpg',
   ];

   const rollImages = [
     '/images/gallery/9.jpg',
     '/images/gallery/10.jpg',
     '/images/gallery/11.jpg',
     '/images/gallery/12.jpg',
     '/images/gallery/13.jpg',
   ];
   ```

### Opción B: Usar imágenes temporales (para prueba)

El componente actualmente usa rutas como `/images/gallery/1.jpg`. Puedes:

1. **Usar URLs externas temporalmente**:
   ```tsx
   const fallImages = [
     'https://picsum.photos/seed/doc1/800/533',
     'https://picsum.photos/seed/doc2/800/533',
     'https://picsum.photos/seed/doc3/800/533',
     // ...
   ];
   ```

2. **O copiar imágenes de otras carpetas**:
   ```bash
   # Si tienes imágenes en pacients/ o asociated/
   # Copia algunas a gallery/ para prueba
   ```

## 🎨 Personalización Rápida

### Cambiar los Colores

Edita `PictureAlbumSection.tsx`:

```tsx
// Cambiar el fondo de la sección
<section className="relative py-16 md:py-24 bg-gradient-to-b from-blue-50 via-white to-blue-50">

// Cambiar el color del botón
<button className="... bg-red-600 hover:bg-red-700 ...">
```

### Cambiar el Modo de Animación

```tsx
<PhotoFall
  mode="center"  // Opciones: 'center', 'ltr', 'rtl', 'sides'
  // ...
/>
```

### Ajustar la Velocidad

```tsx
<PhotoFall
  durationMs={500}  // Más rápido
  staggerMs={100}   // Menos tiempo entre fotos
/>

<FilmRoll
  speedPxPerSec={120}  // Más rápido
/>
```

## 🔧 Solución de Problemas

### "No aparecen las imágenes"
- Verifica que las rutas en los arrays sean correctas
- Las rutas deben empezar con `/images/gallery/`
- Los archivos deben estar en `public/images/gallery/`

### "La animación no se ve suave"
- Verifica el rendimiento del navegador
- Reduce el número de imágenes en móvil con `limitImagesOnMobile={6}`

### "Quiero desactivar la sección temporalmente"
Comenta la línea en `src/app/page.tsx`:

```tsx
{/* <PictureAlbumSection /> */}
```

## 📱 Comportamiento Responsive

- **Desktop**: Muestra todas las imágenes con animaciones completas
- **Mobile**: 
  - Reduce automáticamente el número de imágenes (configurable)
  - Ajusta los tiempos de animación
  - Optimiza la dispersión de fotos

## 🎯 Próximos Pasos Sugeridos

1. ✅ Probar con imágenes temporales
2. ✅ Ajustar colores y estilos al diseño de tu marca
3. ✅ Subir tus imágenes reales
4. ✅ Ajustar la velocidad y animaciones a tu gusto
5. ✅ Considerar agregar más secciones o variaciones

---

**¿Necesitas ayuda?** Revisa `COMPONENTS_STRUCTURE.md` para más detalles técnicos.
