# Reunited brand

One page. Everything here is already true in the shipped app and the site, so
this is a record, not a proposal. When code and this file disagree, the code
in `socialreps/ios/Kin/Theme.swift` wins and this file is wrong.

## The mark

Two overlapping rings. Two lives that intersect, which is the whole product in
one shape. The app icon puts a serif **r** at the intersection; everywhere the
word "reunited" is set beside the mark, the r is dropped, because the wordmark
already says the letter.

| Asset | Use |
|---|---|
| `assets/mark.svg` | The rings alone. Takes `currentColor`, so one file works on paper, on ink, and reversed. |
| `assets/favicon.svg` | Rings on a dawn ground, rounded square. Rings only: at 16px the r turns to mush. |
| `assets/icon.png` | The full app icon, 512px. App icon and apple-touch-icon only. |
| `assets/og.png` | 1200x630 social card. |
| `socialreps/.../AppIcon.appiconset/icon-1024.png` | The App Store icon. Source of truth for the icon. |

**Do not** put `icon.png` on a web page. It is a rounded square with its own
gradient and it reads as an App Store badge, not a logo. Use the SVG lockup.

**Clear space** is the ring radius on every side. **Minimum size** for the
lockup is 18px ring height; below that use the mark alone.

## Colour

From `Theme.swift`. The contrast figures are measured, not guessed, and the
rep-type colours were each chosen to clear 4.5:1 as text on the dawn ground.

| Token | Light | Dark | Role |
|---|---|---|---|
| Ground, top | `#FFF6EC` | `#221A13` | The dawn gradient starts here |
| Ground, bottom | `#FBE3CC` | `#191410` | and ends here |
| Ink | `#2A2018` | `#F3EADF` | Body and display type |
| Dim | `#6E5F4E` | `#B7A48F` | Secondary type, captions |
| Card | `#FFFFFF` | `#2C231B` | Raised surfaces |

Rep-type accents, one per kind of rep. **Ember is the brand accent** and the
only one the marketing site uses; the other four belong to the app's chips.

| | Hex | Rep | Measured |
|---|---|---|---|
| Ember | `#A85E2C` | Reconnect | 4.5:1 as text on dawn |
| Spruce | `#2F7E72` | Go deeper | |
| Rose | `#B14A55` | Say thanks | |
| Ochre | `#8A6B3D` | In person | 4.6:1 text, 4.9:1 under white |
| Slate | `#607094` | Reflect | 4.95:1 under white, 4.6:1 text on dawn |

Widget themes add dusk, ink and linen grounds. They are widget-only.

**Never**: gradient text, glow, coloured drop shadows at zero offset. Emphasis
comes from weight, size, and one ember word.

## Type

Serif for display, sans for everything else. Both are the system faces the app
uses, so the web and the app are the same voice and nothing is downloaded.

```
--serif: ui-serif, "New York", Georgia, "Times New Roman", serif
--sans:  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
```

The hero runs to 8.4rem. Body copy holds a 34em measure. One accented word per
headline at most.

## Voice

Warm, quiet, honest. The references are Lost in Translation, Moonlight, and a
letterpress print shop: held silence, natural light, ink pressed into paper.

- Say the plain thing. "It did not end in a fight" beats any metaphor for it.
- Name the refusal. No feed, no account, no server is the differentiator and
  it is stated, not implied.
- Never invent a number. The 1938 Harvard figure is real and computed; there
  are no other statistics anywhere.
- No em dash. Period, comma, colon, or parentheses.
- No filler verbs: elevate, seamless, unleash, supercharge.

Full writing rules are the six Orwell rules in the global CLAUDE.md.

## Where it is used

- **Landing page**: masthead on the title page, again in the colophon.
- **Legal pages**: the lockup in the nav, styled from `styles.css`.
- **Social**: `og.png`, declared with width, height, and `summary_large_image`.
- **App Store**: the icon, plus the five screenshots in `socialreps/marketing/`.
