const DecorativeElements = {
  // A decorative wave pattern
  WavePattern: () => (
    <svg
      className="w-full h-auto"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        fillOpacity="0.1"
        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  ),

  // A decorative circle pattern
  CirclePattern: () => (
    <svg
      className="w-full h-auto"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.2"
      />
      <circle
        cx="100"
        cy="100"
        r="60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
      <circle
        cx="100"
        cy="100"
        r="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.4"
      />
    </svg>
  ),

  // A decorative dots pattern
  DotsPattern: () => (
    <svg
      className="w-full h-auto"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="40" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="80" cy="40" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="120" cy="40" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="160" cy="40" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="40" cy="80" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="80" cy="80" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="120" cy="80" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="160" cy="80" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="40" cy="120" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="80" cy="120" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="120" cy="120" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="160" cy="120" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="40" cy="160" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="80" cy="160" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="120" cy="160" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="160" cy="160" r="4" fill="currentColor" fillOpacity="0.3" />
    </svg>
  ),

  // A decorative gradient blob
  GradientBlob: () => (
    <svg
      className="w-full h-auto"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path
        d="M45.5,-77.2C58.8,-69.2,69.2,-55.8,77.2,-40.8C85.2,-25.8,90.8,-9.2,89.2,6.8C87.6,22.8,78.8,38.2,67.2,49.8C55.6,61.4,41.2,69.2,25.8,73.8C10.4,78.4,-6,79.8,-21.6,75.8C-37.2,71.8,-52,62.4,-62.8,49.8C-73.6,37.2,-80.4,21.4,-81.8,4.8C-83.2,-11.8,-79.2,-29.2,-70.2,-43.2C-61.2,-57.2,-47.2,-67.8,-32.8,-74.8C-18.4,-81.8,-3.6,-85.2,10.8,-83.2C25.4,-81.2,32.2,-85.2,45.5,-77.2Z"
        transform="translate(100 100)"
        fill="url(#gradient)"
      />
    </svg>
  ),

  // A thin decorative line
  LinePattern: () => (
    <svg
      className="w-full h-[2px]"
      viewBox="0 0 100 2"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0"
        y1="1"
        x2="100"
        y2="1"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
    </svg>
  ),
};

export default DecorativeElements;
