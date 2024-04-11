import { createUniqueId } from "./utils"
import type { WatermarkOptions } from "./types"

const waterMarkMap = new Map()

function createWatermark(watermarkId: string, text: string | string[], options: WatermarkOptions = {}) {
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

  const observer = new MutationObserver((mutationsList: any[]) => {
    for (let mutation of mutationsList) {
      if (mutation.target === container || mutation.target.parentNode === container || mutation.removedNodes[0] === container) {
        clearWatrmark(watermarkId)
        createWatermark(watermarkId, text, options)
      }
    }
  })

  waterMarkMap.set(watermarkId, {
    remove: () => {
      observer.disconnect()
      container.remove()
      waterMarkMap.delete(watermarkId)
    }
  })

  document.body.append(container)
  observer.observe(document.body, { attributes: true, childList: true, subtree: true });

  return watermarkId
}

export function generate(text: string | string[], options: WatermarkOptions = {}) {
  return createWatermark(createUniqueId(), text, options)
}

export function clearWatrmark(id?: string) {
  try {
    if (!id) {
      for (const [_, { remove }] of waterMarkMap) {
        remove()
      }
    } else {
      const { remove } = waterMarkMap.get(id);
      remove?.();
    }
  } catch (err) {
    console.error(err)
  }
}
