import "@fortawesome/fontawesome-free/js/fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"

// NOTE: 逐個引用，可以減少打包大小

// solid
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"

// brands
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub"

// regular

library.add(faBars)
library.add(faGithub)
