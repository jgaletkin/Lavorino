'use client'

interface ProviderTagsProps {
  tags: string[]
}

export default function ProviderTags({ tags }: ProviderTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
        >
          {tag}
        </span>
      ))}
    </div>
  )
} 