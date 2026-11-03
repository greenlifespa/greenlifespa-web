/* ================================================
   GREEN LIFE SPA – script.js
   SPA Navigation + Service Data + Modal + AI Chat
   ================================================ */

/* ── DỮ LIỆU DỊCH VỤ ── */
const SERVICE_META = {
  'green-touch': {
    img:'assets/green-touch.jpg', thumb:'t-green-touch', tag:'Phổ biến',
    sub:'Gội đầu thảo dược bản địa', group:'goi-dau',
    desc:'Liệu trình gội đầu nhẹ nhàng với thảo dược thiên nhiên, phù hợp cho khách mới, khách muốn thư giãn nhanh hoặc chăm sóc da đầu tóc nhẹ nhàng.',
    suitable:['Khách mới muốn trải nghiệm','Khách muốn gội đầu giá tốt','Căng thẳng, nặng đầu nhẹ','Thích chăm sóc tóc bằng thảo dược'],
    process:['Tư vấn nhanh tình trạng tóc và da đầu','Xoa bóp thư giãn vùng đầu','Gội đầu bằng thảo dược (2 lần)','Ủ tóc','Xoa bóp vai gáy ngồi','Kết thúc với trà sâm táo đỏ']
  },
  'fast': {
    img:'assets/fast.jpg', thumb:'t-fast', tag:null,
    sub:'Chăm sóc nhanh theo nhu cầu', group:'chuyen-sau',
    desc:'Liệu trình linh hoạt 30 phút, phù hợp cho khách bận rộn hoặc muốn thư giãn nhanh theo vùng cơ thể đang cần chăm sóc.',
    suitable:['Khách bận rộn, ít thời gian','Muốn thư giãn nhanh','Mỏi cổ vai gáy hoặc chân nhẹ','Lần đầu trải nghiệm thử'],
    process:['Trao đổi nhanh về vùng cần chăm sóc','Chăm sóc theo nhu cầu: cạo gió, giác hơi, ngâm chân hoặc xoa bóp vùng đầu','Tác động nhẹ nhàng vào vùng căng mỏi','Kết thúc với trà sâm táo đỏ']
  },
  'relax': {
    img:'assets/relax.jpg', thumb:'t-relax', tag:null,
    sub:'Gội đầu thảo dược chuyên sâu', group:'goi-dau',
    desc:'Gội đầu thảo dược chuyên sâu kết hợp chăm sóc vùng mặt, gáy và cổ. Phù hợp cho khách cần thư giãn sâu sau ngày làm việc mệt mỏi.',
    suitable:['Muốn gội đầu kỹ hơn gói cơ bản','Hay căng thẳng, mỏi đầu, mỏi cổ gáy','Thích trải nghiệm thảo dược thiên nhiên','Cần thư giãn sâu sau ngày mệt mỏi'],
    process:['Tư vấn tình trạng đầu, cổ, vai gáy','Xoa bóp thư giãn vùng đầu','Chăm sóc vùng mặt, gáy, cổ','Gội đầu thảo dược chuyên sâu','Thao tác thư giãn giúp thả lỏng','Nghỉ ngơi và trà sâm táo đỏ']
  },
  'beauty': {
    img:'assets/beauty.jpg', thumb:'t-beauty', tag:null,
    sub:'Tái tạo và phục hồi da mặt', group:'chuyen-sau',
    desc:'Liệu trình chăm sóc da mặt kết hợp thư giãn, sử dụng thành phần thiên nhiên giúp da có cảm giác tươi tắn và dễ chịu hơn.',
    suitable:['Muốn chăm sóc da mặt kết hợp thư giãn','Da xỉn màu, thiếu sức sống','Muốn trải nghiệm chăm sóc da tự nhiên','Căng thẳng, mệt mỏi nhiều'],
    process:['Tư vấn tình trạng da','Chăm sóc da với thành phần thiên nhiên','Massage thư giãn vùng mặt','Kết hợp ngọc thạch để tạo cảm giác mát','Thư giãn vùng đầu và cổ vai gáy','Trà sâm táo đỏ']
  },
  'zen-detox': {
    img:'assets/zen-detox.jpg', thumb:'t-zendetox', tag:null,
    sub:'Thư giãn cơ thể chuyên biệt', group:'chuyen-sau',
    desc:'Liệu trình chuyên biệt cho vùng bụng, eo và chân, giúp cơ thể có cảm giác nhẹ nhàng và thư giãn hơn, kết hợp chườm nóng và thảo dược.',
    suitable:['Cơ thể nặng nề, mệt mỏi','Muốn chăm sóc vùng bụng, eo','Hay đầy hơi, căng bụng nhẹ','Thích các liệu trình chườm nóng, ngải cứu'],
    process:['Tư vấn tình trạng cơ thể','Làm ấm và thư giãn vùng bụng, eo hoặc chân','Chăm sóc theo vùng: bụng, eo, chân, đầu','Có thể kết hợp chườm nóng, ngải cứu','Nghỉ ngơi và trà sâm táo đỏ']
  },
  'royal': {
    img:'assets/royal.jpg', thumb:'t-royal', tag:null,
    sub:'Liệu trình cao cấp toàn diện', group:'cao-cap',
    desc:'Trải nghiệm cao cấp kết hợp gội đầu ngọc thạch, chăm sóc da, thư giãn đầu mặt và cổ vai gáy, tay chân trong 90 phút.',
    suitable:['Muốn trải nghiệm liệu trình cao cấp','Kết hợp gội đầu, chăm sóc da, thư giãn nhiều vùng','Mệt mỏi, stress cần thời gian dài hơn','Muốn tặng người thân một buổi thư giãn'],
    process:['Tư vấn nhu cầu chăm sóc','Gội đầu ngọc thạch','Chăm sóc vùng đầu và nâng cơ mặt nhẹ nhàng','Gội đầu với thảo mộc bản địa','Chăm sóc da bằng tinh dầu thiên nhiên','Thư giãn cổ vai gáy, tay và chân','Trà sâm táo đỏ']
  },
  'galaxy-neck': {
    img:'assets/galaxy-neck.jpg', thumb:'t-galaxy-neck', tag:null,
    sub:'Chăm sóc chuyên sâu vùng cổ vai gáy', group:'chuyen-sau',
    desc:'Chuyên sâu cho vùng đầu, cổ, gáy, vai và bả vai. Phù hợp nhất cho khách ngồi máy tính nhiều, cúi điện thoại lâu hoặc thường xuyên căng mỏi vùng cổ vai.',
    suitable:['Ngồi máy tính nhiều, cúi điện thoại lâu','Căng cứng vùng cổ, vai, bả vai','Nặng đầu, mỏi gáy','Muốn chăm sóc chuyên sâu vùng cổ vai gáy'],
    process:['Tư vấn tình trạng cổ vai gáy','Xác định vùng căng mỏi: cổ, gáy, vai, bả vai','Làm ấm và thư giãn vùng cổ vai gáy','Xoa bóp, day ấn nhẹ vùng cổ, gáy, vai','Thao tác thư giãn vùng đầu','Hỗ trợ vận động nhẹ vùng khớp cổ vai','Nghỉ ngơi và trà sâm táo đỏ']
  },
  'galaxy-back': {
    img:'assets/galaxy-back.jpg', thumb:'t-galaxy-back', tag:null,
    sub:'Thư giãn vùng lưng và thắt eo', group:'chuyen-sau',
    desc:'Chuyên sâu cho vùng lưng, eo và chân. Phù hợp cho khách ngồi nhiều, ít vận động, làm văn phòng hoặc lái xe lâu.',
    suitable:['Thường xuyên mỏi lưng, mỏi eo','Ngồi nhiều, ít vận động','Làm văn phòng hoặc lái xe lâu','Muốn chăm sóc tập trung vùng thân dưới'],
    process:['Tư vấn tình trạng lưng, eo','Làm ấm và thư giãn vùng lưng, eo','Xoa bóp vùng thắt lưng, eo và chân','Kéo giãn nhẹ vùng lưng và chân','Chăm sóc vùng đầu nếu áp dụng','Trà sâm táo đỏ']
  },
  'galaxy-legs': {
    img:'assets/galaxy-legs.jpg', thumb:'t-galaxy-legs', tag:null,
    sub:'Chăm sóc chân và tay chuyên sâu', group:'chuyen-sau',
    desc:'Chuyên sâu cho chân, tay và các khớp. Phù hợp cho khách đứng nhiều, đi lại nhiều hoặc làm máy tính nhiều gây mỏi cổ tay, bàn tay.',
    suitable:['Thường xuyên mỏi chân, mỏi tay','Đứng nhiều, đi lại nhiều hoặc ngồi lâu','Lạnh chân, nặng chân, căng bàn chân','Làm máy tính nhiều, mỏi cổ tay, bàn tay'],
    process:['Tư vấn tình trạng tay chân','Ngâm chân thảo dược','Chăm sóc và xoa bóp vùng chân, bàn chân, cổ chân','Chăm sóc vùng tay, cổ tay, bàn tay','Kết hợp kéo giãn nhẹ các khớp tay chân','Trà sâm táo đỏ']
  },
  'vip': {
    img:'assets/vip.jpg', thumb:'t-vip', tag:'Cao cấp',
    sub:'Chăm sóc toàn thân chuyên sâu', group:'cao-cap',
    desc:'Liệu trình cao cấp nhất – chăm sóc toàn thân trong 120 phút, dành cho khách cần phục hồi năng lượng toàn diện hoặc thường xuyên đau mỏi nhiều vùng.',
    suitable:['Muốn chăm sóc toàn thân chuyên sâu','Thường xuyên đau mỏi nhiều vùng','Làm việc căng thẳng, vận động nhiều','Đã dùng các gói cơ bản và muốn nâng cấp'],
    process:['Tư vấn và ghi nhận tình trạng cơ thể','Xác định các vùng đang căng mỏi','Chăm sóc toàn thân theo từng vùng','Kết hợp giãn cơ, kéo giãn nhẹ và làm ấm','Có thể kết hợp chườm nóng, hồng quang cứu, ngải cứu','Nghỉ ngơi và trà sâm táo đỏ']
  }
};

