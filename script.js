/* ================================
   GREEN LIFE SPA – script.js
   Form + Toast + AI Chat Widget
   ================================ */

/* ── FORM SUBMIT ── */
function handleSubmit(e) {
  e.preventDefault();
  showToast('Cảm ơn bạn đã đặt lịch! Spa sẽ liên hệ xác nhận sớm nhất có thể.');
  e.target.reset();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (msg) t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ── CHAT WIDGET ── */
let chatOpen = false;
let chatHistory = [];

const SYSTEM_PROMPT = `Bạn là trợ lý tư vấn chính thức của Green Life Spa – spa dưỡng sinh tại TP.HCM.

THÔNG TIN CƠ BẢN:
- Tên: Green Life Spa
- Địa chỉ: 246 Độc Lập, Phường Phú Thọ Hòa, TP.HCM
- Điện thoại: 0985.009.674
- Zalo: 0917.948.706
- Giờ mở cửa: 8h30 – nhận khách cuối 19h30 hằng ngày
- Thanh toán: tiền mặt, chuyển khoản ngân hàng, quét mã Momo

DỊCH VỤ & GIÁ:
1. Green Touch – Gội đầu thảo dược bản địa: 40 phút – 79.000 VNĐ
2. FAST – Chăm sóc nhanh theo nhu cầu: 30 phút – 150.000 VNĐ
3. Relax – Gội đầu thảo dược chuyên sâu: 60 phút – 180.000 VNĐ
4. Beauty – Tái tạo và phục hồi: 60 phút – 240.000 VNĐ
5. Zen Detox – Thải độc và thư giãn cơ thể: 60 phút – 240.000 VNĐ
6. Royal – Liệu trình chăm sóc hoàng gia: 90 phút – 300.000 VNĐ
7. Galaxy – Vai Cổ Gáy: 60 phút – 300.000 VNĐ
8. Galaxy – Lưng, Eo, Thận: 60 phút – 300.000 VNĐ
9. Galaxy – Thông kinh lạc chân và tay: 60 phút – 300.000 VNĐ
10. VIP – Chăm sóc toàn thân chuyên sâu: 120 phút – 600.000 VNĐ

GÓI TÍN DỤNG (trả trước):
- Từ 2.000.000 VNĐ: ưu đãi 5%
- Từ 3.000.000 VNĐ: ưu đãi 8%
- Từ 5.000.000 VNĐ: ưu đãi 10%

ƯU ĐÃI HIỆN TẠI (25/04/2026 – 05/05/2026):
Tặng xông hơi trị giá 50.000 VNĐ cho tất cả các gói dịch vụ.

GỢI Ý THEO NHU CẦU:
- Ít thời gian → FAST
- Gội đầu nhẹ, giá tốt → Green Touch
- Gội đầu kỹ + thư giãn đầu cổ gáy → Relax
- Gói cao cấp nhiều vùng → Royal
- Mỏi cổ vai gáy → Galaxy Vai Cổ Gáy
- Mỏi lưng eo → Galaxy Lưng Eo Thận
- Mỏi chân tay → Galaxy Thông Kinh Lạc Chân và Tay
- Chăm sóc da mặt → Beauty
- Nặng bụng, muốn làm ấm → Zen Detox
- Chăm sóc toàn thân → VIP

NGUYÊN TẮC GIỌNG VĂN (rất quan trọng):
- Xưng "em", gọi khách "mình" hoặc "anh/chị", dùng "dạ" đầu câu
- Nhẹ nhàng, thân thiện, lịch sự, không ép khách
- KHÔNG BAO GIỜ dùng: chữa khỏi, điều trị dứt điểm, cam kết hết đau, giảm mỡ chắc chắn, hiệu quả 100%
- Luôn dùng: hỗ trợ thư giãn, giảm cảm giác căng mỏi, giúp cơ thể nhẹ nhàng hơn
- Nếu khách có bệnh nền nặng, mang thai, sau phẫu thuật → khuyên hỏi bác sĩ trước
- Cuối câu tư vấn nên hỏi thêm hoặc gợi ý đặt lịch nhẹ nhàng
- Trả lời ngắn gọn, tối đa 120 từ mỗi tin nhắn`;

function toggleChat() {
  chatOpen = !chatOpen;
  const widget = document.getElementById('chatWidget');
  const badge  = document.getElementById('chatBadge');
  widget.classList.toggle('open', chatOpen);
  if (chatOpen && badge) badge.style.display = 'none';
}

function quickAsk(text) {
  document.getElementById('chatInput').value = text;
  sendChat();
}

async function sendChat() {
  const inp  = document.getElementById('chatInput');
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  inp.style.height = '';

  appendChatMsg('user', text);
  chatHistory.push({ role: 'user', content: text });

  const quickBtns = document.getElementById('chatQuick');
  if (quickBtns) quickBtns.style.display = 'none';

  showTypingIndicator();

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: chatHistory
      })
    });
    const data  = await res.json();
    const reply = data.content?.[0]?.text
      || 'Dạ em chưa hiểu rõ câu hỏi, mình nhắn lại giúp em nhé ạ.';

    hideTypingIndicator();
    appendChatMsg('bot', reply);
    chatHistory.push({ role: 'assistant', content: reply });
    if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
  } catch (err) {
    hideTypingIndicator();
    appendChatMsg('bot', 'Dạ em đang gặp sự cố kết nối, mình thử lại sau nhé ạ.');
  }
}

function appendChatMsg(role, text) {
  const msgs = document.getElementById('chatMessages');
  const wrap = document.createElement('div');
  wrap.className = 'chat-msg ' + role;

  const av = document.createElement('div');
  av.className = 'chat-av';
  av.textContent = role === 'bot' ? 'GL' : 'B';

  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.innerHTML = text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  wrap.appendChild(av);
  wrap.appendChild(bubble);
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
}

let typingEl = null;
function showTypingIndicator() {
  const msgs = document.getElementById('chatMessages');
  typingEl = document.createElement('div');
  typingEl.className = 'chat-msg bot';
  typingEl.id = 'typingIndicator';
  typingEl.innerHTML = `
    <div class="chat-av">GL</div>
    <div class="chat-bubble">
      <div class="typing-dots"><span></span><span></span><span></span></div>
    </div>`;
  msgs.appendChild(typingEl);
  msgs.scrollTop = msgs.scrollHeight;
}
function hideTypingIndicator() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}
