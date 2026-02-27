import { onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
    extends: DefaultTheme,
    setup() {
        onMounted(() => {
            // Fix Mermaid colors (inline styles override CSS)
            let attempts = 0
            const fix = setInterval(() => {
                document.querySelectorAll('.mermaid svg [style]').forEach(el => {
                    const s = (el as HTMLElement).style
                    if (s.fill && !s.fill.includes('#1e3a5f')) s.fill = '#1e3a5f'
                    if (s.stroke && !s.stroke.includes('#4a9eed')) s.stroke = '#4a9eed'
                    if (s.color) s.color = '#e0e0e0'
                })
                if (++attempts >= 20) clearInterval(fix)
            }, 500)

            // Click to zoom for Mermaid
            document.querySelectorAll('.mermaid').forEach(el => {
                el.addEventListener('click', () => {
                    const modal = document.createElement('div')
                    modal.className = 'mermaid-zoom-modal'
                    modal.innerHTML = (el as HTMLElement).innerHTML
                    modal.addEventListener('click', () => modal.remove())
                    document.body.appendChild(modal)
                })
            })
        })
    }
}
