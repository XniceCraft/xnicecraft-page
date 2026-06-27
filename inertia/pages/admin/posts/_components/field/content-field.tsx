import { memo } from 'react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import { Skeleton } from '@/components/ui/skeleton'
import StarterKit from '@tiptap/starter-kit'
import {
  ArrowCounterClockwiseIcon,
  ArrowClockwiseIcon,
  TextBIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextHIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  CodeIcon,
  CodeBlockIcon,
  QuotesIcon,
  MinusIcon,
  EraserIcon,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

import type { Editor, JSONContent } from '@tiptap/react'

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  title,
  children,
}: {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={isActive}
      className={cn(
        'inline-flex items-center justify-center rounded-lg p-1.5 text-sm transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        'disabled:pointer-events-none disabled:opacity-40',
        isActive
          ? 'bg-accent text-accent-foreground shadow-sm'
          : 'text-ink-3 hover:bg-accent/60 hover:text-ink'
      )}
    >
      {children}
    </button>
  )
}

function ToolbarSeparator() {
  return <div className="mx-1 h-5 w-px bg-rule" aria-hidden="true" />
}

const MenuBar = memo(function MenuBar({ editor }: { editor: Editor }) {
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      bold: ctx.editor.isActive('bold'),
      italic: ctx.editor.isActive('italic'),
      strike: ctx.editor.isActive('strike'),
      code: ctx.editor.isActive('code'),
      h1: ctx.editor.isActive('heading', { level: 1 }),
      h2: ctx.editor.isActive('heading', { level: 2 }),
      h3: ctx.editor.isActive('heading', { level: 3 }),
      h4: ctx.editor.isActive('heading', { level: 4 }),
      bulletList: ctx.editor.isActive('bulletList'),
      orderedList: ctx.editor.isActive('orderedList'),
      codeBlock: ctx.editor.isActive('codeBlock'),
      blockquote: ctx.editor.isActive('blockquote'),
      canUndo: ctx.editor.can().undo(),
      canRedo: ctx.editor.can().redo(),
    }),
  })

  const headingActiveMap = [state.h1, state.h2, state.h3, state.h4] as const

  return (
    <div
      className="flex flex-wrap items-center gap-0.5 rounded-t-xl border-b border-rule bg-surface-2 px-2 py-1.5"
      role="toolbar"
      aria-label="Text formatting"
    >
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={state.bold}
        title="Bold (Ctrl+B)"
      >
        <TextBIcon className="size-4" weight="bold" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={state.italic}
        title="Italic (Ctrl+I)"
      >
        <TextItalicIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={state.strike}
        title="Strikethrough"
      >
        <TextStrikethroughIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={state.code}
        title="Inline code"
      >
        <CodeIcon className="size-4" />
      </ToolbarButton>

      <ToolbarSeparator />

      {([1, 2, 3, 4] as const).map((level, i) => (
        <ToolbarButton
          key={level}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          isActive={headingActiveMap[i]}
          title={`Heading ${level}`}
        >
          <span className="flex items-center gap-0.5 text-xs font-semibold leading-none">
            <TextHIcon className="size-3.5" />
            <span>{level}</span>
          </span>
        </ToolbarButton>
      ))}

      <ToolbarSeparator />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={state.bulletList}
        title="Bullet list"
      >
        <ListBulletsIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={state.orderedList}
        title="Numbered list"
      >
        <ListNumbersIcon className="size-4" />
      </ToolbarButton>

      <ToolbarSeparator />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={state.codeBlock}
        title="Code block"
      >
        <CodeBlockIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={state.blockquote}
        title="Blockquote"
      >
        <QuotesIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal rule"
      >
        <MinusIcon className="size-4" />
      </ToolbarButton>

      <ToolbarSeparator />

      <ToolbarButton
        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        title="Clear formatting"
      >
        <EraserIcon className="size-4" />
      </ToolbarButton>

      <ToolbarSeparator />

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!state.canUndo}
        title="Undo (Ctrl+Z)"
      >
        <ArrowCounterClockwiseIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!state.canRedo}
        title="Redo (Ctrl+Y)"
      >
        <ArrowClockwiseIcon className="size-4" />
      </ToolbarButton>
    </div>
  )
})

export interface ContentFieldProps {
  value?: JSONContent
  onChange?: (value: JSONContent) => void
  onBlur?: () => void
}

export function ContentField({ value, onChange, onBlur }: ContentFieldProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        spellcheck: 'false',
        class:
          'prose prose-sm dark:prose-invert max-w-none min-h-64 p-4 focus:outline-none break-words',
      },
    },
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange?.(editor.getJSON())
    },
    onBlur() {
      onBlur?.()
    },
  })

  return (
    <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm transition-shadow focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/20">
      {editor ? (
        <>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} className="w-full min-w-0 overflow-x-auto" />
        </>
      ) : (
        <Skeleton className="w-full h-64" />
      )}
    </div>
  )
}