const META_BY_API_ID = {33:'green-touch', 43:'fast', 44:'fast', 35:'relax', 37:'beauty', 38:'zen-detox', 36:'royal', 41:'galaxy-neck', 40:'galaxy-back', 42:'galaxy-legs', 4:'vip'};
const CARD_ORDER = [33,43,44,35,37,38,36,41,40,42,46,4];

/* DỰ PHÒNG khi /services lỗi — 17 dịch vụ đang bật ở Supabase bản chính (bỏ VIP id 4 vì đang tắt) */
const FALLBACK_SERVICES = [
  {id:33, name:'Gội Green Touch', price:79000, duration:40, cat:'Gội Đầu', icon:'💆'},
  {id:35, name:'Gội Relax - Chăm Da - Nâng cơ Mặt - Vai Cổ Gáy', price:180000, duration:60, cat:'Gội Đầu', icon:'💆'},
  {id:36, name:'Gội Royal - Chăm da chuyên sâu - Xoa bóp full body', price:300000, duration:90, cat:'Gội Đầu', icon:'💆'},
  {id:37, name:'Chăm Da Beauty - Nâng cơ ngọc thạch - Vai Cổ Gáy', price:240000, duration:60, cat:'Chăm Da', icon:'💆'},
  {id:38, name:'Thải Mỡ Bụng Zen Detox - Bụng & Chân', price:240000, duration:60, cat:'Xoa Bóp', icon:'💆'},
  {id:40, name:'Xoa Bóp - Galaxy Lưng Eo Thận ( chân & đầu )', price:300000, duration:60, cat:'Body', icon:'💆'},
  {id:41, name:'Xoa Bóp Galaxy - Vai Cổ Gáy ( Tay & Đầu )', price:300000, duration:60, cat:'Body', icon:'💆'},
  {id:42, name:'Xoa Bóp Galaxy - Chân/Tay ( liệu trình khô & đầu )', price:300000, duration:60, cat:'Body', icon:'💆'},
  {id:43, name:'Xoa Bóp Fast - Giảm đau theo vùng ( Vai/Gáy/Lưng/Chân/Tay )', price:150000, duration:30, cat:'Body', icon:'💆'},
  {id:44, name:'Ngâm Chân Fast - Ngâm Chân Thảo Dược ( xoa bóp chân )', price:150000, duration:30, cat:'Body', icon:'💆'},
  {id:46, name:'Xông Hơi Thảo Dược - Nằm ghế xoa bóp tự động', price:50000, duration:30, cat:'Body', icon:'💆'},
  {id:54, name:'Rửa mặt', price:10000, duration:0, cat:'Dịch Vụ Thêm', icon:'💆'},
  {id:55, name:'Đắp Nạ (Mask)', price:30000, duration:0, cat:'Dịch Vụ Thêm', icon:'💆'},
  {id:56, name:'Tẩy tế bào chết đầu', price:20000, duration:0, cat:'Dịch Vụ Thêm', icon:'💆'},
  {id:57, name:'Tẩy tế bào chết mặt', price:10000, duration:0, cat:'Dịch Vụ Thêm', icon:'💆'},
  {id:58, name:'Massage mặt', price:20000, duration:0, cat:'Dịch Vụ Thêm', icon:'💆'},
  {id:59, name:'Massage 15p', price:50000, duration:15, cat:'Dịch Vụ Thêm', icon:'💆'}
];

