import React, { useEffect } from 'react';

const AdsPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6100986743944878';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // Push ads after script is loaded
    const handleAdsLoad = () => {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    };

    // Ensure ads are pushed after component is mounted
    window.addEventListener('load', handleAdsLoad);

    return () => {
      window.removeEventListener('load', handleAdsLoad);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Ads Page</h1>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '300px', minHeight: '250px' }} // Added minWidth and minHeight
        data-ad-client="ca-pub-6100986743944878"
        data-ad-slot="6760060132"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdsPage;
