import "@fortawesome/fontawesome-free/js/fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"

// NOTE: 逐個引用，可以減少打包大小

// solid
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown"
import { faHashtag } from "@fortawesome/free-solid-svg-icons/faHashtag"
import { faThLarge } from "@fortawesome/free-solid-svg-icons/faThLarge"
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle"

// brands
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub"
import { faReact } from "@fortawesome/free-brands-svg-icons/faReact"

// regular

library.add(faBars)
library.add(faCaretDown)
library.add(faHashtag)
library.add(faThLarge)
library.add(faCircle)
library.add(faGithub)
library.add(faReact)
