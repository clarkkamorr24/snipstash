import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/format";
import type { SessionUser } from "@/types/auth";

interface UserAvatarProps {
  user: SessionUser;
  size?: "default" | "sm" | "lg";
  className?: string;
}

// GitHub image when available, otherwise initials from the name (or email).
export function UserAvatar({ user, size, className }: UserAvatarProps) {
  return (
    <Avatar size={size} className={className}>
      {user.image && <AvatarImage src={user.image} alt={user.name ?? "User avatar"} />}
      <AvatarFallback className="bg-primary/20 text-xs font-semibold text-primary">
        {getInitials(user.name, user.email)}
      </AvatarFallback>
    </Avatar>
  );
}