function isAddonRow(row) {
  return String(row && row.cat || '').replace(/\s+/g, ' ').trim().toLowerCase() === 'dịch vụ thêm';
}

function buildServiceCards(rows) {
  const mains = (rows || []).filter(r => !isAddonRow(r));
  const byId = {};
  mains.forEach(r => { byId[r.id] = r; });
  const ordered = [];
  const used = new Set();
  CARD_ORDER.forEach(id => {
    if (byId[id]) { ordered.push(byId[id]); used.add(id); }
  });
  const rest = mains.filter(r => !used.has(r.id)).sort((a, b) => a.id - b.id);
  return ordered.concat(rest).map(row => {
    const metaKey = META_BY_API_ID[row.id];
    const meta = metaKey ? SERVICE_META[metaKey] : null;
    const priceNum = Number(row.price) || 0;
    const dur = Number(row.duration) || 0;
    return {
      id: row.id,
      full: row.name,
      name: row.name,
      time: dur + ' phút',
      price: priceNum.toLocaleString('vi-VN') + ' VNĐ',
      priceNum,
      img: meta ? meta.img : null,
      thumb: meta ? meta.thumb : null,
      tag: meta ? meta.tag : null,
      sub: meta ? meta.sub : (row.cat || ''),
      group: meta ? meta.group : null,
      desc: meta ? meta.desc : null,
      suitable: meta ? meta.suitable : null,
      process: meta ? meta.process : null,
      icon: row.icon || ''
    };
  });
}

function buildAddonRows(rows) {
  return (rows || []).filter(isAddonRow).slice().sort((a, b) => a.id - b.id);
}

function fmtPromptPrice(n) {
  n = Number(n) || 0;
  if (n % 1000 === 0) return (n / 1000) + 'k';
  return n.toLocaleString('vi-VN') + 'đ';
}

function buildSystemPrompt(rows) {
  const mains = buildServiceCards(rows);
  const adds = buildAddonRows(rows);
  const mainLine = mains.map(s => {
    const dur = parseInt(String(s.time), 10) || 0;
    return String(s.full || '').trim() + ' ' + fmtPromptPrice(s.priceNum) + '/' + dur + 'p';
  }).join(' | ');
  const addLine = adds.map(a => {
    const dur = Number(a.duration) || 0;
    const base = String(a.name || '').trim() + ' ' + fmtPromptPrice(a.price);
    return dur > 0 ? base + '/' + dur + 'p' : base;
  }).join(' | ');
  return `Bạn là trợ lý tư vấn của Green Life Spa – spa dưỡng sinh tại 246 Độc Lập, Phú Thọ Hòa, TP.HCM.
Hotline: 0985.009.674 | Zalo: 0917.948.706 | Mở cửa: 9:30–20:00 hằng ngày.

DỊCH VỤ: ${mainLine}.
DỊCH VỤ THÊM (chọn kèm khi đặt lịch): ${addLine}.
Gói tín dụng: nạp 2tr+5% / 3tr+8% / 5tr+10%.

GỢI Ý NHANH: ít thời gian→Fast | gội đầu→Gội Green Touch hoặc Relax | cổ vai gáy→Galaxy Vai Cổ Gáy | lưng eo→Galaxy Lưng Eo Thận | chân tay→Galaxy Chân/Tay | toàn thân→Gói VIP | da mặt→Beauty | bụng nặng→Zen Detox | cao cấp→Royal.

Giá và tên dịch vụ lấy đúng từ danh sách trên, không tự bịa dịch vụ khác.
Gói VIP 600k/120p là gói bình thường, đặt lịch được như các gói khác; không nói đặt Gói VIP sẽ lên hạng VIP.
Khách muốn hủy lịch đã đặt trên web: bảo khách bấm nút 'Hủy lịch' trong khung chat này.

CÁCH TRẢ LỜI:
- Xưng "em", gọi "mình", dùng "dạ" đầu câu
- Mỗi câu trả lời đủ ý, KHÔNG bị ngắt giữa chừng, tối đa 80 từ
- Hỏi bảng giá: liệt kê 3-4 gói tiêu biểu kèm giá, kết bằng câu mời tư vấn thêm
- Hỏi triệu chứng: gợi ý 1 gói phù hợp + giá + hỏi muốn đặt lịch không
- KHÔNG nói: chữa khỏi, cam kết hết đau, điều trị dứt điểm`;
}

