import React, { useEffect } from "react";

function GoogleAds({ clientId, slotId, smw, smh, mdw, mdh, lgw, lgh, height }) {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className={`adsbygoogle w-full h-full max-w-[${smw}] max-h[${smh}] md:max-w-[${mdw}]
      md:max-h-[${mdh}] lg:max-w-[${lgw}] lg:max-h-[${lgh}]`}
      style={{ display: "block" }}
      data-ad-client={clientId}
      data-ad-slot={slotId}
    ></ins>
  );
}

export default GoogleAds;
