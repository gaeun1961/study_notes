/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   shared.js — 영상처리 + 알고리즘 공통 JS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

// 현재 상태 저장 (각 HTML에서 초기값 설정)
const state = { ch: null, subs: {} };

function showCh(ch) {
  // 탭 활성화
  document.querySelectorAll('.ch-tab').forEach(t => t.classList.remove('on'));
  const activeTab = document.querySelector(`.ch-tab[data-ch="${ch}"]`);
  if (activeTab) activeTab.classList.add('on');

  // 페이지 전환
  document.querySelectorAll('.ch-page').forEach(p => p.classList.remove('on'));
  const page = document.getElementById('ch-' + ch);
  if (page) page.classList.add('on');

  // 메뉴 전환
  document.querySelectorAll('#sidebar > div').forEach(d => d.style.display = 'none');
  const menu = document.getElementById('menu-' + ch);
  if (menu) menu.style.display = 'block';

  // 사이드바 색상 클래스
  const sidebar = document.getElementById('sidebar');
  sidebar.className = 'sidebar ch' + ch;

  // 상태 저장
  state.ch = ch;

  // 해당 챕터의 마지막 서브탭으로 이동
  const subId = state.subs[ch] || getFirstSub(ch);
  showSub(ch, subId);
}

function showSub(ch, subId) {
  state.subs[ch] = subId;

  // 사이드바 탭 활성화
  const menu = document.getElementById('menu-' + ch);
  if (!menu) return;
  menu.querySelectorAll('.sub-tab').forEach(t => {
    t.classList.remove('on');
    const onclick = t.getAttribute('onclick') || '';
    if (onclick.includes("'" + subId + "'")) t.classList.add('on');
  });

  // 콘텐츠 전환
  const chPage = document.getElementById('ch-' + ch);
  if (!chPage) return;
  chPage.querySelectorAll('.sub-page').forEach(p => p.classList.remove('on'));
  const target = document.getElementById('sub-' + ch + '-' + subId);
  if (target) {
    target.classList.add('on');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// 해당 챕터의 첫 번째 서브탭 id 찾기
function getFirstSub(ch) {
  const menu = document.getElementById('menu-' + ch);
  if (!menu) return null;
  const first = menu.querySelector('.sub-tab');
  if (!first) return null;
  const onclick = first.getAttribute('onclick') || '';
  const match = onclick.match(/'([^']+)'\s*\)/);
  return match ? match[1] : null;
}