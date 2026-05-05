/* ================================================
   GREEN LIFE SPA – script.js
   SPA Navigation + Service Data + Modal + AI Chat
   ================================================ */

/* ── DATA: Dịch vụ ── */
const SERVICES = [
  {
    id:'green-touch', name:'Green Touch', full:'Green Touch – Gội đầu thảo dược bản địa',
    time:'40 phút', price:'79.000 VNĐ', priceNum:79000,
    img:'assets/green-touch.jpg', thumb:'t-green-touch', tag:'Phổ biến',
    sub:'Gội đầu thảo dược bản địa',
    group:'goi-dau',
    desc:'Liệu trình gội đầu nhẹ nhàng với thảo dược thiên nhiên, phù hợp cho khách mới, khách muốn thư giãn nhanh hoặc chăm sóc da đầu tóc nhẹ nhàng.',
    suitable:['Khách mới muốn trải nghiệm','Khách muốn gội đầu giá tốt','Căng thẳng, nặng đầu nhẹ','Thích chăm sóc tóc bằng thảo dược'],
    process:['Tư vấn nhanh tình trạng tóc và da đầu','Xoa bóp thư giãn vùng đầu','Gội đầu bằng thảo dược (2 lần)','Ủ tóc','Xoa bóp vai gáy ngồi','Kết thúc với trà sâm táo đỏ']
  },
  {
    id:'fast', name:'FAST', full:'FAST – Chăm sóc nhanh theo nhu cầu',
    time:'30 phút', price:'150.000 VNĐ', priceNum:150000,
    img:'assets/fast.jpg', thumb:'t-fast', tag:null,
    sub:'Chăm sóc nhanh theo nhu cầu',
    group:'chuyen-sau',
    desc:'Liệu trình linh hoạt 30 phút, phù hợp cho khách bận rộn hoặc muốn thư giãn nhanh theo vùng cơ thể đang cần chăm sóc.',
    suitable:['Khách bận rộn, ít thời gian','Muốn thư giãn nhanh','Mỏi cổ vai gáy hoặc chân nhẹ','Lần đầu trải nghiệm thử'],
    process:['Trao đổi nhanh về vùng cần chăm sóc','Chăm sóc theo nhu cầu: cạo gió, giác hơi, ngâm chân hoặc xoa bóp vùng đầu','Tác động nhẹ nhàng vào vùng căng mỏi','Kết thúc với trà sâm táo đỏ']
  },
  {
    id:'relax', name:'Relax', full:'Relax – Gội đầu thảo dược chuyên sâu',
    time:'60 phút', price:'180.000 VNĐ', priceNum:180000,
    img:'assets/relax.jpg', thumb:'t-relax', tag:null,
    sub:'Gội đầu thảo dược chuyên sâu',
    group:'goi-dau',
    desc:'Gội đầu thảo dược chuyên sâu kết hợp chăm sóc vùng mặt, gáy và cổ. Phù hợp cho khách cần thư giãn sâu sau ngày làm việc mệt mỏi.',
    suitable:['Muốn gội đầu kỹ hơn gói cơ bản','Hay căng thẳng, mỏi đầu, mỏi cổ gáy','Thích trải nghiệm thảo dược thiên nhiên','Cần thư giãn sâu sau ngày mệt mỏi'],
    process:['Tư vấn tình trạng đầu, cổ, vai gáy','Xoa bóp thư giãn vùng đầu','Chăm sóc vùng mặt, gáy, cổ','Gội đầu thảo dược chuyên sâu','Thao tác thư giãn giúp thả lỏng','Nghỉ ngơi và trà sâm táo đỏ']
  },
  {
    id:'beauty', name:'Beauty', full:'Beauty – Tái tạo và phục hồi',
    time:'60 phút', price:'240.000 VNĐ', priceNum:240000,
    img:'assets/beauty.jpg', thumb:'t-beauty', tag:null,
    sub:'Tái tạo và phục hồi da mặt',
    group:'chuyen-sau',
    desc:'Liệu trình chăm sóc da mặt kết hợp thư giãn, sử dụng thành phần thiên nhiên giúp da có cảm giác tươi tắn và dễ chịu hơn.',
    suitable:['Muốn chăm sóc da mặt kết hợp thư giãn','Da xỉn màu, thiếu sức sống','Muốn trải nghiệm chăm sóc da tự nhiên','Căng thẳng, mệt mỏi nhiều'],
    process:['Tư vấn tình trạng da','Chăm sóc da với thành phần thiên nhiên','Massage thư giãn vùng mặt','Kết hợp ngọc thạch để tạo cảm giác mát','Thư giãn vùng đầu và cổ vai gáy','Trà sâm táo đỏ']
  },
  {
    id:'zen-detox', name:'Zen Detox', full:'Zen Detox – Thải độc và thư giãn cơ thể',
    time:'60 phút', price:'240.000 VNĐ', priceNum:240000,
    img:'assets/zen-detox.jpg', thumb:'t-zendetox', tag:null,
    sub:'Thư giãn cơ thể chuyên biệt',
    group:'chuyen-sau',
    desc:'Liệu trình chuyên biệt cho vùng bụng, eo và chân, giúp cơ thể có cảm giác nhẹ nhàng và thư giãn hơn, kết hợp chườm nóng và thảo dược.',
    suitable:['Cơ thể nặng nề, mệt mỏi','Muốn chăm sóc vùng bụng, eo','Hay đầy hơi, căng bụng nhẹ','Thích các liệu trình chườm nóng, ngải cứu'],
    process:['Tư vấn tình trạng cơ thể','Làm ấm và thư giãn vùng bụng, eo hoặc chân','Chăm sóc theo vùng: bụng, eo, chân, đầu','Có thể kết hợp chườm nóng, ngải cứu','Nghỉ ngơi và trà sâm táo đỏ']
  },
  {
    id:'royal', name:'Royal', full:'Royal – Liệu trình chăm sóc hoàng gia',
    time:'90 phút', price:'300.000 VNĐ', priceNum:300000,
    img:'assets/royal.jpg', thumb:'t-royal', tag:null,
    sub:'Liệu trình cao cấp toàn diện',
    group:'cao-cap',
    desc:'Trải nghiệm cao cấp kết hợp gội đầu ngọc thạch, chăm sóc da, thư giãn đầu mặt và cổ vai gáy, tay chân trong 90 phút.',
    suitable:['Muốn trải nghiệm liệu trình cao cấp','Kết hợp gội đầu, chăm sóc da, thư giãn nhiều vùng','Mệt mỏi, stress cần thời gian dài hơn','Muốn tặng người thân một buổi thư giãn'],
    process:['Tư vấn nhu cầu chăm sóc','Gội đầu ngọc thạch','Chăm sóc vùng đầu và nâng cơ mặt nhẹ nhàng','Gội đầu với thảo mộc bản địa','Chăm sóc da bằng tinh dầu thiên nhiên','Thư giãn cổ vai gáy, tay và chân','Trà sâm táo đỏ']
  },
  {
    id:'galaxy-neck', name:'Galaxy – Vai Cổ Gáy', full:'Galaxy – Vai Cổ Gáy',
    time:'60 phút', price:'300.000 VNĐ', priceNum:300000,
    img:'assets/galaxy-neck.jpg', thumb:'t-galaxy-neck', tag:null,
    sub:'Chăm sóc chuyên sâu vùng cổ vai gáy',
    group:'chuyen-sau',
    desc:'Chuyên sâu cho vùng đầu, cổ, gáy, vai và bả vai. Phù hợp nhất cho khách ngồi máy tính nhiều, cúi điện thoại lâu hoặc thường xuyên căng mỏi vùng cổ vai.',
    suitable:['Ngồi máy tính nhiều, cúi điện thoại lâu','Căng cứng vùng cổ, vai, bả vai','Nặng đầu, mỏi gáy','Muốn chăm sóc chuyên sâu vùng cổ vai gáy'],
    process:['Tư vấn tình trạng cổ vai gáy','Xác định vùng căng mỏi: cổ, gáy, vai, bả vai','Làm ấm và thư giãn vùng cổ vai gáy','Xoa bóp, day ấn nhẹ vùng cổ, gáy, vai','Thao tác thư giãn vùng đầu','Hỗ trợ vận động nhẹ vùng khớp cổ vai','Nghỉ ngơi và trà sâm táo đỏ']
  },
  {
    id:'galaxy-back', name:'Galaxy – Lưng, Eo, Thận', full:'Galaxy – Lưng, Eo, Thận',
    time:'60 phút', price:'300.000 VNĐ', priceNum:300000,
    img:'assets/galaxy-back.jpg', thumb:'t-galaxy-back', tag:null,
    sub:'Thư giãn vùng lưng và thắt eo',
    group:'chuyen-sau',
    desc:'Chuyên sâu cho vùng lưng, eo và chân. Phù hợp cho khách ngồi nhiều, ít vận động, làm văn phòng hoặc lái xe lâu.',
    suitable:['Thường xuyên mỏi lưng, mỏi eo','Ngồi nhiều, ít vận động','Làm văn phòng hoặc lái xe lâu','Muốn chăm sóc tập trung vùng thân dưới'],
    process:['Tư vấn tình trạng lưng, eo','Làm ấm và thư giãn vùng lưng, eo','Xoa bóp vùng thắt lưng, eo và chân','Kéo giãn nhẹ vùng lưng và chân','Chăm sóc vùng đầu nếu áp dụng','Trà sâm táo đỏ']
  },
  {
    id:'galaxy-legs', name:'Galaxy – Thông Kinh Lạc', full:'Galaxy – Thông Kinh Lạc Chân và Tay',
    time:'60 phút', price:'300.000 VNĐ', priceNum:300000,
    img:'assets/galaxy-legs.jpg', thumb:'t-galaxy-legs', tag:null,
    sub:'Chăm sóc chân và tay chuyên sâu',
    group:'chuyen-sau',
    desc:'Chuyên sâu cho chân, tay và các khớp. Phù hợp cho khách đứng nhiều, đi lại nhiều hoặc làm máy tính nhiều gây mỏi cổ tay, bàn tay.',
    suitable:['Thường xuyên mỏi chân, mỏi tay','Đứng nhiều, đi lại nhiều hoặc ngồi lâu','Lạnh chân, nặng chân, căng bàn chân','Làm máy tính nhiều, mỏi cổ tay, bàn tay'],
    process:['Tư vấn tình trạng tay chân','Ngâm chân thảo dược','Chăm sóc và xoa bóp vùng chân, bàn chân, cổ chân','Chăm sóc vùng tay, cổ tay, bàn tay','Kết hợp kéo giãn nhẹ các khớp tay chân','Trà sâm táo đỏ']
  },
  {
    id:'vip', name:'VIP', full:'VIP – Chăm sóc toàn thân chuyên sâu',
    time:'120 phút', price:'600.000 VNĐ', priceNum:600000,
    img:'assets/vip.jpg', thumb:'t-vip', tag:'Cao cấp',
    sub:'Chăm sóc toàn thân chuyên sâu',
    group:'cao-cap',
    desc:'Liệu trình cao cấp nhất – chăm sóc toàn thân trong 120 phút, dành cho khách cần phục hồi năng lượng toàn diện hoặc thường xuyên đau mỏi nhiều vùng.',
    suitable:['Muốn chăm sóc toàn thân chuyên sâu','Thường xuyên đau mỏi nhiều vùng','Làm việc căng thẳng, vận động nhiều','Đã dùng các gói cơ bản và muốn nâng cấp'],
    process:['Tư vấn và ghi nhận tình trạng cơ thể','Xác định các vùng đang căng mỏi','Chăm sóc toàn thân theo từng vùng','Kết hợp giãn cơ, kéo giãn nhẹ và làm ấm','Có thể kết hợp chườm nóng, hồng quang cứu, ngải cứu','Nghỉ ngơi và trà sâm táo đỏ']
  }
];

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
    <ul><li><b>Mở cửa:</b> 8:30 sáng</li><li><b>Nhận khách cuối:</b> 19:30 tối</li></ul>
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
  document.getElementById('mainNav').classList.remove('open');

  // Render dynamic content per page
  if (page === 'home' && !document.getElementById('featuredGrid').hasChildNodes()) renderFeatured();
  if (page === 'services' && !document.getElementById('servicesFull').hasChildNodes()) renderServicesFull();
  if (page === 'pricing'  && !document.getElementById('priceWrap').hasChildNodes()) renderPriceTable();
}

