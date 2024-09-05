import { Icons } from "@/components/ui/icons"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import Logo from "./logo"
import NavContent from "./nav-content"

function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Icons.Hamburger className="size-[30px] sm:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="border-none pl-0">
        <div className="pl-8">
          <Logo mobile />
        </div>

        <SheetClose asChild>
          <NavContent />
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavbar
