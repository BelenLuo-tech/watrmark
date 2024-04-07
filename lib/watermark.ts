import { createUniqueId } from "./utils"

type WatermarkOptions = {
  /**
   * The width of the watermark.
   */
  width?: number
  /**
   * The height of the watermark.
   */
  height?: number
  /**
   * The font size to use for the watermark.
   */
  fontSize?: string
  /**
   * The font family to use for the watermark.
   */
  fontFamily?: string
  /**
   * The color to use for the watermark.
   */
  color?: string
  /**
   * The rotation angle to use for the watermark.
   */
  rotate?: number
  /**
   * The opacity to use for the watermark.
   */
  opacity?: number
}

const waterMarkMap = new Map()

export function generate(text: string | string[], options: WatermarkOptions = {}) {
  const screenWidth = Math.max(document.body.scrollWidth, window.screen.width)
  const screenHeight = Math.max(document.body.scrollHeight, window.screen.height)

  const {
    width = 200,
    height = 200,
    opacity = 0.1,
    rotate = 330,
    fontSize = '24px',
    fontFamily = '微软雅黑',
    color = '#333'
  } = options

  const watermark = document.createElement('span');
  const style: Partial<CSSStyleDeclaration> = {
    position: "fixed",
    width: width + 'px',
    height: height + 'px',
    opacity: String(opacity),
    transform: `rotate(-${rotate}deg)`,
    fontSize: fontSize,
    fontFamily: fontFamily,
    pointerEvents: "none",
    color
  }

  Object.assign(watermark.style, style)

  const cols = Math.ceil(screenWidth / width!)
  const rows = Math.ceil(screenHeight / height!)

  const fragment = document.createDocumentFragment()

  for (let i = 0; i < rows; i++) {
    const watermarkTop = i * height + 'px'
    for (let j = 0; j < cols; j++) {
      const currentWatermark = watermark.cloneNode(true) as HTMLSpanElement
      Object.assign(currentWatermark.style, {
        left: j * width + 'px',
        top: watermarkTop
      })

      if (Array.isArray(text)) {
        currentWatermark.innerHTML = text.join("<br />")
      } else {
        currentWatermark.innerText = text
      }

      fragment.appendChild(currentWatermark)
    }
  }

  const container = document.createElement("div")
  container.append(fragment)

  document.body.append(container)

  const watermarkId = createUniqueId()

  waterMarkMap.set(watermarkId, container)

  return watermarkId
}

export function clearWatrmark(id?: string) {
  if (!id) {
    return waterMarkMap.clear();
  }

  const waterMark = waterMarkMap.get(id);
  if (waterMark) {
    waterMark.remove();
    waterMarkMap.delete(id);
  }
}
