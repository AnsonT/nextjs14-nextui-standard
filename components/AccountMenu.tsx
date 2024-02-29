'use client'
import { User } from '@/lib/actions/auth'
import { Button } from '@nextui-org/button'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

const SignInOrSignOut: FC = () => {
  const pathname = usePathname()
  return pathname === '/signin' ? (
    <Link href="/signup">
      <Button variant="light">Sign Up</Button>
    </Link>
  ) : (
    <Link href="/signin">
      <Button variant="light">Sign In</Button>
    </Link>
  )
}

interface SignedInMenuProps {
  currentUser: User
}

const SignedInMenu: FC<SignedInMenuProps> = ({ currentUser }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar showFallback />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" disabledKeys={['displayName']}>
        <DropdownSection showDivider>
          <DropdownItem isReadOnly key="displayName" className="opacity-100">
            <p className="text-lg text-slate-900">{currentUser.displayName}</p>
            <p className="text-sm text-slate-900">{currentUser.email}</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          <DropdownItem key="profile">
            <Link href="/profile">Profile</Link>
          </DropdownItem>
          <DropdownItem key="billing">
            <Link href="/billing">Billing</Link>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem key="signout">Sign Out</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

interface LogInStateProps {
  currentUser?: User
}

export const AccountMenu: FC<LogInStateProps> = ({ currentUser }) => {
  const pathname = usePathname()
  return (
    <div>
      {currentUser ? (
        <SignedInMenu currentUser={currentUser} />
      ) : (
        <SignInOrSignOut />
      )}
    </div>
  )
}
