import "@fortawesome/fontawesome-free/js/fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"

// NOTE: 逐個引用，可以減少打包大小

// solid
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown"
import { faCaretUp } from "@fortawesome/free-solid-svg-icons/faCaretUp"

// brands
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub"

// regular

library.add(faBars)
library.add(faCaretLeft)
library.add(faCaretDown)
library.add(faCaretUp)
library.add(faGithub)
