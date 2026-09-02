# ContactMe: 3D Interactive Web Portal

[![Live Demo](https://img.shields.io/badge/Live%20Demo-contactraghav.web.app-brightgreen.svg?style=flat-square)](https://contactraghav.web.app)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E.svg?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-3D%20Transforms-1572B6.svg?style=flat-square&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Firebase](https://img.shields.io/badge/Hosted%20on-Firebase-FFCA28.svg?style=flat-square&logo=firebase)](https://firebase.google.com/)

An interactive 3D contact card and personal portal showcasing CSS spatial mathematics, mouse-tracking physics, and modern web aesthetics.

* **Live Demo:** [contactraghav.web.app](https://contactraghav.web.app)

---

## Overview

ContactMe reimagines the traditional contact page into an engaging spatial experience. By calculating cursor coordinates in real time, the interface applies dynamic 3D perspective transforms, specular lighting highlights, and tactile spring physics to social and contact nodes.

```
[ User Cursor Movement (X, Y Coordinates) ]
                     |
       [ Matrix Transform Math (JS) ]
                     |
[ 3D Perspective Tilt + Dynamic Lighting + Spring Physics ]
```

---

## Highlights

* **Real-Time Cursor Physics:** Smooth 3D rotational tilt reacting to cursor velocity and position.
* **Pure Web Standards:** Built using clean HTML5, modern CSS3 3D transforms (`perspective`, `rotateX`, `rotateY`, `transform-style: preserve-3d`), and Vanilla JavaScript for maximum frame rates.
* **Responsive Layout:** Automatically adapts from desktop hover-based spatial matrices to touch-friendly mobile gestures.
* **Instant Loading:** Zero heavy third-party framework dependencies, resulting in sub-50KB total asset weight.

---

## Project Structure

* **`index.html`:** Semantic document structure and social link anchors.
* **`style.css`:** 3D viewport setup, perspective planes, glassmorphic surfaces, and lighting shaders.
* **`script.js`:** Mathematical coordinate tracking, easing functions, and hover physics.

---

## Author

* **Raghav Goyal** (@raghavatgit)
* **Live Site:** [contactraghav.web.app](https://contactraghav.web.app)
