import { forwardRef, useState } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface TagInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> {
  tags?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  ({ tags = [], onChange, placeholder = 'Add tags...', ...props }, ref) => {
    const [input, setInput] = useState('');

    const handleAddTag = (tag: string) => {
      if (tag.trim() && !tags.includes(tag)) {
        onChange?.([...tags, tag]);
        setInput('');
      }
    };

    const handleRemoveTag = (tag: string) => {
      onChange?.(tags.filter((t) => t !== tag));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
        e.preventDefault();
        handleAddTag(input.trim());
      } else if (e.key === 'Backspace' && !input && tags.length > 0) {
        handleRemoveTag(tags[tags.length - 1]);
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--renge-space-2)',
          padding: 'var(--renge-space-2)',
          border: '1px solid var(--renge-color-border)',
          borderRadius: 'var(--renge-radius-2)',
          backgroundColor: 'var(--renge-color-bg)',
        }}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--renge-space-1)',
              background: 'var(--renge-color-accent)',
              color: 'var(--renge-color-bg)',
              padding: 'var(--renge-space-1) var(--renge-space-2)',
              borderRadius: 'var(--renge-radius-1)',
              fontSize: 'var(--renge-font-size-sm)',
            }}
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                padding: 0,
                fontSize: 'var(--renge-font-size-sm)',
              }}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={ref}
          type="text"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{
            flex: 1,
            minWidth: '100px',
            border: 'none',
            background: 'transparent',
            color: 'var(--renge-color-fg)',
            fontSize: 'var(--renge-font-size-base)',
            outline: 'none',
          }}
          {...props}
        />
      </div>
    );
  }
);

TagInput.displayName = 'TagInput';