let SERVICES = buildServiceCards(FALLBACK_SERVICES);
let ADDONS = buildAddonRows(FALLBACK_SERVICES);

const NEWS_DATA = {
  'uu-dai':{
    title:'Ưu đãi thẻ nạp Green Life Spa',
    icon:'🎁',
    content:`<p>Green Life Spa triển khai chương trình thẻ tín dụng ưu đãi dành cho khách hàng thường xuyên:</p>
    <ul><li>Nạp từ <b>2.000.000 VNĐ</b>: tặng thêm 5%</li><li>Nạp từ <b>3.000.000 VNĐ</b>: tặng thêm 8%</li><li>Nạp từ <b>5.000.000 VNĐ</b>: tặng thêm 10%</li></ul>
    <p>Thẻ tín dụng phù hợp với khách sử dụng dịch vụ thường xuyên, giúp tiết kiệm chi phí và thuận tiện hơn khi thanh toán.</p>
    <p>Liên hệ <a href="tel:0985009674">0985.009.674</a> hoặc Zalo <a href="https://zalo.me/0917948706">0917.948.706</a> để đăng ký.</p>`
  },
  'gio-mo-cua':{
    title:'Giờ hoạt động mỗi ngày',
    icon:'🕗',
    content:`<p>Green Life Spa mở cửa đón khách hằng ngày trong khung giờ:</p>
    <ul><li><b>Mở cửa:</b> 9:30 sáng</li><li><b>Nhận khách cuối:</b> 20:00 tối</li></ul>
    <p>Spa hoạt động 7 ngày một tuần, kể cả cuối tuần và ngày lễ.</p>
    <p><b>Lưu ý:</b> Nên đặt lịch trước để spa sắp xếp kỹ thuật viên và khung giờ phù hợp, tránh phải chờ lâu.</p>
    <p>Đặt lịch qua hotline <a href="tel:0985009674">0985.009.674</a> hoặc Zalo <a href="https://zalo.me/0917948706">0917.948.706</a>.</p>`
  },
  'thanh-toan':{
    title:'Thanh toán tiện lợi',
    icon:'💳',
    content:`<p>Green Life Spa hỗ trợ nhiều hình thức thanh toán để khách hàng thuận tiện nhất:</p>
    <ul><li>💵 <b>Tiền mặt</b> – nhận trực tiếp tại quầy</li><li>🏦 <b>Chuyển khoản ngân hàng</b></li><li>📱 <b>Momo</b> – quét mã nhanh chóng</li></ul>
    <p>Không phát sinh phụ phí với bất kỳ hình thức thanh toán nào.</p>`
  }
};

/* ── SPA NAVIGATION ── */
let currentPage = 'home';

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
    currentPage = page;
  }
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile menu
  setMenu(false);

  // Render dynamic content per page
  const grid  = document.getElementById('featuredGrid');
  const full  = document.getElementById('servicesFull');
  const price = document.getElementById('priceWrap');
  if (page === 'home'     && grid  && !grid.hasChildNodes())  renderFeatured();
  if (page === 'services' && full  && !full.hasChildNodes())  renderServicesFull();
  if (page === 'pricing'  && price && !price.hasChildNodes()) renderPriceTable();
}

function setMenu(open) {
  const nav = document.getElementById('mainNav');
  const btn = document.getElementById('hamburger');
  if (!nav) return;
  nav.classList.toggle('open', open);
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function toggleMobileMenu() {
  const nav = document.getElementById('mainNav');
  setMenu(nav ? !nav.classList.contains('open') : false);
}

/* Đóng menu khi bấm ra ngoài header */
document.addEventListener('click', e => {
  const header = document.getElementById('siteHeader');
  const nav = document.getElementById('mainNav');
  if (nav && nav.classList.contains('open') && header && !header.contains(e.target)) setMenu(false);
});

/* Đóng menu khi phóng to màn hình / xoay ngang qua ngưỡng desktop */
window.addEventListener('resize', () => {
  if (window.innerWidth > 820) setMenu(false);
});

/* Đóng menu bằng phím Esc */
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

function svcMediaHtml(s, kind) {
  if (s.img) {
    if (kind === 'feat') return `<img src="${s.img}" alt="${s.name}" loading="lazy">`;
    if (kind === 'sf') return `<img src="${s.img}" alt="${s.name}" loading="lazy">`;
    return `<img src="${s.img}" alt="${s.full}" style="width:100%;height:100%;object-fit:cover;display:block">`;
  }
  if (s.icon) return `<div class="svc-icon-tile">${s.icon}</div>`;
  if (s.thumb) return `<div class="${s.thumb}" style="width:100%;height:100%"></div>`;
  return `<div class="svc-icon-tile">💆</div>`;
}

/* ── RENDER: Featured grid (home) ── */
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  grid.innerHTML = SERVICES.slice(0, 8).map(s => `
    <div class="feat-card" onclick="openServiceModal('${s.id}')">
      <div class="feat-img">
        ${svcMediaHtml(s, 'feat')}
      </div>
      <div class="feat-body">
        <div class="feat-name">${s.full}</div>
        <div class="feat-sub">${s.sub}</div>
        <div class="feat-meta">
          <span class="feat-price">${s.price}</span>
          <span class="feat-time">⏱ ${s.time}</span>
        </div>
      </div>
    </div>`).join('');
}

/* ── RENDER: Services full page ── */
function renderServicesFull() {
  const el = document.getElementById('servicesFull');
  if (!el) return;
  el.innerHTML = SERVICES.map(s => `
    <div class="sf-card" onclick="openServiceModal('${s.id}')">
      <div class="sf-thumb ${s.img ? 'sf-thumb-photo' : (s.thumb || '')}">
        ${svcMediaHtml(s, 'sf')}
        <div class="sf-thumb-overlay"></div>
        <div class="sf-price-tag">${s.price}</div>
      </div>
      <div class="sf-body">
        <h3>${s.full}</h3>
        <div class="sf-time">⏱ ${s.time}${s.tag ? `&ensp;<span class="pt-tag">${s.tag}</span>` : ''}</div>
        ${s.desc ? `<p>${s.desc}</p>` : ''}
        <span class="sf-btn">Xem chi tiết →</span>
      </div>
    </div>`).join('');
}

