/* 공통: 모바일 메뉴, 이메일 주소 복사 */
document.documentElement.classList.remove('no-js');

(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    }
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  var copyBtn = document.querySelector('[data-copy]');
  if (copyBtn) {
    var status = document.querySelector('.copy-status');
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.getAttribute('data-copy');
      var done = function () { if (status) status.textContent = '이메일 주소를 복사했어요.'; };
      var fail = function () { if (status) status.textContent = '복사하지 못했어요. 주소를 직접 선택해 복사해 주세요.'; };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, fail);
      } else {
        fail();
      }
    });
  }
})();
