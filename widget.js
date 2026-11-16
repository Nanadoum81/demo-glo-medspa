(function () {
  // --- Sample conversation replay ---
  var msgs = Array.prototype.slice.call(document.querySelectorAll('#simMsgs .msg'));
  var done = document.getElementById('simDone');
  var timers = [];
  function playSim() {
    timers.forEach(clearTimeout); timers = [];
    msgs.forEach(function (m) { m.classList.remove('show'); });
    if (done) done.classList.remove('show');
    msgs.forEach(function (m, i) {
      timers.push(setTimeout(function () { m.classList.add('show'); }, 500 + i * 1100));
    });
    timers.push(setTimeout(function () { if (done) done.classList.add('show'); }, 500 + msgs.length * 1100 + 300));
  }
  var replay = document.getElementById('simReplay');
  if (replay) replay.addEventListener('click', playSim);
  if ('IntersectionObserver' in window && msgs.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { playSim(); io.disconnect(); } });
    }, { threshold: 0.3 });
    io.observe(document.getElementById('simMsgs'));
  } else { playSim(); }

  // --- Demo form ---
  var form = document.getElementById('bookForm');
  if (form) form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    form.style.display = 'none';
    var ok = document.getElementById('bookOk');
    if (ok) { ok.style.display = 'block'; ok.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  });

  // --- Camila chat demo ---
  var BIZ = window.BIZ || {};
  var kb = BIZ.kb || {};
  var panel = document.getElementById('chatPanel');
  var openBtn = document.getElementById('chatOpen');
  var body = document.getElementById('cpBody');
  var quick = document.getElementById('cpQuick');
  var greeted = false;
  function addMsg(text, me) {
    var d = document.createElement('div');
    d.className = 'cp-msg' + (me ? ' me' : '');
    d.textContent = text;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  }
  function answer(q) {
    var t = q.toLowerCase();
    if (/(book|appointment|consult)/.test(t)) return kb.book;
    if (/(price|cost|much)/.test(t)) return kb.price;
    if (/(where|located|address|direction)/.test(t)) return kb.location;
    if (/(hour|open|when)/.test(t)) return kb.hours;
    if (/(service|offer|treatment|botox|filler|laser|facial)/.test(t)) return kb.services;
    return "I can help with services, booking, directions and hours — or tap Book above and I'll capture your request right now.";
  }
  var questions = ['What services do you offer?', 'Can I book a consultation?', 'What does it cost?', 'Where are you located?'];
  questions.forEach(function (q) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = q;
    b.addEventListener('click', function () {
      addMsg(q, true);
      setTimeout(function () { addMsg(answer(q), false); }, 450);
    });
    quick.appendChild(b);
  });
  if (openBtn) openBtn.addEventListener('click', function () {
    panel.classList.toggle('open');
    if (panel.classList.contains('open') && !greeted) {
      greeted = true;
      var g = document.getElementById('cpGreeting');
      if (g) g.textContent = kb.greeting || '';
    }
  });
})();