/* ── RENDER: Price table ── */
function renderPriceTable() {
  const el = document.getElementById('priceWrap');
  if (!el) return;
  const header = `<div class="pt-row pt-head"><div class="pt-num">STT</div><div class="pt-cell">Liệu trình</div><div class="pt-cell">Thời lượng</div><div class="pt-cell pt-price">Giá</div></div>`;
  const rows = SERVICES.map((s,i) => `
    <div class="pt-row${String(s.id) === '4' ? ' pt-highlight' : ''}" style="cursor:pointer" onclick="openServiceModal('${s.id}')">
      <div class="pt-num">${i+1}</div>
      <div class="pt-cell pt-name"><b>${s.full}</b>${s.tag?`<span class="pt-tag${String(s.id) === '4' ? ' gold' : ''}">${s.tag}</span>`:''}<small>${s.sub}</small></div>
      <div class="pt-cell pt-time">${s.time}</div>
      <div class="pt-cell pt-price">${s.price}</div>
    </div>`).join('');
  let addonBlock = '';
  if (ADDONS.length) {
    addonBlock = `<div class="pt-addon-head">Dịch vụ thêm (chọn kèm khi đặt lịch)</div>` + ADDONS.map(a => {
      const dur = Number(a.duration) || 0;
      const price = Number(a.price || 0).toLocaleString('vi-VN') + ' VNĐ';
      return `<div class="pt-row pt-addon"><div class="pt-num"></div><div class="pt-cell pt-name"><b>${a.name}</b></div><div class="pt-cell pt-time">${dur > 0 ? dur + ' phút' : ''}</div><div class="pt-cell pt-price">${price}</div></div>`;
    }).join('');
  }
  el.innerHTML = header + rows + addonBlock;
}

/* ── RENDER: Menu sections ── */
function renderMenu() {
  const groups = {
    'goi-dau': { label:'🌿 Gội đầu thảo dược', items:[] },
    'chuyen-sau': { label:'✨ Chăm sóc chuyên sâu theo vùng', items:[] },
    'cao-cap': { label:'💎 Liệu trình cao cấp', items:[] }
  };
  SERVICES.forEach(s => { if (groups[s.group]) groups[s.group].items.push(s); });

  const el = document.getElementById('menuSections');
  if (!el) return; // trang Menu đã gộp vào Liệu trình
  el.innerHTML = Object.values(groups).map(g => `
    <div class="menu-section">
      <h3>${g.label}</h3>
      <div class="menu-items">
        ${g.items.map(s => `
          <div class="mi-item" onclick="openServiceModal('${s.id}')">
            <div>
              <div class="mi-name">${s.full}</div>
              <div class="mi-sub">⏱ ${s.time}</div>
            </div>
            <div class="mi-price">${s.price}</div>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

/* ── MODAL: Service detail ── */
function openServiceModal(id) {
  const s = SERVICES.find(x => String(x.id) === String(id));
  if (!s) return;
  const suitableHtml = s.suitable && s.suitable.length
    ? `<h4>Phù hợp với ai?</h4><ul>${s.suitable.map(x => `<li>${x}</li>`).join('')}</ul>`
    : '';
  const processHtml = s.process && s.process.length
    ? `<h4>Quy trình chăm sóc</h4><ul>${s.process.map((x,i) => `<li><b>Bước ${i+1}:</b> ${x}</li>`).join('')}</ul>`
    : '';
  const html = `
    <div class="modal-thumb">${svcMediaHtml(s, 'modal')}</div>
    <div class="modal-body">
      <h2>${s.full}</h2>
      <div class="modal-meta">
        <span class="modal-tag">⏱ ${s.time}</span>
        <span class="modal-tag" style="background:#fef3cd;color:#b8860b">💰 ${s.price}</span>
        ${s.tag ? `<span class="modal-tag">${s.tag}</span>` : ''}
      </div>
      ${s.desc ? `<p>${s.desc}</p>` : ''}
      ${suitableHtml}
      ${processHtml}
      <div class="modal-cta">
        <button class="btn-green" onclick="navigate('contact');closeModal()">Đặt lịch ngay →</button>
      </div>
    </div>`;
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ── MODAL: News / tin tức ── */
function openModal(id) {
  const news = NEWS_DATA[id];
  if (!news) return;
  const html = `
    <div class="modal-body" style="padding-top:40px">
      <div style="font-size:36px;text-align:center;margin-bottom:12px">${news.icon}</div>
      <h2 style="text-align:center;margin-bottom:16px">${news.title}</h2>
      ${news.content}
      <div class="modal-cta" style="margin-top:20px">
        <button class="btn-green" onclick="navigate('contact');closeModal()">Đặt lịch ngay →</button>
      </div>
    </div>`;
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── FORM ── */
function handleSubmit(e) {
  e.preventDefault();
  showToast('Cảm ơn bạn đã đặt lịch! Spa sẽ liên hệ xác nhận sớm nhất có thể.');
  e.target.reset();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ── HERO SLIDER (placeholder) ── */
function slidePrev() {}
function slideNext() {}

/* ── AI CHAT ── */
/*
 * ⚠️  QUAN TRỌNG: Thay URL bên dưới bằng URL của Cloudflare Worker của bạn.
 * Xem file worker.js để biết cách tạo worker và lấy URL.
 * Ví dụ: 'https://greenlife-ai.ten-tai-khoan.workers.dev'
 */
const AI_PROXY_URL = 'https://greenlifespa-web-ai.vinhluong0501.workers.dev';

let chatOpen = false;

const SYSTEM_PROMPT = buildSystemPrompt(FALLBACK_SERVICES);

let chatHistory = [{ role: 'system', content: SYSTEM_PROMPT }];

async function loadServices() {
  if (typeof window.GL_API_BASE !== 'string' || !window.GL_API_BASE) return;
  try {
    const res = await fetch(window.GL_API_BASE + '/services');
    const rows = await res.json();
    if (!Array.isArray(rows) || !rows.length) return;
    if (!rows.every(r => r && r.id != null && r.name != null && r.price != null)) return;
    SERVICES = buildServiceCards(rows);
    ADDONS = buildAddonRows(rows);
    if (chatHistory[0] && chatHistory[0].role === 'system') {
      chatHistory[0].content = buildSystemPrompt(rows);
    }
    const grid = document.getElementById('featuredGrid');
    const full = document.getElementById('servicesFull');
    const price = document.getElementById('priceWrap');
    if (grid && grid.hasChildNodes()) { grid.innerHTML = ''; renderFeatured(); }
    if (full && full.hasChildNodes()) { full.innerHTML = ''; renderServicesFull(); }
    if (price && price.hasChildNodes()) { price.innerHTML = ''; renderPriceTable(); }
  } catch (e) {
    /* giữ dự phòng, không báo lỗi lên màn hình */
  }
}

function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chatWidget').classList.toggle('open', chatOpen);
  if (chatOpen) {
    const badge = document.getElementById('chatBadge');
    if (badge) badge.style.display = 'none';
    // Delay dài hơn trên mobile để animation xong mới focus
    // (tránh keyboard mở sớm làm layout nhảy)
    const delay = window.innerWidth <= 600 ? 450 : 280;
    setTimeout(() => {
      const inp = document.getElementById('cwInput');
      if (inp) inp.focus({ preventScroll: true });
    }, delay);
  }
}

function quickAsk(text) {
  document.getElementById('cwInput').value = text;
  sendChat();
}

const CHAT_BUSY_MSG = 'Dạ hệ thống tư vấn đang bận một chút ạ. Mình nhắn lại sau ít giây giúp em, hoặc gọi hotline 0985.009.674 / Zalo 0917.948.706 để được hỗ trợ ngay nhé.';

function chatWait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
 * Gọi AI qua Worker proxy, tự thử lại tối đa 3 lần khi lỗi tạm thời.
 * Gemini báo lỗi dạng mảng [{ error: {...} }] hoặc đối tượng { error: {...} }; cả hai đều được coi là lỗi.
 * Không trả về câu "em chưa hiểu" giả: nếu hết lần thử thì ném lỗi để sendChat báo bận.
 */
async function callChatAI(messages) {
  let lastErr = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt) await chatWait(attempt * 900);
    try {
      const res = await fetch(AI_PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gemini-3.5-flash-lite',
          max_tokens: 350,
          messages: messages
        })
      });
      let data = null;
      try { data = await res.json(); } catch (e) { data = null; }
      const d = Array.isArray(data) ? data[0] : data;
      const apiErr = d && d.error;
      const choice = d && d.choices && d.choices[0];
      const reply = choice && choice.message && choice.message.content;
      if (res.ok && !apiErr && typeof reply === 'string' && reply.trim()) return reply;
      lastErr = { http: res.status, error: apiErr || null, finish: choice ? choice.finish_reason : null };
      console.warn('AI chat lỗi (lần ' + (attempt + 1) + '/3):', lastErr);
    } catch (err) {
      lastErr = { network: String((err && err.message) || err) };
      console.warn('AI chat lỗi mạng (lần ' + (attempt + 1) + '/3):', lastErr);
    }
  }
  const failure = new Error('chat_failed');
  failure.detail = lastErr;
  throw failure;
}

