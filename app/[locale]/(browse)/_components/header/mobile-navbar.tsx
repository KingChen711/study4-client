import { Icons } from "@/components/ui/icons"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import Logo from "./logo"
import NavContent from "./nav-content"

function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Icons.Hamburger className="ml-2 size-10 sm:hidden" />
      </SheetTrigger>
      <SheetContent side="left">
        <Logo mobile />

        <NavContent />
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavbar
