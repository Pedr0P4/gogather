import { UserRoundPlus, Book } from 'lucide-react'
import { Header } from "@/components/area-components/Header";
import { PButton } from "@/components/area-components/Button";
import { Friends } from '@/components/friends-components/Friends';
import { AddFriendButton } from '@/components/friends-components/AddFriendButton';
import { PendingButton } from '@/components/friends-components/PendingButton';
import { ResultSkeleton } from '@/components/friends-components/ResultSkeleton';

export default function FriendsPage() {
  return (
    <div className="max-w-6xl mx-auto pt-4 md:pt-6 pb-12">
      <Header description="Suas amizades. Para turbinar seus rolês!" className="mb-4">Amigos</Header>
      <div className="flex flex-row gap-2 mb-4">
        <AddFriendButton/>
        <PendingButton/>
      </div>
      <Friends/>
    </div>
  )
}
