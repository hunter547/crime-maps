import * as React from "react"

const Badge = ({ width, stripeFill, badgeFill }) => {
    const pathDimensions = { width: 365.608, height: 457.647 }
    const ratio = pathDimensions.height / pathDimensions.width
    const scale = width / pathDimensions.width
    return (
      <svg
        width={width}
        height={width * ratio}
        xmlns="http://www.w3.org/2000/svg"
      >
          <g transform={`scale(${scale})`}>
            <path
            d="M850.3 355.2H542.9c-3.9-6.4-8.7-12.6-14.2-18.5-5.1-5.6-4.2-8.1.1-12.8 11.9-13.1 23.4-26.6 34.8-40.1 2.7-3.2 4.9-3.9 9-2.1 40.9 18.4 80.4 14.2 118.3-8.7 4.1-2.5 7-2.8 11.2-.1 26.4 16.1 54.8 23.8 85.9 18.8 11.2-1.8 22.1-4.9 32.4-9.8 3.8-1.8 6.1-1.6 8.9 1.8 12.2 14.4 24.5 28.7 37.2 42.8 3.2 3.6 2.5 5.4-.5 8.5-6.2 6.2-11.4 13-15.7 20.2zm24.6 163c-6.9-26.6-18.8-51.3-29.1-76.7H547.6c-5 12.6-11.2 24.7-16 37.4-8.6 22.9-18.3 45.6-17.7 70.8-.4 25.6 7.1 48.9 21.3 69.9 17.8 26.3 42.9 44.3 71 58 30.1 14.7 60.5 28.9 87.1 49.7 3.1 2.4 4.8 1.2 7.2-.6 21.2-15.9 44.2-28.9 68.2-40.1 26.4-12.3 52.2-25.7 72.7-47.1 32.9-34.2 45.8-74.3 33.5-121.3z"
            style={{
                fill: badgeFill || "#333",
            }}
            transform="translate(-513.874 -270.997)"
            />
            <path
            d="M843.8 436.4c-5.1-12.9-7.8-26.2-6.7-40.1 1.2-15.2 5.8-28.8 13.2-41.1H542.9c12.2 19.9 16.7 42.3 10.8 67.3-1.5 6.5-3.7 12.9-6.1 19.1h298.3c-.7-1.8-1.4-3.5-2.1-5.2z"
            style={{
                fill: stripeFill || "#1e63af",
            }}
            transform="translate(-513.874 -270.997)"
            />
          </g>
      </svg>
    )
}


export default Badge