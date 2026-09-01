// Draw a small EEG-style wave inside each section divider, once it scrolls into view.
document.addEventListener("DOMContentLoaded", () => {
  const dividers = document.querySelectorAll("[data-divider]");

  const wavePath = (w) => {
    const midY = 14;
    let d = `M0,${midY} `;
    const segments = Math.floor(w / 70);
    for (let i = 0; i < segments; i++) {
      const x = i * 70;
      d += `L${x + 20},${midY} L${x + 30},${midY - 10} L${x + 40},${midY + 12} L${x + 50},${midY} `;
    }
    d += `L${w},${midY}`;
    return d;
  };

  dividers.forEach((div) => {
    const width = 1100;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${width} 28`);
    svg.setAttribute("preserveAspectRatio", "none");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", wavePath(width));
    path.style.strokeDasharray = "2000";
    path.style.strokeDashoffset = "2000";
    path.style.transition = "stroke-dashoffset 1.4s cubic-bezier(.65,0,.35,1)";

    svg.appendChild(path);
    div.appendChild(svg);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const path = entry.target.querySelector("path");
          if (path) path.style.strokeDashoffset = "0";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  dividers.forEach((div) => observer.observe(div));
});
