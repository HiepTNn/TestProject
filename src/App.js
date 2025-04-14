import React, { useEffect } from 'react';
import * as THREE from 'three'; // 👈 import three
import * as PANOLENS from 'panolens';
// import image1 from '../public/assets/1.jpg';
// import image2 from '../public/assets/image2.jpg';
// import image3 from '../public/assets/image3.jpg';
// import image4 from '../public/assets/image4.jpg';

const App = () => {
  useEffect(() => {
    // 👇 Gán THREE vào window để PANOLENS dùng được
    window.THREE = THREE;

    const container = document.querySelector("#container");
    const panorama = new PANOLENS.ImagePanorama("/1.jpg");
    const panorama2 = new PANOLENS.ImagePanorama("/image2.jpg");
    const panorama3 = new PANOLENS.ImagePanorama("/image3.jpg");
    const panorama4 = new PANOLENS.ImagePanorama("/image4.jpg");

    const infospot = new PANOLENS.Infospot(350, "load_more.png");
    infospot.position.set(0, 0, -5000);
    infospot.addHoverText("Hello Panolens", 50);
    panorama.add(infospot);

    const viewer = new PANOLENS.Viewer({ container });
    viewer.add(panorama, panorama2, panorama3, panorama4);

    panorama.link(panorama2, new THREE.Vector3(0, -2000, -5000), 400, "obv-icon-1.png");
    panorama.link(panorama3, new THREE.Vector3(-1000, -2000, -5000), 400, "obv-icon-2.png");
    panorama.link(panorama4, new THREE.Vector3(1000, -2000, -5000), 400, "obv-icon-3.png");

    panorama2.link(panorama, new THREE.Vector3(0, -2000, -5000));
    panorama3.link(panorama, new THREE.Vector3(0, -2000, -5000));
    panorama4.link(panorama, new THREE.Vector3(0, -2000, -5000));

    return () => {
      // Xóa sạch DOM và viewer
      container.innerHTML = '';
    };
  }, []);

  return (
    <div>
      <div id="container" style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1
      }} />
    </div>
  );
};

export default App;
