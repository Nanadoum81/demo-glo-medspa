(function () {
  // --- Contact form ---
  var form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    form.style.display = 'none';
    var ok = document.getElementById('contactOk');
    if (ok) { ok.style.display = 'block'; ok.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  });

  // --- Camila, Glo's front desk ---
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