/* ── LUỒNG HỦY LỊCH (không qua Gemini) ── */
let cancelFlow = null;
let chatTsWidgetId = null;
let chatTsPending = null;

function normChat(t) {
  return String(t || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').replace(/\s+/g, ' ').trim();
}

function appendActions(actions) {
  const el = document.getElementById('cwMsgs');
  const row = document.createElement('div');
  row.className = 'cw-actions';
  (actions || []).forEach(a => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cw-act';
    btn.textContent = a.label;
    btn.onclick = () => {
      row.querySelectorAll('button').forEach(b => { b.disabled = true; });
      a.onClick();
    };
    row.appendChild(btn);
  });
  el.appendChild(row);
  el.scrollTop = el.scrollHeight;
}

function showCwQuick() {
  const qb = document.getElementById('cwQuick');
  if (qb) qb.style.display = '';
}

function hideCwQuick() {
  const qb = document.getElementById('cwQuick');
  if (qb) qb.style.display = 'none';
}

function clearCancelFlow() {
  cancelFlow = null;
  showCwQuick();
}

function endCancelKeep() {
  appendMsg('bot', 'Dạ, lịch của mình được giữ nguyên ạ.');
  clearCancelFlow();
}

function endCancelExit() {
  clearCancelFlow();
}

function fmtCancelDate(dateStr) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr || ''));
  return m ? m[3] + '/' + m[2] : String(dateStr || '');
}

function fmtCancelLabel(item) {
  return fmtCancelDate(item.date) + ' ' + (item.time || '') + ' – ' + (item.service || '');
}

function fmtCancelConfirm(item) {
  return (item.time || '') + ' ' + fmtCancelDate(item.date) + ' – ' + (item.service || '');
}

function phoneDigitsOk(s) {
  const d = String(s || '').replace(/\D/g, '');
  return d.length >= 9 && d.length <= 12;
}

function normalizeCancelPhone(s) {
  return String(s || '').replace(/[\s.\-]/g, '');
}

