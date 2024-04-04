import { useState, useEffect, useRef } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import { generate, clearWatermark } from "../lib"

import './app.css'

export function App() {
  const [count, setCount] = useState(0)
  const watermark = useRef<string | null>(null)


  useEffect(() => {
    // 创建水印
    watermark.current = generate("蟹老板 18 岁")
  }, [])

  // 清除水印
  function handleClearWatermark() {
    clearWatermark(watermark.current!)
  }

  return (
    <>
      <div>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <button onClick={handleClearWatermark}>Clear Watermark</button>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  )
}
