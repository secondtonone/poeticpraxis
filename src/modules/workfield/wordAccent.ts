import type { AccentTypes } from './accents';

export default function wordAccent(accent: AccentTypes) {
  if (accent < 3) {
    ++accent;
  } else {
    accent = 0;
  }
  return accent as AccentTypes;
}