function getChatCaptchaToken() {
  return new Promise(async (resolve, reject) => {
    const sitekey = window.GL_TURNSTILE_SITEKEY;
    if (!sitekey) { resolve(''); return; }
    let waited = 0;
    while (!window.turnstile && waited < 5000) {
      await new Promise(r => setTimeout(r, 250));
      waited += 250;
    }
    if (!window.turnstile) { reject({ code: 'captcha' }); return; }
    let done = false;
    const finish = (tok) => {
      if (done) return;
      done = true;
      chatTsPending = null;
      resolve(tok || '');
    };
    const fail = () => {
      if (done) return;
      done = true;
      chatTsPending = null;
      reject({ code: 'captcha' });
    };
    const timer = setTimeout(fail, 15000);
    chatTsPending = (tok) => { clearTimeout(timer); finish(tok); };
    try {
      if (chatTsWidgetId == null) {
        chatTsWidgetId = window.turnstile.render('#cwTs', {
          sitekey: sitekey,
          appearance: 'interaction-only',
          callback: (tok) => { if (chatTsPending) chatTsPending(tok); }
        });
      } else {
        window.turnstile.reset(chatTsWidgetId);
      }
    } catch (e) {
      clearTimeout(timer);
      fail();
    }
  });
}

function cancelRetry() {
  cancelFlow = { step: 'phone', phone: '', name: '', items: null, picked: null };
  appendMsg('bot', 'Dạ em hỗ trợ hủy lịch đã đặt trên web ạ. Mình cho em xin **số điện thoại** đã dùng để đặt lịch nhé.');
  appendActions([{ label: 'Thoát', onClick: endCancelExit }]);
}

function cancelErrorRetryable(msg) {
  appendMsg('bot', msg);
  appendActions([
    { label: 'Thử lại', onClick: cancelRetry },
    { label: 'Thoát', onClick: endCancelExit }
  ]);
}

function cancelErrorFatal(msg) {
  appendMsg('bot', msg);
  clearCancelFlow();
}

function startCancelFlow() {
  cancelFlow = { step: 'phone', phone: '', name: '', items: null, picked: null };
  hideCwQuick();
  appendMsg('bot', 'Dạ em hỗ trợ hủy lịch đã đặt trên web ạ. Mình cho em xin **số điện thoại** đã dùng để đặt lịch nhé.');
  appendActions([{ label: 'Thoát', onClick: endCancelExit }]);
}

function askCancelConfirm(item) {
  cancelFlow.step = 'confirm';
  cancelFlow.picked = item;
  appendMsg('bot', 'Dạ em xác nhận hủy lịch **' + fmtCancelConfirm(item) + '**. Mình chắc chắn hủy chứ ạ?');
  appendActions([
    { label: 'Xác nhận hủy', onClick: () => doCancelConfirm(item) },
    { label: 'Giữ lịch', onClick: endCancelKeep }
  ]);
}

async function doCancelLookup() {
  showTyping();
  try {
    let token = '';
    try {
      token = await getChatCaptchaToken();
    } catch (e) {
      hideTyping();
      cancelErrorRetryable('Dạ em chưa xác minh được mình là người thật ạ, mình thử lại giúp em nhé.');
      return;
    }
    const base = window.GL_API_BASE;
    if (typeof base !== 'string' || !base) {
      hideTyping();
      cancelErrorFatal('Dạ chức năng hủy trực tuyến tạm chưa dùng được ạ, mình gọi hotline 0985.009.674 giúp em nhé.');
      return;
    }
    const res = await fetch(base + '/web-cancel/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cancelFlow.phone, name: cancelFlow.name, cf_token: token, website: '' })
    });
    let data = {};
    try { data = await res.json(); } catch (e) { data = {}; }
    hideTyping();
    if (chatTsWidgetId != null && window.turnstile) {
      try { window.turnstile.reset(chatTsWidgetId); } catch (e) {}
    }
    const code = data.code || (res.status === 429 ? 'rate_limited' : '');
    if (code === 'rate_limited' || res.status === 429) {
      appendMsg('bot', 'Dạ mình thao tác hơi nhanh, mình thử lại sau 1 phút giúp em nhé.');
      appendActions([{ label: 'Thoát', onClick: endCancelExit }]);
      return;
    }
    if (code === 'cancel_disabled' || res.status === 503) {
      cancelErrorFatal('Dạ chức năng hủy trực tuyến tạm chưa dùng được ạ, mình gọi hotline 0985.009.674 giúp em nhé.');
      return;
    }
    if (code === 'captcha' || res.status === 403) {
      cancelErrorRetryable('Dạ em chưa xác minh được mình là người thật ạ, mình thử lại giúp em nhé.');
      return;
    }
    if (code === 'not_found' || res.status === 404) {
      cancelErrorRetryable('Dạ em không tìm thấy lịch phù hợp với số điện thoại và họ tên này ạ. Mình kiểm tra lại giúp em, hoặc gọi hotline 0985.009.674 nhé.');
      return;
    }
    if (!res.ok || !data.ok || !Array.isArray(data.items) || !data.items.length) {
      cancelErrorFatal('Dạ em chưa hủy được ạ, mình gọi hotline 0985.009.674 giúp em nhé.');
      return;
    }
    cancelFlow.items = data.items;
    if (data.items.length === 1) {
      askCancelConfirm(data.items[0]);
      return;
    }
    cancelFlow.step = 'pick';
    appendMsg('bot', 'Dạ em thấy ' + data.items.length + ' lịch có thể hủy. Mình chọn lịch cần hủy nhé:');
    const acts = data.items.map((it, idx) => ({
      label: fmtCancelLabel(it),
      onClick: () => askCancelConfirm(cancelFlow.items[idx])
    }));
    acts.push({ label: 'Thoát', onClick: endCancelExit });
    appendActions(acts);
  } catch (e) {
    hideTyping();
    cancelErrorRetryable('Dạ em chưa kết nối được. Mình kiểm tra mạng rồi thử lại, hoặc gọi 0985.009.674 ạ.');
  }
}

