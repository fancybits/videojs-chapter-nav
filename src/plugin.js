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
    this.on(this.player_.controlBar.chaptersButton, 'change', this.update)
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
    if (this.options_.direction == "prev") {
    } else {
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
