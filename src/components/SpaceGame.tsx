import { useEffect, useRef, useCallback } from "react";

/* ─── Constants ──────────────────────────────────────── */
const COLS = 9;
const ROWS = 4;
const ENEMY_W = 32;
const ENEMY_H = 24;
const ENEMY_GAP_X = 14;
const ENEMY_GAP_Y = 16;
const BULLET_SPEED = 8;
const ENEMY_BLT_SPD = 3.8;
const PLAYER_SPEED = 5;
const SHOOT_CD = 220;         // ms
const UFO_SPEED = 1.6;
const SHIELD_W = 44;
const SHIELD_H = 28;
const SHIELD_PX = 5;           // pixel size for shield bricks

/* ─── Types ──────────────────────────────────────────── */
interface Bullet { x: number; y: number; w: number; h: number }
interface Enemy { x: number; y: number; alive: boolean; type: number; ox: number; oy: number }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; size: number; color: string }
interface Star { x: number; y: number; r: number; spd: number; twinkle: number }
interface ShieldPx { x: number; y: number; hp: number }
interface FloatTxt { x: number; y: number; vy: number; life: number; text: string; color: string }

interface GameState {
      player: { x: number; y: number; lives: number; invincible: number };
      bullets: Bullet[];
      eBullets: Bullet[];
      enemies: Enemy[];
      particles: Particle[];
      stars: Star[];
      shields: ShieldPx[];
      floats: FloatTxt[];
      ufo: { x: number; y: number; alive: boolean; dir: number; timer: number } | null;
      score: number;
      hiScore: number;
      level: number;
      combo: number;
      comboTimer: number;
      phase: "title" | "playing" | "levelup" | "dead" | "won";
      enemyDir: number;
      enemyBaseSpd: number;
      enemyY: number;
      lastShot: number;
      eShootTimer: number;
      t: number;
      titleT: number;
      levelupT: number;
      thruster: boolean;
      scoreAnim: number;
}

/* ───────────────────────────────────────────────────────
   PIXEL ART SPRITES  (9×7 grid, each cell = 1 bit)
──────────────────────────────────────────────────────── */
const SPRITES: Record<number, number[][][]> = {
      // type 0 – cyan classic invader (2 frames)
      0: [
            [
                  [0, 0, 1, 0, 0, 0, 1, 0, 0],
                  [0, 0, 0, 1, 1, 1, 0, 0, 0],
                  [0, 1, 1, 1, 1, 1, 1, 1, 0],
                  [1, 1, 0, 1, 1, 1, 0, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [0, 1, 0, 1, 0, 1, 0, 1, 0],
                  [1, 0, 0, 0, 0, 0, 0, 0, 1],
            ],
            [
                  [0, 0, 1, 0, 0, 0, 1, 0, 0],
                  [0, 0, 0, 1, 1, 1, 0, 0, 0],
                  [0, 1, 1, 1, 1, 1, 1, 1, 0],
                  [1, 1, 0, 1, 1, 1, 0, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [0, 0, 1, 0, 1, 0, 1, 0, 0],
                  [0, 1, 0, 1, 0, 1, 0, 1, 0],
            ],
      ],
      // type 1 – purple squid (2 frames)
      1: [
            [
                  [0, 0, 0, 1, 1, 0, 0, 0],
                  [0, 1, 1, 1, 1, 1, 1, 0],
                  [1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 0, 1, 1, 0, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1],
                  [0, 0, 1, 0, 0, 1, 0, 0],
                  [0, 1, 0, 1, 1, 0, 1, 0],
            ],
            [
                  [0, 0, 0, 1, 1, 0, 0, 0],
                  [0, 1, 1, 1, 1, 1, 1, 0],
                  [1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 0, 1, 1, 0, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1],
                  [0, 1, 0, 1, 1, 0, 1, 0],
                  [1, 0, 1, 0, 0, 1, 0, 1],
            ],
      ],
      // type 2 – orange crab (2 frames)
      2: [
            [
                  [0, 1, 0, 0, 0, 0, 1, 0],
                  [1, 0, 1, 1, 1, 1, 0, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 0, 1, 1, 0, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1],
                  [0, 0, 1, 1, 1, 1, 0, 0],
                  [0, 1, 0, 0, 0, 0, 1, 0],
            ],
            [
                  [0, 1, 0, 0, 0, 0, 1, 0],
                  [0, 0, 1, 1, 1, 1, 0, 0],
                  [0, 1, 1, 1, 1, 1, 1, 0],
                  [1, 1, 0, 1, 1, 0, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 0, 1, 1, 1, 1, 0, 1],
                  [0, 1, 0, 0, 0, 0, 1, 0],
            ],
      ],
};
const COLORS = ["#06b6d4", "#a855f7", "#f97316"] as const;
const POINTS = [10, 20, 30] as const;

/* ─── Shield template 9×6 ─────────────────────────────── */
const SHIELD_TMPL = [
      [0, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1],
];

/* ─── Helpers ─────────────────────────────────────────── */
function rectHit(
      ax: number, ay: number, aw: number, ah: number,
      bx: number, by: number, bw: number, bh: number
) {
      return Math.abs(ax - bx) < (aw + bw) / 2 && Math.abs(ay - by) < (ah + bh) / 2;
}

function spawnShields(W: number, H: number): ShieldPx[] {
      const shieldCount = 3;
      const gap = W / (shieldCount + 1);
      const sy = H - 90;
      const cols = SHIELD_TMPL[0].length;
      const rows2 = SHIELD_TMPL.length;
      const pixels: ShieldPx[] = [];
      for (let s = 0; s < shieldCount; s++) {
            const sx = gap * (s + 1) - (cols * SHIELD_PX) / 2;
            for (let r = 0; r < rows2; r++) {
                  for (let c = 0; c < cols; c++) {
                        if (SHIELD_TMPL[r][c]) {
                              pixels.push({ x: sx + c * SHIELD_PX, y: sy + r * SHIELD_PX, hp: 3 });
                        }
                  }
            }
      }
      return pixels;
}

function spawnEnemies(W: number, level: number): Enemy[] {
      const grid: Enemy[] = [];
      const totalW = COLS * (ENEMY_W + ENEMY_GAP_X) - ENEMY_GAP_X;
      const startX = (W - totalW) / 2 + ENEMY_W / 2;
      const startY = 56 + Math.min(level - 1, 4) * 4;
      for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                  const x = startX + c * (ENEMY_W + ENEMY_GAP_X);
                  const y = startY + r * (ENEMY_H + ENEMY_GAP_Y);
                  grid.push({ x, y, alive: true, type: r === 0 ? 2 : r < 2 ? 1 : 0, ox: x, oy: y });
            }
      }
      return grid;
}