async function doCancelConfirm(item) {
  showTyping();
  try {
    const base = window.GL_API_BASE;
    if (typeof base !== 'string' || !base) {
      hideTyping();
      cancelErrorFatal('Dạ chức năng hủy trực tuyến tạm chưa dùng được ạ, mình gọi hotline 0985.009.674 giúp em nhé.');
      return;
    }
    const res = await fetch(base + '/web-cancel/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ref: item.ref })
    });
    let data = {};
    try { data = await res.json(); } catch (e) { data = {}; }
    hideTyping();
    const code = data.code || '';
    if (code === 'rate_limited' || res.status === 429) {
      appendMsg('bot', 'Dạ mình thao tác hơi nhanh, mình thử lại sau 1 phút giúp em nhé.');
      appendActions([{ label: 'Thoát', onClick: endCancelExit }]);
      return;
    }
    if (code === 'cancel_disabled' || res.status === 503) {
      cancelErrorFatal('Dạ chức năng hủy trực tuyến tạm chưa dùng được ạ, mình gọi hotline 0985.009.674 giúp em nhé.');
      return;
    }
    if (code === 'expired' || code === 'bad_ref' || res.status === 410 || res.status === 400) {
      cancelErrorRetryable('Dạ phiên xác nhận đã hết hạn ạ, mình tra cứu lại giúp em nhé.');
      return;
    }
    if (code === 'bad_status' || code === 'past_time') {
      cancelErrorFatal('Dạ lịch này đã hoàn tất hoặc đã qua giờ hẹn nên em không hủy trực tuyến được ạ. Mình gọi hotline 0985.009.674 giúp em nhé.');
      return;
    }
    if (!res.ok || !data.ok) {
      cancelErrorFatal('Dạ em chưa hủy được ạ, mình gọi hotline 0985.009.674 giúp em nhé.');
      return;
    }
    const bk = data.booking || item;
    if (data.already) {
      appendMsg('bot', 'Dạ lịch này đã được hủy trước đó rồi ạ.');
    } else {
      appendMsg('bot', 'Dạ em đã hủy lịch **' + fmtCancelConfirm(bk) + '** và báo spa rồi ạ.');
    }
    clearCancelFlow();
  } catch (e) {
    hideTyping();
    cancelErrorRetryable('Dạ em chưa kết nối được. Mình kiểm tra mạng rồi thử lại, hoặc gọi 0985.009.674 ạ.');
  }
}

async function handleCancelInput(text) {
  const n = normChat(text);
  if (n === 'thoat' || n === 'thoát') {
    endCancelExit();
    return;
  }
  if (!cancelFlow) return;
  if (cancelFlow.step === 'phone') {
    const phone = normalizeCancelPhone(text);
    if (!phoneDigitsOk(phone)) {
      appendMsg('bot', 'Dạ số điện thoại chưa đúng ạ, mình nhập lại giúp em (ví dụ 0901234567) nhé.');
      return;
    }
    cancelFlow.phone = phone;
    cancelFlow.step = 'name';
    appendMsg('bot', 'Dạ mình cho em xin **họ tên** đã dùng khi đặt lịch ạ.');
    appendActions([{ label: 'Thoát', onClick: endCancelExit }]);
    return;
  }
  if (cancelFlow.step === 'name') {
    const name = String(text || '').replace(/\s+/g, ' ').trim();
    if (name.length < 2 || name.length > 100) {
      appendMsg('bot', 'Dạ mình nhập lại họ tên giúp em nhé.');
      return;
    }
    cancelFlow.name = name;
    await doCancelLookup();
    return;
  }
  if (cancelFlow.step === 'pick' || cancelFlow.step === 'confirm') {
    appendMsg('bot', 'Dạ mình chọn bằng nút bên dưới giúp em nhé.');
  }
}

async function sendChat() {
  const inp = document.getElementById('cwInput');
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  inp.style.height = '';
  appendMsg('user', text);

  if (cancelFlow) {
    await handleCancelInput(text);
    return;
  }

  const n = normChat(text);
  if (/(^|\s)(huy|cancel)(\s|$)/.test(n) || n.includes('khong den duoc') || n.includes('khong di duoc')) {
    startCancelFlow();
    return;
  }

  chatHistory.push({ role: 'user', content: text });

  const qb = document.getElementById('cwQuick');
  if (qb) qb.style.display = 'none';

  showTyping();
  try {
    const reply = await callChatAI(chatHistory);
    hideTyping();
    appendMsg('bot', reply);
    chatHistory.push({ role: 'assistant', content: reply });
    if (chatHistory.length > 20) {
      const [systemMsg, ...turns] = chatHistory;
      const recent = turns.slice(-20);
      while (recent.length && recent[0].role !== 'user') recent.shift();
      chatHistory = [systemMsg, ...recent];
    }
  } catch (err) {
    console.error('AI chat thất bại:', err && err.detail);
    hideTyping();
    appendMsg('bot', CHAT_BUSY_MSG);
    // Bỏ tin vừa gửi khỏi lịch sử (không lưu câu báo lỗi) để các lượt sau không bị lệch vai user/assistant.
    const last = chatHistory[chatHistory.length - 1];
    if (last && last.role === 'user') chatHistory.pop();
  }
}

function appendMsg(role, text) {
  const el = document.getElementById('cwMsgs');
  const wrap = document.createElement('div');
  wrap.className = 'cw-msg ' + role;
  const av = document.createElement('div');
  av.className = 'cw-av';
  av.textContent = role === 'bot' ? 'GL' : 'B';
  const bubble = document.createElement('div');
  bubble.className = 'cw-bubble';
  bubble.innerHTML = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  wrap.appendChild(av);
  wrap.appendChild(bubble);
  el.appendChild(wrap);
  el.scrollTop = el.scrollHeight;
}

let typingEl = null;
function showTyping() {
  const el = document.getElementById('cwMsgs');
  typingEl = document.createElement('div');
  typingEl.className = 'cw-msg bot';
  typingEl.id = 'cwTyping';
  typingEl.innerHTML = '<div class="cw-av">GL</div><div class="cw-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
  el.appendChild(typingEl);
  el.scrollTop = el.scrollHeight;
}
function hideTyping() {
  const t = document.getElementById('cwTyping');
  if (t) t.remove();
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  loadServices();
});
