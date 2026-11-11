/** Slow-in, slow-out. Used for every clip transition so the site moves as one system. */
export const EASE_CLIP = [0.77, 0, 0.175, 1] as const;
/** Fast start, long settle. Used for scale/translate that rides along with a clip. */
export const EASE_SETTLE = [0.16, 1, 0.3, 1] as const;