function initStars(W: number, H: number): Star[] {
      return Array.from({ length: 80 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.4 + 0.2,
            spd: Math.random() * 0.3 + 0.05,
            twinkle: Math.random() * Math.PI * 2,
      }));
}

/* ═══════════════════════════════════════════════════════
   DRAW helpers
═══════════════════════════════════════════════════════ */
function drawAlien(
      ctx: CanvasRenderingContext2D,
      x: number, y: number,
      type: number, frame: number,
      scale = 1
) {
      const sprite = SPRITES[type]?.[frame] ?? SPRITES[0][frame];
      const rows2 = sprite.length;
      const cols = sprite[0].length;
      const px = 3 * scale;
      const color = COLORS[type];
      ctx.save();
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      sprite.forEach((row, ry) =>
            row.forEach((cell, cx) => {
                  if (cell) ctx.fillRect(
                        x - (cols * px) / 2 + cx * px,
                        y - (rows2 * px) / 2 + ry * px,
                        px, px
                  );
            })
      );
      ctx.restore();
}

function drawUFO(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
      ctx.save();
      ctx.translate(x, y);
      const pulse = 0.85 + 0.15 * Math.sin(t / 120);
      ctx.shadowBlur = 14;
      ctx.shadowColor = "#ff2277";
      // body
      ctx.fillStyle = "#ff2277";
      ctx.beginPath();
      ctx.ellipse(0, 2, 18, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      // dome
      ctx.fillStyle = "#ff77aa";
      ctx.beginPath();
      ctx.ellipse(0, -4, 10, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      // lights
      [-10, -5, 0, 5, 10].forEach((lx, i) => {
            ctx.fillStyle = i % 2 === 0 ? `rgba(255,255,80,${pulse})` : `rgba(80,255,255,${pulse})`;
            ctx.beginPath();
            ctx.arc(lx, 3, 2, 0, Math.PI * 2);
            ctx.fill();
      });
      ctx.restore();
}

function drawShip(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.shadowBlur = 14;
      ctx.shadowColor = "#06b6d4";

      // Engine glow pulse
      const ep = 0.7 + 0.3 * Math.sin(t / 100);

      // Thruster
      const flameH = 8 + 6 * Math.sin(t / 80);
      const grad = ctx.createLinearGradient(0, 14, 0, 14 + flameH + 8);
      grad.addColorStop(0, `rgba(249,115,22,${ep})`);
      grad.addColorStop(0.5, `rgba(251,191,36,0.6)`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.shadowColor = "#f97316";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(-5, 14);
      ctx.lineTo(0, 14 + flameH);
      ctx.lineTo(5, 14);
      ctx.closePath();
      ctx.fill();

      // Ship body
      ctx.shadowColor = "#06b6d4";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#0e7490";
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(11, 8);
      ctx.lineTo(7, 8);
      ctx.lineTo(7, 14);
      ctx.lineTo(-7, 14);
      ctx.lineTo(-7, 8);
      ctx.lineTo(-11, 8);
      ctx.closePath();
      ctx.fill();

      // Highlight stripe
      ctx.fillStyle = "#06b6d4";
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(5, 4);
      ctx.lineTo(-5, 4);
      ctx.closePath();
      ctx.fill();

      // Cockpit
      ctx.fillStyle = `rgba(6,182,212,${0.5 + 0.5 * ep})`;
      ctx.beginPath();
      ctx.ellipse(0, -6, 4, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Wings
      ctx.fillStyle = "#164e63";
      ctx.beginPath();
      ctx.moveTo(-7, 8);
      ctx.lineTo(-22, 16);
      ctx.lineTo(-12, 14);
      ctx.lineTo(-7, 14);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(7, 8);
      ctx.lineTo(22, 16);
      ctx.lineTo(12, 14);
      ctx.lineTo(7, 14);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
}

function drawStars(ctx: CanvasRenderingContext2D, stars: Star[], t: number) {
      stars.forEach(s => {
            const alpha = 0.3 + 0.3 * Math.abs(Math.sin(s.twinkle + t / 1000));
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
      });
}

function drawShields(ctx: CanvasRenderingContext2D, shields: ShieldPx[]) {
      shields.forEach(p => {
            const alpha = p.hp / 3;
            ctx.fillStyle = `rgba(6,182,212,${alpha})`;
            ctx.shadowColor = `rgba(6,182,212,${alpha * 0.5})`;
            ctx.shadowBlur = 4;
            ctx.fillRect(p.x, p.y, SHIELD_PX, SHIELD_PX);
      });
      ctx.shadowBlur = 0;
}

function drawHUD(
      ctx: CanvasRenderingContext2D,
      W: number,
      score: number, hiScore: number,
      lives: number, level: number,
      combo: number, scoreAnim: number
) {
      // Score
      ctx.textAlign = "left";
      ctx.font = `bold 11px 'Courier New', monospace`;
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("SCORE", 8, 16);
      const scale = 1 + scoreAnim * 0.4;
      ctx.save();
      ctx.translate(8 + 35, 14);
      ctx.scale(scale, scale);
      ctx.fillStyle = "#06b6d4";
      ctx.shadowColor = "#06b6d4";
      ctx.shadowBlur = scoreAnim > 0 ? 12 : 0;
      ctx.font = `bold 13px 'Courier New', monospace`;
      ctx.fillText(score.toString().padStart(5, "0"), 0, 0);
      ctx.restore();

      // HI SCORE
      ctx.textAlign = "center";
      ctx.fillStyle = "#94a3b8";
      ctx.font = "9px 'Courier New', monospace";
      ctx.fillText("HI", W / 2, 12);
      ctx.fillStyle = "#f97316";
      ctx.font = "bold 12px 'Courier New', monospace";
      ctx.fillText(hiScore.toString().padStart(5, "0"), W / 2, 24);

      // Level
      ctx.textAlign = "right";
      ctx.fillStyle = "#94a3b8";
      ctx.font = "9px 'Courier New', monospace";
      ctx.fillText(`LV${level}`, W - 8, 12);

      // Lives
      const sx = W - 8;
      for (let i = 0; i < lives; i++) {
            ctx.save();
            ctx.translate(sx - i * 18 - 8, 28);
            ctx.scale(0.55, 0.55);
            drawShip(ctx, 0, 0, 0);
            ctx.restore();
      }

      // Combo
      if (combo > 1) {
            ctx.textAlign = "left";
            ctx.fillStyle = "#fbbf24";
            ctx.shadowColor = "#fbbf24";
            ctx.shadowBlur = 10;
            ctx.font = `bold ${Math.min(11 + combo, 16)}px 'Courier New', monospace`;
            ctx.fillText(`x${combo} COMBO!`, 8, 36);
            ctx.shadowBlur = 0;
      }

      ctx.shadowBlur = 0;
      ctx.textAlign = "left";
}

/* ─── Scan-line overlay ───────────────────────────────── */
function drawScanlines(ctx: CanvasRenderingContext2D, W: number, H: number) {
      ctx.save();
      ctx.globalAlpha = 0.04;
      ctx.fillStyle = "#000";
      for (let y = 0; y < H; y += 3) {
            ctx.fillRect(0, y, W, 1);
      }
      ctx.restore();
}

/* ─── CRT vignette ───────────────────────────────────── */
function drawVignette(ctx: CanvasRenderingContext2D, W: number, H: number) {
      const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.85);
      g.addColorStop(0, "transparent");
      g.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
}

/* ═══════════════════════════════════════════════════════
   TITLE screen renderer
═══════════════════════════════════════════════════════ */
function renderTitle(
      ctx: CanvasRenderingContext2D,
      W: number, H: number,
      t: number
) {
      ctx.save();

      // Title text glowing
      ctx.textAlign = "center";
      ctx.shadowBlur = 24;
      ctx.shadowColor = "#06b6d4";
      ctx.fillStyle = "#06b6d4";
      ctx.font = `bold ${Math.min(W * 0.065, 22)}px 'Courier New', monospace`;
      ctx.fillText("SPACE  INVADERS", W / 2, H * 0.28);
      ctx.shadowBlur = 0;

      // Sub
      ctx.fillStyle = "#334155";
      ctx.font = `10px 'Courier New', monospace`;
      ctx.fillText("— CODEC CRAZE EDITION —", W / 2, H * 0.37);

      // Score table
      const tableY = H * 0.45;
      [[2, "= 30 PTS", "#f97316"],
      [1, "= 20 PTS", "#a855f7"],
      [0, "= 10 PTS", "#06b6d4"]].forEach(([type, label, color], i) => {
            const row = tableY + i * 32;
            const frame = Math.floor(t / 500) % 2;
            drawAlien(ctx, W / 2 - 36, row + 6, type as number, frame, 0.9);
            ctx.fillStyle = color as string;
            ctx.font = "bold 11px 'Courier New', monospace";
            ctx.textAlign = "left";
            ctx.fillText(label as string, W / 2 - 16, row + 10);
      });

      // UFO row
      const ufoRow = tableY + 3 * 32;
      drawUFO(ctx, W / 2 - 36, ufoRow + 6, t);
      ctx.fillStyle = "#ff2277";
      ctx.font = "bold 11px 'Courier New', monospace";
      ctx.textAlign = "left";
      ctx.fillText("= ??? PTS", W / 2 - 16, ufoRow + 10);

      // Blink start
      if (Math.floor(t / 550) % 2 === 0) {
            ctx.textAlign = "center";
            ctx.fillStyle = "#fff";
            ctx.font = "bold 12px 'Courier New', monospace";
            ctx.fillText("[ CLICK  OR  TAP  TO  START ]", W / 2, H * 0.9);
      }

      ctx.restore();
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
const SpaceGame = () => {
      const canvasRef = useRef<HTMLCanvasElement>(null);
      const stateRef = useRef<GameState>({
            player: { x: 0, y: 0, lives: 3, invincible: 0 },
            bullets: [],
            eBullets: [],
            enemies: [],
            particles: [],
            stars: [],
            shields: [],
            floats: [],
            ufo: null,
            score: 0,
            hiScore: 0,
            level: 1,
            combo: 0,
            comboTimer: 0,
            phase: "title",
            enemyDir: 1,
            enemyBaseSpd: 0.7,
            enemyY: 0,
            lastShot: 0,
            eShootTimer: 0,
            t: 0,
            titleT: 0,
            levelupT: 0,
            thruster: false,
            scoreAnim: 0,
      });
      const keysRef = useRef<Set<string>>(new Set());
      const rafRef = useRef<number>(0);

      /* ── Init ─────────────────────────────────────────── */
      const startLevel = useCallback((canvas: HTMLCanvasElement, level: number, keepPlayer = false) => {
            const W = canvas.width;
            const H = canvas.height;
            const st = stateRef.current;
            if (!keepPlayer || level === 1) {
                  st.player = { x: W / 2, y: H - 46, lives: 3, invincible: 0 };
            } else {
                  st.player.x = W / 2;
                  st.player.y = H - 46;
            }
            st.bullets = [];
            st.eBullets = [];
            st.particles = [];
            st.floats = [];
            st.ufo = null;
            st.level = level;
            st.combo = 0;
            st.comboTimer = 0;
            st.phase = "playing";
            st.enemyDir = 1;
            st.enemyBaseSpd = 0.55 + level * 0.12;
            st.enemyY = 56;
            st.lastShot = 0;
            st.eShootTimer = 0;
            st.levelupT = 0;
            st.enemies = spawnEnemies(W, level);
            st.shields = spawnShields(W, H);
            if (st.stars.length === 0) st.stars = initStars(W, H);
      }, []);

      const newGame = useCallback((canvas: HTMLCanvasElement) => {
            stateRef.current.score = 0;
            stateRef.current.t = 0;
            startLevel(canvas, 1, false);
      }, [startLevel]);

      /* ── Shoot ─────────────────────────────────────────── */
      const shoot = useCallback(() => {
            const st = stateRef.current;
            const now = performance.now();
            if (now - st.lastShot < SHOOT_CD) return;
            st.lastShot = now;
            st.bullets.push({ x: st.player.x, y: st.player.y - 22, w: 3, h: 14 });
      }, []);

      /* ── Explosion ─────────────────────────────────────── */
      const explode = useCallback((x: number, y: number, color: string, count = 16) => {
            const st = stateRef.current;
            for (let i = 0; i < count; i++) {
                  const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
                  const spd = Math.random() * 3.5 + 0.8;
                  st.particles.push({
                        x, y,
                        vx: Math.cos(angle) * spd,
                        vy: Math.sin(angle) * spd,
                        life: 1.0,
                        size: Math.random() * 3 + 1,
                        color,
                  });
            }
            // Extra sparks
            for (let i = 0; i < 6; i++) {
                  const angle = Math.random() * Math.PI * 2;
                  st.particles.push({
                        x, y,
                        vx: Math.cos(angle) * (Math.random() * 5 + 2),
                        vy: Math.sin(angle) * (Math.random() * 5 + 2) - 2,
                        life: 0.7,
                        size: 1,
                        color: "#fff",
                  });
            }
      }, []);

      /* ── Game Loop ─────────────────────────────────────── */
      const loop = useCallback(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d")!;
            const W = canvas.width;
            const H = canvas.height;
            const st = stateRef.current;
            const keys = keysRef.current;

            st.t += 16;
            st.titleT += 16;

            /* ── Stars scroll ── */
            st.stars.forEach(s => { s.y += s.spd; if (s.y > H) s.y = -2; });

            /* ── BG ── */
            ctx.fillStyle = "#000814";
            ctx.fillRect(0, 0, W, H);
            drawStars(ctx, st.stars, st.t);

            /* ════ TITLE ════ */
            if (st.phase === "title") {
                  renderTitle(ctx, W, H, st.titleT);
                  drawScanlines(ctx, W, H);
                  drawVignette(ctx, W, H);
                  rafRef.current = requestAnimationFrame(loop);
                  return;
            }

            /* ════ LEVEL-UP FLASH ════ */
            if (st.phase === "levelup") {
                  st.levelupT += 16;
                  ctx.textAlign = "center";
                  ctx.shadowColor = "#06b6d4";
                  ctx.shadowBlur = 24;
                  ctx.fillStyle = "#06b6d4";
                  ctx.font = `bold ${Math.min(W * 0.07, 24)}px 'Courier New', monospace`;
                  ctx.fillText(`LEVEL ${st.level} COMPLETE!`, W / 2, H / 2 - 20);
                  ctx.shadowBlur = 0;
                  ctx.fillStyle = "#94a3b8";
                  ctx.font = "11px 'Courier New', monospace";
                  ctx.fillText(`SCORE: ${st.score}`, W / 2, H / 2 + 10);
                  drawHUD(ctx, W, st.score, st.hiScore, st.player.lives, st.level, st.combo, st.scoreAnim);
                  drawScanlines(ctx, W, H);
                  drawVignette(ctx, W, H);
                  if (st.levelupT > 1800) startLevel(canvas, st.level + 1, true);
                  rafRef.current = requestAnimationFrame(loop);
                  return;
            }

            /* ════ GAME OVER ════ */
            if (st.phase === "dead") {
                  ctx.textAlign = "center";
                  ctx.shadowColor = "#f97316";
                  ctx.shadowBlur = 22;
                  ctx.fillStyle = "#f97316";
                  ctx.font = `bold ${Math.min(W * 0.07, 22)}px 'Courier New', monospace`;
                  ctx.fillText("GAME  OVER", W / 2, H / 2 - 28);
                  ctx.shadowBlur = 0;
                  ctx.fillStyle = "#94a3b8";
                  ctx.font = "11px 'Courier New', monospace";
                  ctx.fillText(`SCORE: ${st.score}`, W / 2, H / 2 + 2);
                  if (Math.floor(st.t / 550) % 2 === 0) {
                        ctx.fillStyle = "#fff";
                        ctx.font = "bold 12px 'Courier New', monospace";
                        ctx.fillText("[ CLICK TO RETRY ]", W / 2, H / 2 + 28);
                  }
                  // Draw floating particles still
                  st.particles = st.particles.filter(p => p.life > 0);
                  st.particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.life -= 0.02; });
                  renderParticles(ctx, st.particles);
                  drawHUD(ctx, W, st.score, st.hiScore, 0, st.level, 0, 0);
                  drawScanlines(ctx, W, H);
                  drawVignette(ctx, W, H);
                  rafRef.current = requestAnimationFrame(loop);
                  return;
            }

            /* ════ PLAYING ════ */
            /* ── Input ── */
            const movLeft = keys.has("ArrowLeft") || keys.has("a") || keys.has("A");
            const movRight = keys.has("ArrowRight") || keys.has("d") || keys.has("D");
            if (movLeft) st.player.x = Math.max(22, st.player.x - PLAYER_SPEED);
            if (movRight) st.player.x = Math.min(W - 22, st.player.x + PLAYER_SPEED);
            st.thruster = movLeft || movRight;
            if (keys.has(" ") || keys.has("ArrowUp") || keys.has("w") || keys.has("W")) shoot();

            /* ── Enemy group movement ── */
            const alive = st.enemies.filter(e => e.alive);
            if (alive.length === 0) {
                  st.phase = "levelup"; st.levelupT = 0;
            }
            const crowd = alive.length / (COLS * ROWS);
            const spd = st.enemyBaseSpd + (1 - crowd) * 1.8;
            const leftX = alive.reduce((m, e) => Math.min(m, e.x), Infinity);
            const rightX = alive.reduce((m, e) => Math.max(m, e.x), -Infinity);
            let drop = false;
            if (rightX + ENEMY_W / 2 + 6 >= W && st.enemyDir === 1) { st.enemyDir = -1; drop = true; }
            if (leftX - ENEMY_W / 2 - 6 <= 0 && st.enemyDir === -1) { st.enemyDir = 1; drop = true; }
            st.enemies.forEach(e => {
                  if (!e.alive) return;
                  e.x += spd * st.enemyDir;
                  if (drop) e.y += 14;
            });
            // Enemies reach bottom => lose
            if (alive.some(e => e.y + ENEMY_H / 2 > H - 55)) {
                  st.player.lives = 0;
                  st.hiScore = Math.max(st.hiScore, st.score);
                  st.phase = "dead";
            }

            /* ── UFO ── */
            if (!st.ufo && Math.random() < 0.0008 + st.level * 0.0002) {
                  const dir = Math.random() > 0.5 ? 1 : -1;
                  st.ufo = { x: dir === 1 ? -30 : W + 30, y: 30, alive: true, dir, timer: 0 };
            }
            if (st.ufo) {
                  st.ufo.x += UFO_SPEED * st.ufo.dir;
                  st.ufo.timer++;
                  if (st.ufo.x < -40 || st.ufo.x > W + 40) st.ufo = null;
            }

            /* ── Enemy shooting ── */
            st.eShootTimer++;
            const shootEvery = Math.max(22, 65 - st.level * 4 - (1 - crowd) * 20);
            if (st.eShootTimer >= shootEvery && alive.length > 0) {
                  st.eShootTimer = 0;
                  // Pick one from the bottom row per column
                  const cols = new Map<number, Enemy>();
                  st.enemies.filter(e => e.alive).forEach(e => {
                        const col = Math.round(e.x / (ENEMY_W + ENEMY_GAP_X));
                        const cur = cols.get(col);
                        if (!cur || e.y > cur.y) cols.set(col, e);
                  });
                  const shooters = Array.from(cols.values());
                  const s = shooters[Math.floor(Math.random() * shooters.length)];
                  if (s) st.eBullets.push({ x: s.x, y: s.y + ENEMY_H / 2, w: 3, h: 10 });
            }

            /* ── Move bullets ── */
            // Player bullets
            st.bullets = st.bullets.filter(b => b.y > -20);
            st.bullets.forEach(b => b.y -= BULLET_SPEED);
            // Enemy bullets
            st.eBullets = st.eBullets.filter(b => b.y < H + 20);
            st.eBullets.forEach(b => b.y += ENEMY_BLT_SPD);

            /* ── Bullet vs enemy ── */
            st.bullets = st.bullets.filter(bullet => {
                  // UFO hit
                  if (st.ufo && st.ufo.alive) {
                        if (rectHit(bullet.x, bullet.y, 3, 12, st.ufo.x, st.ufo.y, 36, 14)) {
                              const bonus = [50, 100, 150, 300][Math.floor(Math.random() * 4)];
                              st.score += bonus;
                              explode(st.ufo.x, st.ufo.y, "#ff2277", 20);
                              addFloat(st, `+${bonus}`, st.ufo.x, st.ufo.y, "#ff2277");
                              st.ufo = null;
                              st.scoreAnim = 1;
                              return false;
                        }
                  }
                  // Enemy hit
                  for (const e of st.enemies) {
                        if (!e.alive) continue;
                        if (rectHit(bullet.x, bullet.y, 3, 12, e.x, e.y, ENEMY_W, ENEMY_H)) {
                              e.alive = false;
                              st.combo = (st.comboTimer > 0) ? st.combo + 1 : 1;
                              st.comboTimer = 90;
                              const base = POINTS[e.type];
                              const earned = base * Math.max(1, st.combo);
                              st.score += earned;
                              st.hiScore = Math.max(st.hiScore, st.score);
                              explode(e.x, e.y, COLORS[e.type], 18);
                              addFloat(st, `+${earned}`, e.x, e.y - 12, COLORS[e.type]);
                              st.scoreAnim = 1;
                              return false;
                        }
                  }
                  // Shield hit
                  const si = st.shields.findIndex(p =>
                        bullet.x >= p.x && bullet.x <= p.x + SHIELD_PX &&
                        bullet.y >= p.y && bullet.y <= p.y + SHIELD_PX
                  );
                  if (si !== -1) { st.shields[si].hp--; if (st.shields[si].hp <= 0) st.shields.splice(si, 1); return false; }
                  return true;
            });

            /* ── Enemy bullet vs player/shield ── */
            if (st.player.invincible <= 0) {
                  st.eBullets = st.eBullets.filter(b => {
                        // Shield
                        const si = st.shields.findIndex(p =>
                              b.x >= p.x && b.x <= p.x + SHIELD_PX &&
                              b.y >= p.y && b.y <= p.y + SHIELD_PX
                        );
                        if (si !== -1) { st.shields[si].hp--; if (st.shields[si].hp <= 0) st.shields.splice(si, 1); return false; }
                        // Player
                        if (rectHit(b.x, b.y, 3, 10, st.player.x, st.player.y, 30, 30)) {
                              st.player.lives--;
                              st.player.invincible = 140;
                              st.combo = 0;
                              st.comboTimer = 0;
                              explode(st.player.x, st.player.y, "#ff4444", 22);
                              if (st.player.lives <= 0) {
                                    st.hiScore = Math.max(st.hiScore, st.score);
                                    st.phase = "dead";
                              }
                              return false;
                        }
                        return true;
                  });
            }
            if (st.player.invincible > 0) st.player.invincible--;

            /* ── Combo timer ── */
            if (st.comboTimer > 0) st.comboTimer--;
            else st.combo = 0;

            /* ── Score anim decay ── */
            if (st.scoreAnim > 0) st.scoreAnim = Math.max(0, st.scoreAnim - 0.08);

            /* ── Particles ── */
            st.particles = st.particles.filter(p => p.life > 0);
            st.particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.07; p.vx *= 0.97; p.life -= 0.025; });

            /* ── Float texts ── */
            st.floats = st.floats.filter(f => f.life > 0);
            st.floats.forEach(f => { f.y += f.vy; f.life -= 0.025; });

            /* ══════════════ RENDER ══════════════ */
            // Shields
            drawShields(ctx, st.shields);

            // Ground line
            ctx.strokeStyle = "rgba(6,182,212,0.18)";
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 10]);
            ctx.beginPath();
            ctx.moveTo(0, H - 30);
            ctx.lineTo(W, H - 30);
            ctx.stroke();
            ctx.setLineDash([]);

            // UFO
            if (st.ufo) drawUFO(ctx, st.ufo.x, st.ufo.y, st.t);

            // Enemies
            const frame = Math.floor(st.t / 450) % 2;
            st.enemies.forEach(e => {
                  if (!e.alive) return;
                  drawAlien(ctx, e.x, e.y, e.type, frame);
            });

            // Player
            const showPlayer = st.player.invincible === 0 || Math.floor(st.player.invincible / 7) % 2 === 0;
            if (showPlayer) drawShip(ctx, st.player.x, st.player.y, st.t);

            // Player bullets
            st.bullets.forEach(b => {
                  const g = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.h);
                  g.addColorStop(0, "#06b6d4");
                  g.addColorStop(1, "transparent");
                  ctx.fillStyle = g;
                  ctx.shadowColor = "#06b6d4";
                  ctx.shadowBlur = 8;
                  ctx.fillRect(b.x - b.w / 2, b.y - b.h, b.w, b.h);
            });

            // Enemy bullets
            st.eBullets.forEach(b => {
                  ctx.fillStyle = "#f97316";
                  ctx.shadowColor = "#f97316";
                  ctx.shadowBlur = 8;
                  ctx.fillRect(b.x - b.w / 2, b.y, b.w, b.h);
            });
            ctx.shadowBlur = 0;

            // Particles
            renderParticles(ctx, st.particles);

            // Float texts
            st.floats.forEach(f => {
                  ctx.globalAlpha = f.life;
                  ctx.fillStyle = f.color;
                  ctx.shadowColor = f.color;
                  ctx.shadowBlur = 8;
                  ctx.textAlign = "center";
                  ctx.font = "bold 11px 'Courier New', monospace";
                  ctx.fillText(f.text, f.x, f.y);
            });
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;

            // HUD
            drawHUD(ctx, W, st.score, st.hiScore, st.player.lives, st.level, st.combo, st.scoreAnim);
            drawScanlines(ctx, W, H);
            drawVignette(ctx, W, H);

            rafRef.current = requestAnimationFrame(loop);
      }, [shoot, explode, startLevel]);

      /* ─── Mount ──────────────────────────────────────────── */
      useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const resize = () => {
                  const prev = { W: canvas.width, H: canvas.height };
                  canvas.width = canvas.offsetWidth;
                  canvas.height = canvas.offsetHeight;
                  const st = stateRef.current;
                  if (st.stars.length > 0) st.stars = initStars(canvas.width, canvas.height);
                  if (st.phase === "playing") {
                        // Rescale player position
                        st.player.x = (st.player.x / prev.W) * canvas.width;
                        st.player.y = canvas.height - 46;
                  }
            };
            resize();
            const ro = new ResizeObserver(resize);
            ro.observe(canvas);

            // Init stars for title
            stateRef.current.stars = initStars(canvas.width, canvas.height);

            const onKeyDown = (e: KeyboardEvent) => {
                  keysRef.current.add(e.key);
                  if (e.key === " ") e.preventDefault();
            };
            const onKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key);
            window.addEventListener("keydown", onKeyDown);
            window.addEventListener("keyup", onKeyUp);

            const onClick = (e: MouseEvent) => {
                  const st = stateRef.current;
                  if (st.phase === "title" || st.phase === "dead") {
                        newGame(canvas);
                  }
            };

            let touchX = 0;
            const onTouchStart = (e: TouchEvent) => {
                  const st = stateRef.current;
                  // Prevent scrolling while playing
                  if (st.phase === "playing") e.preventDefault();

                  touchX = e.touches[0].clientX;
                  if (st.phase === "title" || st.phase === "dead") {
                        newGame(canvas);
                        return;
                  }
                  shoot();
            };

            const onTouchMove = (e: TouchEvent) => {
                  const st = stateRef.current;
                  if (st.phase === "playing") e.preventDefault();

                  const currentX = e.touches[0].clientX;
                  const dx = currentX - touchX;

                  // More sensitive movement for mobile
                  if (dx > 2) {
                        keysRef.current.add("ArrowRight");
                        keysRef.current.delete("ArrowLeft");
                  } else if (dx < -2) {
                        keysRef.current.add("ArrowLeft");
                        keysRef.current.delete("ArrowRight");
                  } else {
                        keysRef.current.delete("ArrowLeft");
                        keysRef.current.delete("ArrowRight");
                  }

                  // Update touchX for continuous tracking
                  touchX = currentX;
            };

            const onTouchEnd = (e: TouchEvent) => {
                  keysRef.current.delete("ArrowLeft");
                  keysRef.current.delete("ArrowRight");
            };

            canvas.addEventListener("click", onClick);
            canvas.addEventListener("touchstart", onTouchStart, { passive: false });
            canvas.addEventListener("touchmove", onTouchMove, { passive: false });
            canvas.addEventListener("touchend", onTouchEnd, { passive: false });

            rafRef.current = requestAnimationFrame(loop);

            return () => {
                  cancelAnimationFrame(rafRef.current);
                  window.removeEventListener("keydown", onKeyDown);
                  window.removeEventListener("keyup", onKeyUp);
                  canvas.removeEventListener("click", onClick);
                  canvas.removeEventListener("touchstart", onTouchStart);
                  canvas.removeEventListener("touchmove", onTouchMove);
                  canvas.removeEventListener("touchend", onTouchEnd);
                  ro.disconnect();
            };
      }, [loop, newGame, shoot]);

      return (
            <div className="relative w-full h-full select-none bg-[#000814] touch-none">
                  <canvas
                        ref={canvasRef}
                        className="w-full h-full block cursor-crosshair touch-none"
                        style={{ imageRendering: "pixelated" }}
                  />
            </div>
      );
};

export default SpaceGame;

/* ─── Standalone helpers (outside component) ─────────── */
function renderParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
      particles.forEach(p => {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
}

function addFloat(st: GameState, text: string, x: number, y: number, color: string) {
      st.floats.push({ x, y, vy: -0.9, life: 1, text, color });
}
