<template>
  <footer>
    <div class="footer_container">
      <a href="/main">
        <img src="@/image/logo.png" alt="로고" style="float:left" />
      </a>
      <div class="form-wrapper2">
        <p>ⓒ우리 모두 철학자 2023 - All Rights Reserved.</p>
        <p class="form-wrapper3">
          <a href="/terms">서비스 이용약관</a>
          &#183;
          <a href="/privacy">개인정보 처리방침</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style>
@import '../../css/reset.css';
@import '../../css/common.css';

footer *,
footer *:before,
footer *:after {
  box-sizing: inherit;
  font-family: 'pretendard', Arial, Helvetica, sans-serif;
}

footer .footer_container img {
  width: 59px;
  height: 60px;
  border-radius: 50%;
}

.form-wrapper3 {
  text-align: center;
}
</style>
