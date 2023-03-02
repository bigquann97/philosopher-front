<template>
  <footer>
    <div class="footer_container">
      <img src="@/image/logo.png" alt="로고" style="float:left" />
      <div class="form-wrapper2">
        <p>ⓒ우리 모두 철학자 2023 - All Rights Reserved.</p>
        <p>개인정보 처리방침 &#183; 서비스 이용약관 &#183; FAQ &#183; 신고</p>
      </div>
    </div>
  </footer>
</template>

<style>
@import '/css/reset.css';
@import '/css/common.css';
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

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
</style>
