# THE ARCHIVE: Design Process Brief

> *"Making the past impossible to ignore, music and fashion across generations."*

---

## 1. The Color of History: Aged Nigerian Newspapers
The starting point for **THE ARCHIVE** was finding a single surface color that immediately evokes history and cultural memory. What came to mind was the look and feel of **old Nigerian newspapers**, specifically how their paper naturally weathers and turns into a warm, pale stone tone over time.

Instead of using a sterile, pure white background, the entire canvas was shifted to a muted archival newsprint tone (`#E3E1DC`) paired with deep ink black (`#121110`), grounding every photograph and story in a tactile, historical atmosphere.

---

## 2. Typography & Narrative Structure: The Norrav Inspiration
Early in the process, two major roadblocks emerged: choosing the right typeface and finding a layout structure capable of carrying decades of cultural history without feeling cluttered.

After setting typography aside temporarily to focus on structure, I went back through my personal archive of saved website inspirations and revisited a studio I had always followed: **Norrav**. Studying how Norrav's portfolio paces its content and tells a cohesive visual story unlocked the direction for **THE ARCHIVE**:
- Adapted an editorial, story-driven layout to chronicle **Nigerian Music and Fashion** across eras (**1960s, 1980s, 1990s, and 2000s**).
- Maintained the clean typographic hierarchy and spatial arrangements while swapping the stark white background for our aged Nigerian newspaper palette.
- Added smooth GSAP `ScrollTrigger` transitions so each era eases in as the previous era fades out.

---

## 3. Building the 3D Panoramic Curve (`Panoramic3D`)
Curved 3D panoramic galleries have always been a visual effect I admired and wanted to build myself from scratch.

For each era section, I engineered a custom **Three.js + GSAP** continuous 3D panoramic filmstrip (`Panoramic3D.tsx`):
- Archival fashion photographs from each decade are mapped onto a seamless, zero-gap cylindrical 3D arc.
- The strip scrolls continuously in an infinite loop and smoothly decelerates on hover so visitors can inspect individual archival looks up close.

---

## 4. Embedded Sonic Nostalgia
A visual archive of Nigerian music and fashion wouldn't be complete without the sound itself. To make the experience immersive, I embedded playable era music and archival video directly inside each decade card, allowing anyone visiting the site to listen to classic Highlife, Afrobeat, Jùjú, Street Reggae, Fuji, and early Afrobeats records and feel the nostalgia right on the page.

---

## 5. The Monumental Footer: Inspired by `NOTHIN'`
For the closing statement of the site, the footer structure was inspired by **NOTHIN'**:
- Features an oversized, edge-to-edge **ARCHIVE** wordmark anchored below the channel links.
- Enhanced in React and GSAP with an interactive **scale-up and scale-down bounce effect** (`back.out`) triggered per letter and link on hover, giving the archival layout a lively, tactile finish.