function toggleMobileMenu() {
  document.getElementById('mainNav').classList.toggle('open');
}

/* ── RENDER: Featured grid (home) ── */
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  grid.innerHTML = SERVICES.slice(0, 8).map(s => `
    <div class="feat-card" onclick="openServiceModal('${s.id}')">
      <div class="feat-img">
        ${s.img
          ? `<img src="${s.img}" alt="${s.name}" loading="lazy">`
          : `<div class="${s.thumb}" style="width:100%;height:100%"></div>`}
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
  el.innerHTML = SERVICES.map(s => `
    <div class="sf-card" onclick="openServiceModal('${s.id}')">
      <div class="sf-thumb ${s.img ? 'sf-thumb-photo' : s.thumb}">
        ${s.img ? `<img src="${s.img}" alt="${s.name}" loading="lazy">` : ''}
        <div class="sf-thumb-overlay"></div>
        <div class="sf-price-tag">${s.price}</div>
      </div>
      <div class="sf-body">
        <h3>${s.full}</h3>
        <div class="sf-time">⏱ ${s.time}${s.tag ? `&ensp;<span style="background:var(--g-light);color:var(--g-mid);font-size:11px;font-weight:600;padding:1px 8px;border-radius:9px">${s.tag}</span>` : ''}</div>
        <p>${s.desc}</p>
        <span class="sf-btn">Xem chi tiết →</span>
      </div>
    </div>`).join('');
}

/* ── RENDER: Price table ── */
function renderPriceTable() {
  const el = document.getElementById('priceWrap');
  const header = `<div class="pt-row pt-head"><div class="pt-num">STT</div><div class="pt-cell">Liệu trình</div><div class="pt-cell">Thời lượng</div><div class="pt-cell pt-price">Giá</div></div>`;
  const rows = SERVICES.map((s,i) => `
    <div class="pt-row${s.id==='vip'?' pt-highlight':''}" style="cursor:pointer" onclick="openServiceModal('${s.id}')">
      <div class="pt-num">${i+1}</div>
      <div class="pt-cell pt-name"><b>${s.full}</b>${s.tag?`<span class="pt-tag${s.id==='vip'?' gold':''}">${s.tag}</span>`:''}<small>${s.sub}</small></div>
      <div class="pt-cell pt-time">${s.time}</div>
      <div class="pt-cell pt-price">${s.price}</div>
    </div>`).join('');
  el.innerHTML = header + rows;
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
  const s = SERVICES.find(x => x.id === id);
  if (!s) return;
  const html = `
    <div class="modal-thumb">${s.img 
      ? `<img src="${s.img}" alt="${s.full}" style="width:100%;height:100%;object-fit:cover;display:block">`
      : `<div class="${s.thumb}" style="width:100%;height:100%"></div>`
    }</div>
    <div class="modal-body">
      <h2>${s.full}</h2>
      <div class="modal-meta">
        <span class="modal-tag">⏱ ${s.time}</span>
        <span class="modal-tag" style="background:#fef3cd;color:#b8860b">💰 ${s.price}</span>
        ${s.tag ? `<span class="modal-tag">${s.tag}</span>` : ''}
      </div>
      <p>${s.desc}</p>
      <h4>Phù hợp với ai?</h4>
      <ul>${s.suitable.map(x => `<li>${x}</li>`).join('')}</ul>
      <h4>Quy trình chăm sóc</h4>
      <ul>${s.process.map((x,i) => `<li><b>Bước ${i+1}:</b> ${x}</li>`).join('')}</ul>
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
let chatHistory = [];

const SYSTEM_PROMPT = `Bạn là trợ lý tư vấn của Green Life Spa – spa dưỡng sinh tại 246 Độc Lập, Phú Thọ Hòa, TP.HCM.
Hotline: 0985.009.674 | Zalo: 0917.948.706 | Mở cửa: 8:30–19:30 hằng ngày.

DỊCH VỤ: Green Touch 79k/40p | FAST 150k/30p | Relax 180k/60p | Beauty 240k/60p | Zen Detox 240k/60p | Royal 300k/90p | Galaxy Vai Cổ Gáy 300k/60p | Galaxy Lưng Eo Thận 300k/60p | Galaxy Thông Kinh Lạc 300k/60p | VIP 600k/120p.
Gói tín dụng: nạp 2tr+5% / 3tr+8% / 5tr+10%. Ưu đãi đến 05/05/2026: tặng xông hơi 50k mọi gói.

GỢI Ý NHANH: ít thời gian→FAST | gội đầu→Green Touch hoặc Relax | cổ vai gáy→Galaxy CVG | lưng eo→Galaxy LET | chân tay→Galaxy TKL | toàn thân→VIP | da mặt→Beauty | bụng nặng→Zen Detox | cao cấp→Royal.

CÁCH TRẢ LỜI:
- Xưng "em", gọi "mình", dùng "dạ" đầu câu
- Mỗi câu trả lời đủ ý, KHÔNG bị ngắt giữa chừng, tối đa 80 từ
- Hỏi bảng giá: liệt kê 3-4 gói tiêu biểu kèm giá, kết bằng câu mời tư vấn thêm
- Hỏi triệu chứng: gợi ý 1 gói phù hợp + giá + hỏi muốn đặt lịch không
- KHÔNG nói: chữa khỏi, cam kết hết đau, điều trị dứt điểm`;

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

async function sendChat() {
  const inp = document.getElementById('cwInput');
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  inp.style.height = '';
  appendMsg('user', text);
  chatHistory.push({ role: 'user', content: text });

  const qb = document.getElementById('cwQuick');
  if (qb) qb.style.display = 'none';

  showTyping();
  try {
    const res = await fetch(AI_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 350,
        system: SYSTEM_PROMPT,
        messages: chatHistory
      })
    });
    const data = await res.json();
    // Kiểm tra lỗi từ Anthropic API
    if (data.error) {
      console.error('Anthropic API error:', data.error);
      hideTyping();
      appendMsg('bot', `Lỗi API: ${data.error.type} – ${data.error.message}`);
      return;
    }
    const reply = data.content?.[0]?.text || 'Dạ em chưa hiểu, mình nhắn lại giúp em nhé ạ.';
    hideTyping();
    appendMsg('bot', reply);
    chatHistory.push({ role: 'assistant', content: reply });
    if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
  } catch(err) {
    console.error('Fetch error:', err);
    hideTyping();
    appendMsg('bot', 'Dạ em đang gặp sự cố kết nối. Lỗi: ' + err.message);
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
});
