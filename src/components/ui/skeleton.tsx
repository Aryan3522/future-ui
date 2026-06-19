/**
 * @registry-slug skeleton
 * @registry-name Skeleton
 * @registry-description A standard Skeleton component.
 * @registry-category ui
 * @registry-type components:ui
 */
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
