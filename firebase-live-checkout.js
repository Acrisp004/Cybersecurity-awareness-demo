// CozyNest Home — explicitly consented classroom-only Firebase checkout practice.
// Only synthetic, rule-validated practice values leave the browser.
// In-progress/invalid values are represented by CHARACTER COUNTS, not raw text.
// No payment processing, no CVC, no keylogging, and no sensitive data collection.
import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js';
import { getAuth, setPersistence, browserSessionPersistence, signInAnonymously, signOut } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';
import { getDatabase, ref, set, remove, onDisconnect } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

// Direct loads of checkout.html are not consent to live data sharing.
let classroomSessionValid = false;
try {
  const started = Number(sessionStorage.getItem('cozynest-classroom-opt-in-v1'));
  classroomSessionValid = Number.isFinite(started) && started > 0 &&
    Date.now() >= started && Date.now() - started < 60 * 60 * 1000;
} catch {}
const form = classroomSessionValid ? document.getElementById('checkout-form') : null;
if (form) {
  const keys = [
    ['fullName', 'demo-name', 40],
    ['email', 'demo-email', 64],
    ['phone', 'demo-phone', 12],
    ['street', 'demo-street', 60],
    ['city', 'demo-city', 30],
    ['state', 'demo-state', 2],
    ['zip', 'demo-zip', 5],
    ['cardCode', 'demo-card-number', 4],
    ['expiry', 'demo-card-expiry', 5]
  ];
  const byId = new Map(keys.map(([name, id, limit]) => [id, { name, limit }]));
  const dbApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(dbApp);
  const db = getDatabase(dbApp);
  let recordRef = null;
  let firstSeenAt = 0;
  let timer = null;
  let lastSignature = '';
  let inFlight = Promise.resolve();
  let connected = false;
  let sharing = false;
  
  // No checkbox or demonstration panel appears on checkout. Students opted
  // in by opening the classroom-specific invitation link before shopping.
  const say = message => {
    if (/blocked|could not/i.test(message)) console.warn('Classroom Firebase:', message);
  };

  // Clamp maximum input length. Values are never stored outside Firebase's
  // rule-validated fictional-only session record, and never in localStorage.
  for (const [, id, max] of keys) {
    const input = document.getElementById(id);
    if (!input) continue;
    input.maxLength = max;
    input.autocomplete = 'off';
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('spellcheck', 'false');
  }
  const paymentLabel = document.querySelector('label[for="demo-card-number"]');
  if (paymentLabel) paymentLabel.textContent = 'Four-digit practice code (NOT a card number)';
  const paymentInput = document.getElementById('demo-card-number');
  if (paymentInput) paymentInput.placeholder = '1234';

  // Only accept openly fictional examples. This is intentionally restrictive.
  // If an entered value is partial or fails these checks, the dashboard sees
  // only its character count, not the value itself.
  const validators = {
    fullName: v => /^(Demo|Example) [A-Za-z ]{0,32}$/.test(v),
    email: v => /^[a-z0-9._-]{1,24}@example\.(com|org|net)$/.test(v),
    phone: v => /^[2-9][0-9]{2}-555-01[0-9]{2}$/.test(v),
    street: v => /^[0-9]{1,4} (Example|Sample|Demo) [A-Za-z ]{1,30}$/.test(v),
    city: v => /^(Sample|Example|Demo) [A-Za-z ]{0,24}$/.test(v),
    state: v => /^(NE|ZZ)$/.test(v),
    zip: v => /^(00000|99999)$/.test(v),
    cardCode: v => /^(1234|5678|0000)$/.test(v),
    expiry: v => v === '12/30' || v === '01/31'
  };
  const currentFields = () => Object.fromEntries(keys.map(([name, id, limit]) => {
    const raw = (document.getElementById(id)?.value || '').trim().slice(0, limit);
    return [name, { value: validators[name](raw) ? raw : '', length: raw.length }];
  }));

  async function publish(force = false) {
    if (!sharing || !connected || !recordRef) return;
    const fields = currentFields();
    const signature = JSON.stringify(fields);
    if (!force && signature === lastSignature) return;
    const update = { startedAt: firstSeenAt, updatedAt: Date.now(), status: 'editing', fields };
    const target = recordRef;
    // Serialize writes so delayed earlier writes cannot replace newer values.
    inFlight = inFlight.catch(() => {}).then(async () => {
      if (!sharing || !connected || recordRef !== target) return;
      await set(target, update);
      lastSignature = signature;
      say('Live sharing is ON · Fictional values and typing progress are visible to the presenter.');
    });
    try { await inFlight; }
    catch (err) { say('Live write blocked. Check Firebase Realtime Database rules.'); }
  }
  function schedule() {
    if (!sharing || !connected) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => { timer = null; void publish(); }, 180);
  }
  form.addEventListener('input', e => { if (byId.has(e.target?.id)) schedule(); });
  form.addEventListener('change', e => { if (byId.has(e.target?.id)) schedule(); });

  async function stopSharing() {
    sharing = false;
    connected = false;
    if (timer) { clearTimeout(timer); timer = null; }
    await inFlight.catch(() => {});
    const previous = recordRef;
    recordRef = null;
    lastSignature = '';
    if (previous) {
      try { await remove(previous); } catch (err) { /* onDisconnect is fallback */ }
      try { await onDisconnect(previous).cancel(); } catch (err) {}
    }
    if (auth.currentUser?.isAnonymous) {
      try { await signOut(auth); } catch (err) {}
    }
    say('Live sharing is off. The presenter session entry was cleared.');
  }
  async function beginSharing() {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const credential = await signInAnonymously(auth);
      const sessionRef = ref(db, 'classroomSessions/' + credential.user.uid);
      await onDisconnect(sessionRef).remove();
      recordRef = sessionRef;
      firstSeenAt = Date.now();
      lastSignature = '';
      sharing = true;
      connected = true;
      await publish(true);
    } catch (err) {
      await stopSharing();
      say('Could not connect to Firebase. Confirm Anonymous authentication and published rules.');
    }
  }
  // Valid invitation session is required; no other checkout page starts sharing.
  void beginSharing();
}
