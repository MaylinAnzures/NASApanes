import Phaser from 'phaser';
import { GAME_EVENTS } from '../bridge/gameEvents';
import { sfx } from '../game/sfx';

const W = 1600;
const H = 900;
const FONT = '"Space Mono", monospace';

const METRICS = {
  electricidad: { label: 'Energía', unit: '%', max: 100, color: 0xffd166 },
  agua: { label: 'Agua', unit: ' L', max: 100, color: 0x6ec6ff },
  comida: { label: 'Comida', unit: ' kg', max: 20, color: 0x9be37b },
  salud: { label: 'Salud', unit: '%', max: 100, color: 0xff8a8f },
  oxigeno: { label: 'Oxígeno', unit: ' kg', max: 40, color: 0xc9a0f0 },
};

const rnd = Phaser.Math.Between;

export function createMainScene(eventBus) {
  return class MainScene extends Phaser.Scene {
    constructor() { super('MainScene'); }

    create() {
      this.px = 0; this.py = 0; this.tx = 0; this.ty = 0; // parallax con el puntero
      this.par = [];
      this.stage = null; this.busy = false; this.pending = null;
      this.prev = null;

      this.buildMenu();
      this.buildIntro();
      this.buildCabin();
      this.buildHud();
      this.flash = this.add.rectangle(W / 2, H / 2, W, H, 0xff4d5a, 0).setDepth(50);

      this.setStage('menu', true);

      // ---- puente React <-> Phaser ----
      const on = (ev, fn) => {
        eventBus.on(ev, fn, this);
        this.events.once('shutdown', () => eventBus.off(ev, fn, this));
        this.events.once('destroy', () => eventBus.off(ev, fn, this));
      };
      on(GAME_EVENTS.RESOURCES_CHANGED, (r) => this.onResources(r));
      on(GAME_EVENTS.STAGE_CHANGED, (s) => this.setStage(s));
      on(GAME_EVENTS.MISSION_CHANGED, (m) => this.onMission(m));
      on(GAME_EVENTS.POINTER_MOVED, (p) => { this.tx = p.x - 0.5; this.ty = p.y - 0.5; });
      on(GAME_EVENTS.POINTER_DOWN, (p) => this.burst(p.x * W, p.y * H, 0x72f0a0, 7));
      on(GAME_EVENTS.DAY_ADVANCED, () => this.onDay());

      // estrella fugaz de vez en cuando (menú)
      this.time.addEvent({ delay: 4500, loop: true, callback: () => this.shootingStar() });

      eventBus.emit(GAME_EVENTS.SCENE_READY);
    }

    // ============================================================ helpers
    layer(name) {
      const l = this.add.container(0, 0);
      this[name] = l;
      return l;
    }

    // contenedor que se desplaza con el puntero (f = cuánto)
    parallax(layer, f) {
      const c = this.add.container(0, 0);
      layer.add(c);
      this.par.push({ c, f });
      return c;
    }

    float(obj, dy, dur = 2400, delay = rnd(0, 1500)) {
      this.tweens.add({ targets: obj, y: obj.y + dy, duration: dur, delay, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    }

    starField(rect, count) {
      const c = this.add.container(0, 0);
      for (let i = 0; i < count; i += 1) {
        const s = this.add.image(rnd(rect.x, rect.x + rect.w), rnd(rect.y, rect.y + rect.h), 'star')
          .setScale(Phaser.Math.FloatBetween(0.2, 0.7)).setAlpha(Phaser.Math.FloatBetween(0.2, 0.9)).setTint(0xe9dcff);
        this.tweens.add({ targets: s, alpha: 0.1, duration: rnd(900, 2600), yoyo: true, repeat: -1, delay: rnd(0, 2000), ease: 'Sine.inOut' });
        c.add(s);
      }
      return c;
    }

    card(x, y, w, h, rot, fill, edge) {
      const c = this.add.container(x, y).setRotation(Phaser.Math.DegToRad(rot));
      const g = this.add.graphics();
      g.fillStyle(edge).fillRoundedRect(-w / 2 - 16, -h / 2 - 16, w + 32, h + 32, 44);
      g.fillStyle(fill).fillRoundedRect(-w / 2, -h / 2, w, h, 30);
      c.add(g);
      return c;
    }

    // ============================================================ MENÚ
    buildMenu() {
      const L = this.layer('menuL');
      const far = this.parallax(L, 8);
      const near = this.parallax(L, 22);
      far.add(this.add.rectangle(W / 2, H / 2, W, H, 0x231338));
      far.add(this.starField({ x: 0, y: 0, w: W, h: H }, 70));

      // tarjeta arriba-izquierda
      const a = this.card(180, 140, 230, 300, -8, 0xa476d8, 0x3b2266);
      const ag = this.add.graphics();
      ag.fillStyle(0x8e5fc4).fillRoundedRect(-95, -110, 190, 150, 22);
      ag.fillStyle(0x7a4cb4).fillRoundedRect(-95, 70, 120, 24, 12);
      a.add(ag); near.add(a); this.float(a, 14, 3000);

      // marco con corchetes arriba-centro
      const b = this.add.container(650, 120);
      const bg = this.add.graphics();
      bg.lineStyle(14, 0x4a2d78, 1).strokeRoundedRect(-180, -90, 360, 180, 46);
      bg.fillStyle(0x4a2d78).fillRoundedRect(-120, -34, 240, 12, 6).fillRoundedRect(-120, -4, 150, 12, 6).fillRoundedRect(-120, 26, 120, 12, 6);
      b.add(bg); b.setAlpha(0.7); near.add(b); this.float(b, 10, 2600);

      // marte (arriba-derecha) y luna
      this.menuMars = this.add.image(1440, 130, 'marte').setDisplaySize(330, 330);
      this.tweens.add({ targets: this.menuMars, angle: 360, duration: 90000, repeat: -1 });
      near.add(this.menuMars); this.float(this.menuMars, 16, 3600);
      const moon = this.add.image(1340, 410, 'luna').setDisplaySize(120, 120);
      near.add(moon); this.float(moon, -14, 2800);
      this.tweens.add({ targets: moon, angle: -360, duration: 70000, repeat: -1 });

      // panel de interruptores (abajo-izquierda)
      const t = this.card(250, 740, 330, 440, 14, 0x5f3292, 0x3b2266);
      [-110, -10, 90].forEach((yy, i) => {
        const track = this.add.rectangle(0, yy, 230, 56, 0x8d5fc9).setRotation(0);
        const knob = this.add.circle(-60, yy, 22, 0xc9a0f0);
        t.add([track, knob]);
        this.tweens.add({ targets: knob, x: 60, duration: 900 + i * 350, yoyo: true, repeat: -1, hold: 700, ease: 'Sine.inOut', delay: i * 400 });
      });
      near.add(t); this.float(t, 10, 3200);

      // panel de barras (abajo-derecha) que sube y baja como un ecualizador
      const e = this.card(1380, 740, 360, 440, -6, 0xa476d8, 0x5f3292);
      [-120, -40, 40, 120].forEach((xx, i) => {
        const track = this.add.rectangle(xx, 0, 40, 330, 0x4a2578);
        const fill = this.add.rectangle(xx, 165, 40, 330, 0xc9a0f0).setOrigin(0.5, 1).setScale(1, 0.3);
        e.add([track, fill]);
        const loop = () => this.tweens.add({
          targets: fill, scaleY: Phaser.Math.FloatBetween(0.15, 0.95), duration: rnd(600, 1400), ease: 'Sine.inOut', onComplete: loop,
        });
        loop();
      });
      near.add(e); this.float(e, 12, 3400);
    }

    shootingStar() {
      if (this.stage !== 'menu') return;
      const s = this.add.image(rnd(100, 900), rnd(30, 200), 'star').setScale(1.4, 0.18).setAngle(28).setTint(0xffffff).setAlpha(0.9);
      this.menuL.addAt(s, 1);
      this.tweens.add({ targets: s, x: s.x + 520, y: s.y + 280, alpha: 0, duration: 800, ease: 'Quad.in', onComplete: () => s.destroy() });
    }

    // ============================================================ INTRO (sala de control)
    buildIntro() {
      const L = this.layer('introL');
      const far = this.parallax(L, 6);
      const near = this.parallax(L, 16);

      const g = this.add.graphics();
      g.fillStyle(0x3d2663).fillRect(0, 0, W, H);
      g.fillStyle(0x2b1649).fillRoundedRect(272, 58, 1060, 400, 26);           // marco del monitor central
      g.fillStyle(0x6a3aa8).fillRoundedRect(296, 84, 1010, 350, 12);           // pantalla
      g.fillStyle(0xa476d8, 0.9).fillEllipse(560, 200, 260, 90).fillEllipse(720, 300, 170, 100).fillEllipse(980, 220, 220, 80);
      g.fillStyle(0xc9a0f0, 0.8).fillEllipse(520, 190, 120, 40).fillEllipse(960, 210, 100, 36);
      g.fillStyle(0x4a2578).fillRoundedRect(0, 136, 322, 270, 10);              // monitor con onda
      g.fillStyle(0x4a2578).fillRoundedRect(1262, 130, 340, 260, 10);           // monitor derecho
      g.fillStyle(0xa476d8).fillRoundedRect(1330, 200, 270, 16, 8).fillRoundedRect(1400, 262, 200, 16, 8).fillRoundedRect(1350, 324, 250, 16, 8);
      g.fillStyle(0x201533).fillRect(0, 700, W, 200);                           // piso
      g.fillStyle(0x6b3aa3).fillPoints([{ x: 0, y: 640 }, { x: W, y: 600 }, { x: W, y: 780 }, { x: 0, y: 790 }], true);
      g.fillStyle(0x8a4cc4).fillPoints([{ x: 0, y: 640 }, { x: W, y: 600 }, { x: W, y: 640 }, { x: 0, y: 684 }], true);
      far.add(g);

      this.wave = this.add.graphics();
      far.add(this.wave);

      // luces del monitor central (parpadean)
      [940, 1000, 1070, 1130].forEach((x, i) => {
        const d = this.add.rectangle(x, 138, 34, 56, i === 1 ? 0xe8e0f5 : 0x2b1649).setOrigin(0.5, 1);
        near.add(d);
        this.tweens.add({ targets: d, alpha: 0.35, duration: 700 + i * 200, yoyo: true, repeat: -1 });
      });

      // silla
      const chair = this.add.graphics();
      chair.fillStyle(0xc9a0f0).fillRoundedRect(1000, 650, 330, 330, 40);
      chair.fillStyle(0x9a6fcf).fillRoundedRect(1030, 690, 270, 250, 30);
      near.add(chair);

      // astronauta (el PNG ya trae los anillos verdes debajo)
      this.shadow = this.add.ellipse(440, 835, 330, 36, 0x000000, 0.25);
      this.astro = this.add.image(440, 285, 'astroSaluda').setOrigin(0.5, 0).setDisplaySize(404, 550);
      near.add([this.shadow, this.astro]);
      this.tweens.add({ targets: this.astro, y: this.astro.y - 18, duration: 1700, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      this.tweens.add({ targets: this.shadow, scaleX: 0.88, alpha: 0.15, duration: 1700, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      this.tweens.add({ targets: this.astro, angle: 2, duration: 2300, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    }

    // ============================================================ CABINA (ventana a Marte)
    buildCabin() {
      const L = this.layer('cabinL');
      const far = this.parallax(L, 10);
      const near = this.parallax(L, 24);
      const wins = [
        { x: 0, y: 90, w: 225, h: 520 },
        { x: 300, y: 125, w: 1010, h: 470 },
        { x: 1380, y: 95, w: 220, h: 545 },
      ];

      far.add(this.add.rectangle(W / 2, H / 2, W, H, 0x47286b));
      const win = this.add.graphics();
      wins.forEach((r) => win.fillStyle(0x201533).fillRoundedRect(r.x, r.y, r.w, r.h, 70));
      far.add(win);
      wins.forEach((r) => far.add(this.starField({ x: r.x + 24, y: r.y + 24, w: r.w - 48, h: r.h - 60 }, r.w > 500 ? 40 : 12)));

      // la Tierra: un puntito azul y frágil
      this.earthGlow = this.add.circle(525, 230, 46, 0x4a76c0, 0.18);
      this.earth = this.add.circle(525, 230, 30, 0x4a76c0);
      far.add([this.earthGlow, this.earth]);
      this.tweens.add({ targets: this.earthGlow, scale: 1.35, alpha: 0.05, duration: 2200, yoyo: true, repeat: -1, ease: 'Sine.inOut' });

      // Planeta grande (Marte o Luna, según la misión elegida)
      this.mars = this.add.image(1010, 490, 'marte');
      far.add(this.mars);
      this.planetTex = null; this.planet = 'marte';
      this.placePlanet('marte');

      // marcos de las ventanas + consola, delante de Marte
      const frame = this.add.graphics();
      wins.forEach((r) => frame.lineStyle(16, 0x8f5fc7).strokeRoundedRect(r.x, r.y, r.w, r.h, 70));
      near.add(frame);
      const con = this.add.graphics();
      con.fillStyle(0x2f1b4f).fillEllipse(800, 930, 2300, 700);
      con.fillStyle(0x47286b).fillEllipse(800, 980, 1900, 640);
      con.fillStyle(0x3a2260).fillRoundedRect(1180, 760, 330, 130, 30).fillRoundedRect(60, 770, 330, 120, 30);
      near.add(con);
      [0x72f0a0, 0xffd166, 0xff8a8f].forEach((c, i) => {
        const led = this.add.circle(1230 + i * 44, 825, 10, c);
        near.add(led);
        this.tweens.add({ targets: led, alpha: 0.25, duration: 600 + i * 330, yoyo: true, repeat: -1 });
      });

      // astronauta de espaldas, mirando por la ventana
      this.back = this.add.image(415, 330, 'astroEspal').setOrigin(0.5, 0).setDisplaySize(370, 580);
      near.add(this.back);

      // astronauta de frente (pantalla "Elige tu misión")
      this.front = this.add.image(408, 1065, 'astroFrente').setOrigin(0.5, 1).setDisplaySize(540, 800).setVisible(false);
      near.add(this.front);
      this.tweens.add({ targets: this.front, y: this.front.y + 10, duration: 2400, yoyo: true, repeat: -1, ease: 'Sine.inOut' });

      this.tweens.add({ targets: this.back, y: this.back.y + 8, scaleY: this.back.scaleY * 1.012, duration: 2600, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    }

    // cambia el planeta de la ventana (luna.png / marte.png, ya incluidos en el proyecto)
    placePlanet(tex) {
      if (this.planetTex === tex) return;
      this.planetTex = tex;
      this.tweens.killTweensOf(this.mars);
      this.mars.setTexture(tex).setDisplaySize(430, 430).setAngle(0);
      this.tweens.add({ targets: this.mars, scale: this.mars.scale * 1.03, duration: 5000, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      this.tweens.add({ targets: this.mars, angle: 360, duration: 240000, repeat: -1 });
    }

    onMission({ planet, max }) {
      this.planet = planet;
      if (max) Object.keys(max).forEach((k) => { if (METRICS[k]) METRICS[k].max = max[k]; });
      if (this.stage && this.stage !== 'select') this.placePlanet(planet);
    }

    // ============================================================ HUD de recursos
    buildHud() {
      const hud = this.add.container(1156, 28).setDepth(20);
      this.hud = hud;
      const bg = this.add.graphics();
      bg.fillStyle(0x2a0f4a, 0.9).fillRoundedRect(0, 0, 410, 314, 34);
      bg.lineStyle(6, 0x6fd49a, 1).strokeRoundedRect(0, 0, 410, 314, 34);
      hud.add(bg);
      this.rows = {};
      Object.entries(METRICS).forEach(([k, m], i) => {
        const y = 40 + i * 58;
        const label = this.add.text(28, y, m.label, { fontFamily: FONT, fontSize: '20px', color: '#c9f5d9' }).setOrigin(0, 0.5);
        const track = this.add.rectangle(140, y, 160, 18, 0x47086b).setOrigin(0, 0.5);
        const fill = this.add.rectangle(140, y, 160, 18, m.color).setOrigin(0, 0.5);
        const val = this.add.text(382, y, '', { fontFamily: FONT, fontSize: '20px', fontStyle: 'bold', color: '#ffffff' }).setOrigin(1, 0.5);
        hud.add([label, track, fill, val]);
        this.rows[k] = { fill, val, y, shown: 0 };
      });
    }

    setBar(k, v) {
      const m = METRICS[k]; const row = this.rows[k];
      const ratio = Phaser.Math.Clamp(v / m.max, 0, 1);
      row.fill.width = Math.max(4, 160 * ratio);
      row.fill.setFillStyle(ratio < 0.25 ? 0xff5d6c : m.color);
      row.val.setText(`${Math.round(v * 10) / 10}${m.unit}`);
    }

    onResources(res) {
      if (!this.rows) return;
      let worse = false; let better = false;
      Object.keys(METRICS).forEach((k) => {
        const v = res[k]; const row = this.rows[k];
        const before = this.prev ? this.prev[k] : v;
        if (!this.prev || before === v) { this.setBar(k, v); row.shown = v; return; }
        const d = Math.round((v - before) * 10) / 10;
        if (d < 0) worse = true; else better = true;
        this.tweens.addCounter({
          from: before, to: v, duration: 700, ease: 'Cubic.out',
          onUpdate: (t) => this.setBar(k, t.getValue()), onComplete: () => this.setBar(k, v),
        });
        row.shown = v;
        this.floatText(k, d);
      });
      this.prev = { ...res };
      if (worse) this.hit(); else if (better) this.burst(this.hud.x + 200, this.hud.y + 150, 0x72f0a0, 14);
    }

    // Cifra que sube o baja junto a la barra. Se queda 4.5 s y luego se desvanece en 0.8 s.
    floatText(k, d) {
      const m = METRICS[k]; const row = this.rows[k];
      this.floats = this.floats || {};
      if (this.floats[k]) { this.tweens.killTweensOf(this.floats[k]); this.floats[k].destroy(); }
      const t = this.add.text(this.hud.x - 20, this.hud.y + row.y, `${d > 0 ? '+' : ''}${d}${m.unit}`, {
        fontFamily: FONT, fontSize: '28px', fontStyle: 'bold', color: d > 0 ? '#72f0a0' : '#ff5d6c', stroke: '#1e1530', strokeThickness: 6,
      }).setOrigin(1, 0.5).setDepth(30);
      this.floats[k] = t;
      this.tweens.add({ targets: t, x: t.x - 30, y: t.y - 12, duration: 500, ease: 'Cubic.out' });
      this.tweens.add({
        targets: t, alpha: 0, delay: 4500, duration: 800, ease: 'Quad.out',
        onComplete: () => { t.destroy(); if (this.floats[k] === t) delete this.floats[k]; },
      });
    }

    // daño: sacudida + destello rojo
    hit() {
      this.cameras.main.shake(260, 0.006);
      this.flash.setAlpha(0.28);
      this.tweens.add({ targets: this.flash, alpha: 0, duration: 520 });
    }

    burst(x, y, tint = 0x72f0a0, n = 8) {
      const e = this.add.particles(x, y, 'spark', {
        speed: { min: 90, max: 280 }, angle: { min: 0, max: 360 }, lifespan: 600,
        scale: { start: 0.8, end: 0 }, rotate: { min: 0, max: 360 }, tint, emitting: false,
      }).setDepth(40);
      e.explode(n);
      this.time.delayedCall(800, () => e.destroy());
    }

    onDay() {
      sfx.day?.();
      if (this.mars) this.tweens.add({ targets: this.mars, angle: this.mars.angle + 20, duration: 900, ease: 'Cubic.out' });
      this.burst(1010, 330, 0xc9f5d9, 10);
    }

    // ============================================================ escenarios
    setStage(name, instant = false) {
      if (!name) return;
      if (this.busy) { this.pending = name; return; }
      if (name === this.stage) return;

      const inCabin = (s) => ['window', 'select', 'briefing', 'cabin'].includes(s);
      const apply = () => {
        this.menuL.setVisible(name === 'menu');
        this.introL.setVisible(name === 'intro');
        this.cabinL.setVisible(inCabin(name));
        this.back.setVisible(name === 'window' || name === 'cabin');
        this.front.setVisible(name === 'select');
        if (inCabin(name)) this.placePlanet(name === 'select' ? 'marte' : this.planet);
        this.hud.setVisible(name === 'cabin');
        if (name === 'cabin') { this.hud.setAlpha(0); this.tweens.add({ targets: this.hud, alpha: 1, duration: 400 }); }
        this.stage = name;
      };

      const sameLayer = inCabin(name) && inCabin(this.stage);
      if (instant || !this.stage || sameLayer) { apply(); return; }

      const cam = this.cameras.main;
      this.busy = true;
      cam.fadeOut(200, 35, 19, 56);
      cam.once('camerafadeoutcomplete', () => {
        apply();
        cam.fadeIn(260, 35, 19, 56);
        cam.once('camerafadeincomplete', () => {
          this.busy = false;
          if (this.pending) { const p = this.pending; this.pending = null; this.setStage(p); }
        });
      });
    }

    update(time) {
      // parallax suave con el puntero
      this.px += (this.tx - this.px) * 0.06;
      this.py += (this.ty - this.py) * 0.06;
      this.par.forEach(({ c, f }) => c.setPosition(-this.px * f * 2, -this.py * f * 2));

      // onda del monitor (sala de control)
      if (this.stage === 'intro') {
        const g = this.wave; g.clear(); g.lineStyle(10, 0xa476d8, 1); g.beginPath();
        for (let i = 0; i <= 9; i += 1) {
          const x = 20 + i * 30;
          const y = 270 + Math.sin(time / 380 + i * 1.4) * 70 * (i % 2 ? 1 : -0.7);
          if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
        }
        g.strokePath();
      }
    }
  };
}
