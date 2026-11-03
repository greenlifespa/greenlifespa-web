/* Green Life Spa – đặt lịch trực tuyến.
 * Gửi lịch về hệ thống của ứng dụng Green Life Spa (cùng cơ sở dữ liệu + cùng bot), không tạo hồ sơ khách,
 * không có nạp tiền, luôn là lịch CHƯA THANH TOÁN (thu tiền mặt tại spa).
 */
(function () {
  'use strict';

  /* ── CẤU HÌNH ── */
  var API = 'https://greenlifespa-api.vinhluong0501.workers.dev/api'; // địa chỉ API (kết thúc bằng /api). Bản chính: https://greenlifespa-api.vinhluong0501.workers.dev/api
  var TURNSTILE_SITEKEY = '';   // Site Key Turnstile (công khai) của trang web THẬT. Để trống ('') = chưa bật Cloudflare Turnstile
  var OPEN_MIN = 570;           // 09:30 – giờ mở cửa hiển thị trên web (ứng dụng cho phép từ 08:00)
  var LAST_START = 1200;        // 20:00 – giờ bắt đầu muộn nhất trên web (ứng dụng cho phép đến 20:30)
  var STEP = 30;                // bước 30 phút
  var MAX_PKGS = 4;             // tối đa số gói trong 1 lịch
  var MAX_DAYS = 60;            // chỉ nhận đặt trước tối đa 60 ngày
  var HOTLINE = '0985.009.674';
  window.GL_API_BASE = API;
  window.GL_TURNSTILE_SITEKEY = TURNSTILE_SITEKEY;

  var $ = function (id) { return document.getElementById(id); };
  var root = $('wbRoot');
  if (!root) return;

  var services = [], mains = [], addons = [], staff = [];
  var pkgs = [{ svc: '', staff: '', adds: {} }];
  var state = { date: '', time: '', key: '', token: '' };
  var busyCache = {};
  var slotSeq = 0;
  var sending = false;

  /* ── tiện ích ── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function money(n) { return Number(n || 0).toLocaleString('vi-VN'); }
  function vnNow() { return new Date(Date.now() + 7 * 3600 * 1000); }
  function p2(n) { return (n < 10 ? '0' : '') + n; }
  function dateStr(d) { return d.getUTCFullYear() + '-' + p2(d.getUTCMonth() + 1) + '-' + p2(d.getUTCDate()); }
  function todayStr() { return dateStr(vnNow()); }
  function plusDays(n) { return dateStr(new Date(vnNow().getTime() + n * 86400000)); }
  function nowMin() { var d = vnNow(); return d.getUTCHours() * 60 + d.getUTCMinutes(); }
  function toMin(t) { var m = /^(\d{1,2}):(\d{2})$/.exec(String(t || '')); return m ? Number(m[1]) * 60 + Number(m[2]) : -1; }
  function hhmm(m) { return p2(Math.floor(m / 60)) + ':' + p2(m % 60); }
  function fmtDate(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? m[3] + '/' + m[2] + '/' + m[1] : s; }
  function isAddon(s) { return String(s.cat || '').replace(/\s+/g, ' ').trim().toLowerCase() === 'dịch vụ thêm'; }
  function durOf(s) { return Number(s.duration) > 0 ? Number(s.duration) : (isAddon(s) ? 0 : 60); }
  function svcById(id) { for (var i = 0; i < services.length; i++) if (String(services[i].id) === String(id)) return services[i]; return null; }
  function staffById(id) { for (var i = 0; i < staff.length; i++) if (String(staff[i].id) === String(id)) return staff[i]; return null; }
  function newKey() {
    var a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', out = '', i;
    var buf = new Uint8Array(24);
    if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(buf);
    else for (i = 0; i < 24; i++) buf[i] = Math.floor(Math.random() * 256);
    for (i = 0; i < 24; i++) out += a.charAt(buf[i] % a.length);
    return out;
  }
  function resetKey() { state.key = ''; }

  async function api(path, opts) {
    try {
      var res = await fetch(API + path, opts);
      var data = null;
      try { data = await res.json(); } catch (e) { data = null; }
      return { status: res.status, ok: res.ok, data: data };
    } catch (e) {
      return { status: 0, ok: false, data: null, net: true };
    }
  }

  /* ── tính toán gói / giờ ── */
  function complete() {
    for (var i = 0; i < pkgs.length; i++) if (!pkgs[i].svc || !pkgs[i].staff) return false;
    return pkgs.length > 0;
  }
  function totals() {
    var total = 0, dur = 0;
    pkgs.forEach(function (p) {
      var s = svcById(p.svc);
      if (s) { total += Number(s.price) || 0; dur += durOf(s); }
      Object.keys(p.adds).forEach(function (id) {
        if (!p.adds[id]) return;
        var a = svcById(id);
        if (a) { total += Number(a.price) || 0; dur += durOf(a); }
      });
    });
    return { total: total, dur: dur > 0 ? dur : 60 };
  }
  function serviceIds() {
    var ids = [];
    pkgs.forEach(function (p) {
      ids.push(Number(p.svc));
      addons.forEach(function (a) { if (p.adds[a.id]) ids.push(Number(a.id)); });
    });
    return ids;
  }
  function staffIds() { return pkgs.map(function (p) { return Number(p.staff); }); }
  function isOff(st, date) { return !!(st && date && st.off_days && st.off_days.indexOf(date) >= 0); }

  /* ── vẽ giao diện ── */
  function renderPkgs() {
    var box = $('wbPkgs');
    var html = '';
    pkgs.forEach(function (p, i) {
      html += '<div class="wb-pkg" data-i="' + i + '">';
      html += '<div class="wb-pkg-top"><b>Gói ' + (i + 1) + '</b>' +
        (pkgs.length > 1 ? '<button type="button" class="wb-x" data-del="' + i + '" aria-label="Bỏ gói ' + (i + 1) + '">✕ Bỏ gói</button>' : '') + '</div>';
      html += '<div class="form-row-2">';
      html += '<div class="fg"><label for="wbSvc' + i + '">Dịch vụ *</label><select id="wbSvc' + i + '" data-svc="' + i + '"><option value="">-- Chọn dịch vụ --</option>';
      mains.forEach(function (s) {
        html += '<option value="' + esc(s.id) + '"' + (String(p.svc) === String(s.id) ? ' selected' : '') + '>' + esc(s.name) + ' – ' + money(s.price) + 'đ</option>';
      });
      html += '</select></div>';
      html += '<div class="fg"><label for="wbSt' + i + '">Nhân viên *</label><select id="wbSt' + i + '" data-st="' + i + '"><option value="">-- Chọn nhân viên --</option>';
      staff.forEach(function (s) {
        var off = isOff(s, state.date);
        html += '<option value="' + esc(s.id) + '"' + (String(p.staff) === String(s.id) ? ' selected' : '') + (off ? ' disabled' : '') + '>' + esc(s.name) + (off ? ' (nghỉ ngày này)' : '') + '</option>';
      });
      html += '</select></div></div>';
      if (p.svc && addons.length) {
        html += '<div class="wb-adds"><span class="wb-adds-t">Dịch vụ thêm (tuỳ chọn):</span>';
        addons.forEach(function (a) {
          html += '<label class="wb-chk"><input type="checkbox" data-add="' + i + '" data-aid="' + esc(a.id) + '"' + (p.adds[a.id] ? ' checked' : '') + '> ' + esc(a.name) + ' (+' + money(a.price) + 'đ)</label>';
        });
        html += '</div>';
      }
      html += '</div>';
    });
    box.innerHTML = html;
    $('wbAddPkg').style.display = pkgs.length >= MAX_PKGS ? 'none' : '';
    renderSum();
  }

  function renderSum() {
    var el = $('wbSum');
    var ok = pkgs.some(function (p) { return p.svc; });
    if (!ok) { el.innerHTML = ''; return; }
    var t = totals();
    el.innerHTML = 'Tạm tính: <b>' + money(t.total) + ' VNĐ</b> · thời gian khoảng <b>' + t.dur + ' phút</b> · thanh toán tiền mặt tại spa';
  }

  async function loadBusy(date) {
    var c = busyCache[date];
    if (c && Date.now() - c.t < 45000) return c.list;
    var r = await api('/public/busy?date=' + encodeURIComponent(date));
    if (r.ok && r.data && Array.isArray(r.data.busy)) {
      busyCache[date] = { t: Date.now(), list: r.data.busy };
      return r.data.busy;
    }
    return null;
  }

  async function refreshSlots() {
    var box = $('wbSlots');
    var seq = ++slotSeq;
    if (!state.date) { box.innerHTML = '<span class="wb-hint">Chọn ngày để xem giờ trống.</span>'; return; }
    if (!complete()) { box.innerHTML = '<span class="wb-hint">Chọn dịch vụ và nhân viên cho từng gói để xem giờ trống.</span>'; return; }
    box.innerHTML = '<span class="wb-hint">Đang kiểm tra giờ trống…</span>';
    var busy = await loadBusy(state.date);
    if (seq !== slotSeq) return;
    if (busy === null) { box.innerHTML = '<span class="wb-hint wb-bad">Chưa tải được giờ trống. <button type="button" class="wb-link" id="wbRetrySlots">Thử lại</button></span>'; return; }
    var dur = totals().dur, ids = staffIds().map(String), isToday = state.date === todayStr(), nm = nowMin();
    var anyOff = pkgs.some(function (p) { return isOff(staffById(p.staff), state.date); });
    var html = '', free = 0;
    for (var m = OPEN_MIN; m <= LAST_START; m += STEP) {
      var ok = !anyOff && !(isToday && m <= nm);
      if (ok) {
        for (var k = 0; k < busy.length && ok; k++) {
          var b = busy[k], bs = toMin(b.time), be = bs + (Number(b.mins) || 60);
          var share = (b.staff_ids || []).some(function (x) { return ids.indexOf(String(x)) >= 0; });
          if (share && bs >= 0 && m < be && m + dur > bs) ok = false;
        }
      }
      if (ok) free++;
      var t = hhmm(m);
      html += '<button type="button" class="wb-slot' + (state.time === t && ok ? ' on' : '') + '" data-t="' + t + '"' + (ok ? '' : ' disabled') + '>' + t + '</button>';
    }
    if (!free) html = '<span class="wb-hint wb-bad">Ngày này đã hết giờ trống với nhân viên đã chọn. Vui lòng chọn ngày khác hoặc nhân viên khác.</span>';
    if (state.time && html.indexOf('data-t="' + state.time + '" disabled') >= 0) state.time = '';
    box.innerHTML = html;
  }

  function showErr(msg) {
    var el = $('wbErr');
    el.textContent = msg || '';
    el.style.display = msg ? '' : 'none';
  }

  /* ── gửi lịch ── */
  async function submit(e) {
    e.preventDefault();
    if (sending) return;
    showErr('');
    var name = $('wbName').value.replace(/\s+/g, ' ').trim();
    var phone = $('wbPhone').value.trim();
    var digits = phone.replace(/\D/g, '');
    if (name.length < 2) return showErr('Vui lòng nhập họ và tên.');
    if (digits.length < 9 || digits.length > 12) return showErr('Số điện thoại chưa đúng, vui lòng kiểm tra lại.');
    if (!complete()) return showErr('Vui lòng chọn dịch vụ và nhân viên cho từng gói.');
    if (!state.date) return showErr('Vui lòng chọn ngày.');
    if (!state.time) return showErr('Vui lòng chọn giờ.');
    if (TURNSTILE_SITEKEY && !state.token) return showErr('Vui lòng hoàn tất bước xác minh "tôi không phải người máy".');
    if (!state.key) state.key = newKey();
    sending = true;
    var btn = $('wbSubmit');
    btn.disabled = true; btn.textContent = 'Đang gửi lịch…';
    var body = {
      name: name, phone: phone,
      service_ids: serviceIds(), staff_ids: staffIds(),
      date: state.date, time: state.time,
      web_key: state.key, website: $('wbHp').value, cf_token: state.token || undefined
    };
    var r = await api('/web-book', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    sending = false;
    btn.disabled = false; btn.textContent = 'Đặt lịch';
    if (r.net) return showErr('Không kết nối được. Vui lòng kiểm tra mạng rồi thử lại, hoặc gọi ' + HOTLINE + '.');
    var d = r.data || {};
    if (r.ok && d.ok === true) {
      if (!d.booking) { resetAll(); return; }
      showDone(d);
      return;
    }
    if (r.status === 429) return showErr(d.error || 'Bạn thao tác quá nhanh, vui lòng thử lại sau 1 phút.');
    showErr(d.msg || d.error || 'Chưa đặt được lịch, vui lòng thử lại hoặc gọi ' + HOTLINE + '.');
    if (['staff_busy', 'past_time', 'bad_time', 'staff_off', 'past_date'].indexOf(d.code) >= 0) {
      state.time = ''; busyCache = {}; refreshSlots();
    }
    if (window.turnstile && state.token) { try { window.turnstile.reset(); } catch (x) {} state.token = ''; }
  }

  function showDone(d) {
    var b = d.booking;
    $('wbForm').style.display = 'none';
    var el = $('wbDone');
    el.innerHTML =
      '<div class="wb-done-ic">✅</div>' +
      '<h4>' + (d.dup ? 'Lịch này đã được ghi nhận trước đó' : 'Đã ghi nhận lịch của bạn') + '</h4>' +
      '<div class="wb-done-card">' +
      '<div><span>Mã lịch</span><b>#' + esc(b.id) + '</b></div>' +
      '<div><span>Dịch vụ</span><b>' + esc(b.service) + '</b></div>' +
      '<div><span>Nhân viên</span><b>' + esc(b.staff_names) + '</b></div>' +
      '<div><span>Thời gian</span><b>' + esc(fmtDate(b.date)) + ' lúc ' + esc(b.time) + '</b></div>' +
      '<div><span>Thanh toán</span><b>' + money(d.due != null ? d.due : b.amount) + ' VNĐ – tiền mặt tại spa</b></div>' +
      '</div>' +
      '<p class="wb-done-note">Nếu cần đổi hoặc huỷ lịch, vui lòng gọi <a href="tel:0985009674">' + HOTLINE + '</a> hoặc nhắn Zalo <a href="https://zalo.me/0917948706">0917.948.706</a>.</p>' +
      '<button type="button" class="btn-outline-sm" id="wbAgain">Đặt thêm lịch khác</button>';
    el.style.display = '';
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    busyCache = {};
  }

  function resetAll() {
    pkgs = [{ svc: '', staff: '', adds: {} }];
    state.time = ''; state.key = '';
    $('wbForm').reset();
    state.date = '';
    $('wbDone').style.display = 'none';
    $('wbForm').style.display = '';
    showErr('');
    renderPkgs(); refreshSlots();
    if (window.turnstile && TURNSTILE_SITEKEY) { try { window.turnstile.reset(); } catch (x) {} state.token = ''; }
  }

  /* ── sự kiện ── */
  function onChange(e) {
    var t = e.target;
    if (t.hasAttribute('data-svc')) {
      var i = Number(t.getAttribute('data-svc'));
      pkgs[i].svc = t.value; pkgs[i].adds = {};
      resetKey(); state.time = ''; renderPkgs(); refreshSlots();
    } else if (t.hasAttribute('data-st')) {
      pkgs[Number(t.getAttribute('data-st'))].staff = t.value;
      resetKey(); state.time = ''; refreshSlots();
    } else if (t.hasAttribute('data-add')) {
      pkgs[Number(t.getAttribute('data-add'))].adds[t.getAttribute('data-aid')] = t.checked;
      resetKey(); state.time = ''; renderSum(); refreshSlots();
    } else if (t.id === 'wbDate') {
      state.date = t.value; state.time = ''; resetKey();
      pkgs.forEach(function (p) { if (isOff(staffById(p.staff), state.date)) p.staff = ''; });
      renderPkgs(); refreshSlots();
    } else if (t.id === 'wbName' || t.id === 'wbPhone') {
      resetKey();
    }
  }

  function onClick(e) {
    var t = e.target;
    var del = t.closest ? t.closest('[data-del]') : null;
    if (del) {
      pkgs.splice(Number(del.getAttribute('data-del')), 1);
      resetKey(); state.time = ''; renderPkgs(); refreshSlots();
      return;
    }
    var slot = t.closest ? t.closest('.wb-slot') : null;
    if (slot && !slot.disabled) {
      state.time = slot.getAttribute('data-t'); resetKey();
      var all = $('wbSlots').querySelectorAll('.wb-slot');
      for (var i = 0; i < all.length; i++) all[i].classList.toggle('on', all[i] === slot);
      showErr('');
      return;
    }
    if (t.id === 'wbAddPkg') {
      if (pkgs.length < MAX_PKGS) { pkgs.push({ svc: '', staff: '', adds: {} }); resetKey(); state.time = ''; renderPkgs(); refreshSlots(); }
      return;
    }
    if (t.id === 'wbAgain') { resetAll(); return; }
    if (t.id === 'wbRetrySlots') { busyCache = {}; refreshSlots(); return; }
    if (t.id === 'wbReload') { init(); }
  }

  /* ── Turnstile (chỉ khi có site key) ── */
  function initTurnstile() {
    if (!TURNSTILE_SITEKEY) return;
    var s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true; s.defer = true;
    s.onload = function () {
      if (!window.turnstile) return;
      window.turnstile.render('#wbTs', {
        sitekey: TURNSTILE_SITEKEY,
        callback: function (tok) { state.token = tok; },
        'expired-callback': function () { state.token = ''; },
        'error-callback': function () { state.token = ''; }
      });
    };
    document.head.appendChild(s);
  }

  /* ── khởi tạo ── */
  async function init() {
    $('wbLoading').style.display = '';
    $('wbLoading').textContent = 'Đang tải dịch vụ…';
    $('wbForm').style.display = 'none';
    var res = await Promise.all([api('/services'), api('/public/staff')]);
    var sv = res[0], st = res[1];
    if (!sv.ok || !Array.isArray(sv.data) || !st.ok || !Array.isArray(st.data) || !st.data.length) {
      $('wbLoading').innerHTML = 'Chưa tải được danh sách dịch vụ. <button type="button" class="wb-link" id="wbReload">Thử lại</button> hoặc gọi <a href="tel:0985009674">' + HOTLINE + '</a> để đặt lịch.';
      return;
    }
    services = sv.data;
    mains = services.filter(function (s) { return !isAddon(s); });
    addons = services.filter(isAddon);
    staff = st.data;
    var dt = $('wbDate');
    dt.min = todayStr(); dt.max = plusDays(MAX_DAYS);
    $('wbLoading').style.display = 'none';
    $('wbForm').style.display = '';
    renderPkgs(); refreshSlots();
  }

  $('wbForm').addEventListener('submit', submit);
  root.addEventListener('change', onChange);
  root.addEventListener('click', onClick);
  initTurnstile();
  init();
})();
