import videojs from 'video.js'
const Component = videojs.getComponent('Component')
const Button = videojs.getComponent('Button')
const defaults = {}

class ChapterNavButton extends Button {
  constructor(player, options) {
    super(player, options)
    if (this.options_.direction == "prev") {
      this.controlText("Previous")
    } else {
      this.controlText("Next")
    }

    this.update()

    let chaptersButton = this.player_.controlBar.chaptersButton
    this.on(chaptersButton, 'change', this.update)
    this.on('dispose', () => {
      this.off(chaptersButton, 'change', this.update)
    })
  }
  buildCSSClass() {
    return `vjs-chapter-nav-button jump-${this.options_.direction} ${super.buildCSSClass()}`
  }
  update() {
    if (this.player_.controlBar.chaptersButton.hasClass('vjs-hidden')) {
      this.hide()
    } else {
      this.show()
    }
  }
  handleClick() {
    const player = this.player_
    const track = player.controlBar.chaptersButton.track_
    if (!track) return

    const cues = track.cues
    if (!cues.length) return

    const len = cues.length
    const now = player.currentTime()

    for (var n = 0; n < len; n++) {
      const {startTime, endTime} = cues[n]
      if (this.options_.direction == "prev") {
        if (now > startTime && now <= endTime+4) {
          player.currentTime(startTime)
          break
        }
      } else {
        if (now >= startTime && now < endTime) {
          player.currentTime(endTime)
          break
        }
      }
    }
  }
}

const chapterNav = function(options) {
  let player = this
  player.ready(() => {
    let opts = videojs.mergeOptions(defaults, options)

    player.controlBar.chapterPrev = player.controlBar.addChild('ChapterNavButton', {
      direction: 'prev'
    })
    player.controlBar.el().insertBefore(
      player.controlBar.chapterPrev.el(),
      player.controlBar.chaptersButton.el()
    )

    player.controlBar.chapterNext = player.controlBar.addChild('ChapterNavButton', {
      direction: 'next'
    })
    player.controlBar.el().insertBefore(
      player.controlBar.chapterNext.el(),
      player.controlBar.chaptersButton.el().nextSibling
    )
  })
}

Component.registerComponent('ChapterNavButton', ChapterNavButton)
videojs.plugin('chapterNav', chapterNav)
