import React from "react";

const GA_TRACKING_ID = "G-3STVN66PY5";

const GoogleAnalytics = () => {
  const scriptContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    function loadGA() {
      loadGA = function(){};
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}');
      var s = document.createElement('script');
      s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}';
      s.async = true;
      document.head.appendChild(s);
    }
    ['scroll','click','keydown','touchstart'].forEach(function(e){
      addEventListener(e, loadGA, {once:true, passive:true});
    });
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  );
};

export default GoogleAnalytics;
