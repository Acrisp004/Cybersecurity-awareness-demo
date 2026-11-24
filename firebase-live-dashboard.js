// Presenter-only, Google-authenticated dashboard for fictional  data.
// Google sign-in is already enabled on the user's Firebase project.
import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const login = document.getElementById('google-login');
const logout = document.getElementById('google-logout');
const uid = document.getElementById('instructor-uid');
const status = document.getElementById('dashboard-status');
const sessions = document.getElementById('session-list');
const count = document.getElementById('session-count');
const signedIn = document.getElementById('signed-in');
const say = message => { status.textContent = message; };
let unsubscribe = null;
let lastRows = [];
const labels = [
  ['fullName','Full name'], ['email','Email'], ['phone','Phone'],
  ['street','Street address'], ['city','City'], ['state','State'],
  ['zip','ZIP code'], ['cardCode','Four-digit practice code'], ['expiry','Example expiration']
];

function render(records) {
  sessions.replaceChildren();
  count.textContent = String(records.length);
  if (!records.length) {
    const p = document.createElement('p');
    p.textContent = 'No active User sessions. Have a classmate opt into live sharing on the checkout page.';
    p.className = 'muted';
    sessions.append(p);
    return;
  }
  for (const [sessionId, record] of records) {
    const card = document.createElement('section');
    card.className = 'session';
    const heading = document.createElement('h3');
    heading.textContent = 'User session ' + sessionId.slice(0,8);
    const meta = document.createElement('p');
    meta.className = 'muted';
    const time = record.updatedAt ? new Date(record.updatedAt).toLocaleTimeString() : 'Unknown';
    meta.textContent = 'Updated ' + time + ' · ' + (record.status || 'editing');
    card.append(heading, meta);
    const dl = document.createElement('dl');
    dl.className = 'field-grid';
    for (const [id, label] of labels) {
      const item = record.fields?.[id] || {};
      const dt = document.createElement('dt');
      dt.textContent = label;
      const dd = document.createElement('dd');
      dd.textContent = typeof item.value === 'string' && item.value.length ? item.value :
        Number(item.length) > 0 ? `Typing… (${item.length} characters)` : '—';
      dl.append(dt, dd);
    }
    card.append(dl);
    sessions.append(card);
  }
}
login.addEventListener('click', async () => {
  login.disabled = true;
  say('Signing in with Google…');
  try { await signInWithPopup(auth, new GoogleAuthProvider()); }
  catch (e) { say('Google sign-in failed. Check pop-up blocking and Authorized domains in Firebase.'); }
  finally { login.disabled = false; }
});
logout.addEventListener('click', async () => { await signOut(auth); });

onAuthStateChanged(auth, user => {
  if (unsubscribe) { unsubscribe(); unsubscribe = null; }
  render([]);
  login.hidden = !!user;
  signedIn.hidden = !user;
  if (!user) {
    uid.textContent = '';
    say('Sign in using Google to get your presenter UID.');
    return;
  }
  uid.textContent = user.uid;
  say('Signed in. Checking Firebase database rules…');
  // Publishing a rule pinned to this UID is REQUIRED for the read to succeed.
  unsubscribe = onValue(ref(database, 'classroomSessions'), snap => {
    const rows = Object.entries(snap.val() || {}).sort(([,a],[,b]) => (b.updatedAt||0) - (a.updatedAt||0));
    render(rows);
    say('Connected to Firebase · Live updates on');
  }, error => {
    render([]);
    say('Signed in, but reading is blocked. Copy the UID above into firebase-rules.json and publish those rules.');
  });
});
