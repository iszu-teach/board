<template>
  <button class="md-button" :class="[type]" :disabled="disabled" @mousedown="addWave" @click="$emit('click', $event)">
    <div class="button-content"><slot></slot></div>
  </button>
</template>

<script>
  function once (el, event, handler) {
    let once = true
    el.addEventListener(event, function onceHandler (e) {
      if (!once) return
      once = true

      const result = handler(e)
      el.removeEventListener(event, onceHandler)
      return result
    })
  }

  function distance (x1, y1) {
    return (x2, y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
  }

  export default {
    name: 'button',
    props: {
      type: {
        type: String,
        default: 'raised'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      addWave (e) {
        // 创建元素
        const el = this.$el
        const wave = document.createElement('div')
        wave.classList.add('wave')
        el.appendChild(wave)

        // 设置元素位置
        const parentRect = el.getBoundingClientRect()
        const x = e.pageX - parentRect.left
        const y = e.pageY - parentRect.top
        wave.style.left = `${x}px`
        wave.style.top = `${y}px`

        // 必须等到动画结束, 或是鼠标松开之后才结束动画
        let expanded = false
        let mouseup = false

        function hideWave () {
          if (expanded && mouseup) {
            setTimeout(() => {
              wave.classList.add('hide')

              // 在动画结束后删除新增的 wave 元素
              once(wave, 'transitionend', () => {
                try { el.removeChild(wave) } catch (err) {}
              })
            }, 0)
          }
        }

        once(el, 'mouseup', () => { mouseup = true; hideWave() })
        once(el, 'mouseleave', () => { mouseup = true; hideWave() })
        once(wave, 'transitionend', () => { expanded = true; hideWave() })

        // 计算 wave 大小并显示
        setTimeout(() => {
          const to = distance(x, y)
          const size = Math.max(to(0, 0), to(0, parentRect.height), to(parentRect.width, 0), to(parentRect.width, parentRect.height)) * 2

          wave.style.width = `${size}px`
          wave.style.paddingTop = `${size}px`
          wave.classList.add('show')
        }, 0)
      }
    }
  }
</script>

<style lang="less">
  @import '../assets/styles/definition.less';
  @transition: 0.25s ease;
  @pressed: 0 4px 10px fade(black, 40);
  @text: white;
  @disabled: @md-grey-400;

  .md-button {
    position: relative;
    height: 36px;
    padding: 0 16px;
    text-transform: uppercase;
    border: 0;
    border-radius: 2px;
    transition: background-color @transition, box-shadow @transition;
    appearance: none;
    outline: 0;
    overflow: hidden;
    user-select: none;

    &:disabled {
      color: @disabled;
    }

    .button-content {
      position: relative;
      z-index: 1;
    }

    .wave {
      position: absolute;
      z-index: 0;
      width: 0;
      padding-top: 0;
      transform: translate(-50%, -50%);
      transition: 0.33s ease-in;
      border-radius: 50%;
      background-color: black;
      opacity: 0;

      &.show {
        opacity: 0.25;
      }

      &.hide {
        transition: 0.67s ease-out;
        opacity: 0 !important;
      }
    }
  }

  .md-button.raised {
    @disabled-background: @md-grey-200;

    min-width: 88px;
    color: @text;
    box-shadow: @1px-shadow;
    background-color: @main-color;

    &:hover {
      box-shadow: @2px-shadow;
    }

    &:disabled {
      color: @disabled;
      box-shadow: none;
      background-color: @disabled-background;
    }
  }

  .md-button.flat {
    color: @main-color;
    background-color: transparent;

    .wave {
      background-color: @main-color;
    }

    .wave.show {
      opacity: 0.15;
    }
  }
</style>
