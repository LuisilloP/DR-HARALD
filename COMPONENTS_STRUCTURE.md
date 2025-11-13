# Estructura de Componentes - Dr. Harald

## 📁 Organización

La estructura de componentes ha sido reorganizada para mayor claridad y mantenibilidad:

```
src/app/components/
├── sections/              # Secciones completas de la página
│   ├── AboutSection.tsx
│   ├── BeforeAfterSection.tsx
│   ├── FaqSection.tsx
│   ├── HeroSection.tsx
│   ├── PartnersSection.tsx
│   ├── PictureAlbumSection.tsx  ⭐ NUEVA
│   ├── ServicesSection.tsx
│   └── WhatsAppCTASection.tsx
│
├── ui/                    # Componentes UI reutilizables
│   ├── AnimatedCounter.tsx
│   ├── BeforeAfterCard.tsx
│   ├── FilmRoll.tsx       ⭐ NUEVO
│   ├── PatientsCarousel.tsx
│   ├── PhotoFall.tsx      ⭐ NUEVO
│   ├── ServiceCard.tsx
│   └── TreatmentsCarousel.tsx
│
├── NavBar.tsx             # Componentes de layout global
└── Footer.tsx
```

## 🎨 Nueva Sección: Picture Album

### Componentes Agregados

#### 1. **PhotoFall** (`ui/PhotoFall.tsx`)
Componente que anima fotos "cayendo" hacia el centro con varios modos de animación:
- `center`: Caída desde arriba
- `ltr`: Alternando izquierda/derecha (empieza izquierda)
- `rtl`: Alternando derecha/izquierda (empieza derecha)
- `sides`: Alias de ltr

**Características:**
- Responsive con ajustes automáticos para móvil
- Control de dispersión (spreadX, spreadY)
- Límite configurable de imágenes en móvil
- Método `replay()` para repetir animación
- Duración y stagger personalizables

**Uso:**
```tsx
import PhotoFall, { PhotoFallHandle } from '@/app/components/ui/PhotoFall';

const ref = useRef<PhotoFallHandle>(null);

<PhotoFall
  ref={ref}
  images={arrayDeImagenes}
  mode="ltr"
  durationMs={750}
  staggerMs={170}
  spreadX={0.08}
  spreadY={0.08}
  limitImagesOnMobile={6}
/>

// Para repetir la animación
ref.current?.replay();
```

#### 2. **FilmRoll** (`ui/FilmRoll.tsx`)
Componente de "rollo fotográfico" con desplazamiento horizontal infinito.

**Características:**
- Loop infinito automático
- Dirección configurable (left/right)
- Velocidad ajustable
- Pausa al hover (opcional)
- Diseño de película clásica con perforaciones

**Uso:**
```tsx
import FilmRoll from '@/app/components/ui/FilmRoll';

<FilmRoll
  images={arrayDeImagenes}
  direction="left"
  speedPxPerSec={90}
  frameWidthPx={220}
  gapPx={16}
  heightPx={220}
  pauseOnHover
/>
```

#### 3. **PictureAlbumSection** (`sections/PictureAlbumSection.tsx`)
Sección completa que combina PhotoFall y FilmRoll en una galería atractiva.

**Ubicación en la página:**
La sección ha sido agregada entre `PatientsCarousel` y `WhatsAppCTASection`.

## 📸 Configuración de Imágenes

### Ubicación
Las imágenes de la galería deben colocarse en:
```
public/images/gallery/
```

### Formato Recomendado
- **PhotoFall**: Imágenes en formato 3:2 (800x533px recomendado)
- **FilmRoll**: Imágenes en formato 3:2 (800x533px recomendado)
- Formatos: JPG, PNG, WebP

### Actualizar las Imágenes
Edita los arrays en `PictureAlbumSection.tsx`:

```tsx
const fallImages = [
  '/images/gallery/1.jpg',
  '/images/gallery/2.jpg',
  // ... más imágenes
];

const rollImages = [
  '/images/gallery/9.jpg',
  '/images/gallery/10.jpg',
  // ... más imágenes
];
```

## 🔄 Migraciones Realizadas

### Imports Actualizados
Todos los imports han sido actualizados para reflejar la nueva estructura:

**Antes:**
```tsx
import HeroSection from "@/app/components/HeroSection";
import ServiceCard from "./ServiceCard";
```

**Ahora:**
```tsx
import HeroSection from "@/app/components/sections/HeroSection";
import ServiceCard from "@/app/components/ui/ServiceCard";
```

## 🚀 Próximos Pasos

1. **Agregar Imágenes Reales**
   - Coloca las imágenes en `public/images/gallery/`
   - Actualiza los arrays en `PictureAlbumSection.tsx`

2. **Personalizar Animaciones**
   - Ajusta `durationMs`, `staggerMs` en PhotoFall
   - Modifica `speedPxPerSec` en FilmRoll

3. **Optimizar Rendimiento** (Opcional)
   - Convertir `<img>` a `<Image>` de Next.js para optimización automática
   - Implementar lazy loading adicional si es necesario

4. **Estilos Personalizados**
   - Ajusta los colores en PictureAlbumSection para que coincidan con el diseño
   - Modifica los tamaños y espaciados según necesidad

## 📝 Notas Técnicas

- Los componentes PhotoFall y FilmRoll usan `'use client'` ya que requieren JavaScript del lado del cliente
- Los warnings de ESLint sobre `<img>` vs `<Image>` son informativos y no bloquean la funcionalidad
- Las animaciones respetan `prefers-reduced-motion` para accesibilidad
- Todos los componentes son totalmente responsive

---

**Fecha de actualización:** Noviembre 13, 2025
**Versión:** 1.0.0
