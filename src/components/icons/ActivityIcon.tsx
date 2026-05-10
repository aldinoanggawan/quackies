export const ActivityIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="4" r="2" fill="white" />
    <path
      d="M7 8.5C7 7.67 7.67 7 8.5 7h3C12.33 7 13 7.67 13 8.5V12l1.5 3.5h-1.6L12 13H8l-.9 2.5H5.5L7 12V8.5Z"
      fill="white"
    />
    <path
      d="M8 9.5l-2 3.5M12 9.5l2 3.5"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);
